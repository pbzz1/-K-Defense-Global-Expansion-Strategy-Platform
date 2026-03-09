# backend/app.py
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS

import io
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter

from services.kis_auth import get_access_token
from services.kis_stock import get_today_price
from services.kis_domestic import search_stock_by_name 
#from services.kis_minute import get_minute_ohlcv
from services.kis_minute import get_minute_df
from services.kis_daily import get_daily_df
from services.chart_toss_style import draw_toss_style_chart

import matplotlib
import matplotlib.pyplot as plt
from matplotlib import font_manager, rc
import os

DEFENSE_TOP5 = {
    "한화에어로스페이스": "012450",
    "현대로템": "064350",
    "한국항공우주": "047810",
    "한화시스템": "272210",
    "풍산": "103140"
}
# =========================
# 한글 폰트 설정 (Windows)
# =========================
FONT_PATH = "C:/Windows/Fonts/malgun.ttf"  # 맑은 고딕
font_name = font_manager.FontProperties(fname=FONT_PATH).get_name()

rc("font", family=font_name)
rc("axes", unicode_minus=False)

# matplotlib 캐시 문제 방지
matplotlib.rcParams["font.family"] = font_name

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# --- 개발용: 버튼 클릭 시 토큰 강제 갱신 ---
@app.route("/api/korea/init-token", methods=["POST"])
def init_token():
    token = get_access_token(force=True)
    return jsonify({
        "status": "ok",
        "message": "Access token issued",
        "token": token[:10] + "..."
    })

# --- 오늘 시세(실데이터) ---
@app.route("/api/korea/today/<code>", methods=["GET"])
def today_price(code):
    data = get_today_price(code)
    return jsonify(data)

# --- 종목 검색(CSV) ---
@app.route("/api/korea/search", methods=["GET"])
def search():
    q = request.args.get("q", "").strip()
    if not q:
        return jsonify({"status": "ok", "count": 0, "results": []})
    results = search_stock_by_name(q)
    return jsonify({"status": "ok", "count": len(results), "results": results})

# --- 차트(PNG, Matplotlib) ---
@app.route("/api/korea/chart/<code>", methods=["GET"])
def chart(code):
    chart_type = request.args.get("type", "bar").lower()  # bar | line | candle
    zoom = request.args.get("zoom", "1")                  # "1"이면 y축 하단 잘라서 차이 강조
    title = request.args.get("title", code)

    data = get_today_price(code)

    o = data.get("open")
    h = data.get("high")
    l = data.get("low")
    c = data.get("close")

    # 값이 없으면 빈 차트 대신 "데이터 없음" 이미지 반환
    if any(v is None for v in [o, h, l, c]):
        fig = plt.figure(figsize=(6.2, 3.3), dpi=140)
        ax = fig.add_subplot(111)
        ax.set_axis_off()
        ax.text(0.5, 0.5, "데이터 없음", ha="center", va="center", fontsize=14)
        buf = io.BytesIO()
        fig.savefig(buf, format="png", bbox_inches="tight")
        plt.close(fig)
        buf.seek(0)
        return send_file(buf, mimetype="image/png")

    # dashlite 느낌(대략): 밝은 배경 + 보라/파랑 계열 + 연한 그리드
    FIG_BG = "#f5f6fa"
    AX_BG = "#ffffff"
    GRID = "#e5e9f2"
    MAIN = "#6576ff"
    DOWN = "#e85347"
    UP = "#1ee0ac"

    fig = plt.figure(figsize=(6.2, 3.3), dpi=140, facecolor=FIG_BG)
    ax = fig.add_subplot(111, facecolor=AX_BG)

    # 공통 y축 zoom: min/max 근처만 보이게 하단 잘라서 차이 강조
    vals = [o, h, l, c]
    vmin, vmax = min(vals), max(vals)

    if zoom == "1":
        pad = max(1, int((vmax - vmin) * 0.15))
        y0 = max(0, vmin - pad)
        y1 = vmax + pad
        ax.set_ylim(y0, y1)

    ax.set_title(title, fontsize=12, pad=10)

    if chart_type == "line":
        xs = ["Open", "High", "Low", "Close"]
        ys = [o, h, l, c]
        ax.plot(xs, ys, linewidth=2.5, color=MAIN, marker="o")
        ax.grid(True, color=GRID, linewidth=0.8)
        ax.set_ylabel("Price")

    elif chart_type == "candle":
        # 단일 일봉 캔들(시가/고가/저가/현재가)
        # x=0 하나에 대해 wick + body 표현
        x = 0
        # wick
        ax.vlines(x, l, h, color="#364a63", linewidth=2)
        # body
        body_low = min(o, c)
        body_high = max(o, c)
        body_color = UP if c >= o else DOWN
        ax.bar([x], [body_high - body_low], bottom=body_low, width=0.35, color=body_color, edgecolor=body_color)
        ax.grid(True, color=GRID, linewidth=0.8)
        ax.set_xticks([0])
        ax.set_xticklabels(["D-1"])
        ax.set_ylabel("Price")

    else:
        # bar (default)
        labels = ["시가", "고가", "저가", "현재가"]
        values = [o, h, l, c]
        ax.bar(labels, values, color=MAIN, edgecolor=MAIN, alpha=0.90)
        ax.set_ylabel("Price")

    # 보기 좋게 숫자 포맷(천단위)
    ax.get_yaxis().set_major_formatter(
        matplotlib.ticker.FuncFormatter(lambda x, p: f"{int(x):,}")
    )

    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches="tight")
    plt.close(fig)
    buf.seek(0)
    return send_file(buf, mimetype="image/png")

@app.route("/api/korea/minute/<code>")
def minute_chart(code):
    interval = request.args.get("interval", "1")
    df = get_minute_df(code, interval)
    
    if df.empty:
        fig, ax = plt.subplots(figsize=(6,3))
        ax.text(0.5, 0.5, "장중 분봉 데이터 없음",
                ha="center", va="center", fontsize=12)
        ax.set_axis_off()
    
    else:
        fig, ax = plt.subplots(figsize=(6,3))
        ax.plot(df["time"], df["Close"], linewidth=1.5)
        ax.set_title(f"{code} {interval}분봉")
        ax.grid(alpha=0.3)

    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches="tight")
    plt.close(fig)
    buf.seek(0)
    return send_file(buf, mimetype="image/png")

@app.route("/api/korea/minute/top5")
def minute_top5():
    interval = request.args.get("interval", "1")
    results = {}

    for name, code in DEFENSE_TOP5.items():
        df = get_minute_df(code, interval)
        results[name] = df.tail(60).to_dict(orient="records")

    return jsonify(results)

from matplotlib.ticker import FuncFormatter
import io
import matplotlib.pyplot as plt

@app.route("/api/korea/chart/period/<code>")
def chart_period(code):
    period = request.args.get("period", "month")
    df = get_daily_df(code, period)

    fig, ax = plt.subplots(figsize=(6.5, 3.5))

    # =========================
    # 🔥 전일 대비 상승 / 하락 판별
    # =========================
    if len(df) >= 2:
        prev_close = df["Close"].iloc[-2]   # 어제 종가
        curr_close = df["Close"].iloc[-1]   # 오늘 종가

        # 한국 증권사 관례
        line_color = "#e60012" if curr_close >= prev_close else "#0052ff"
    else:
        # 데이터가 1개뿐일 때 기본 색
        line_color = "#4c6ef5"

    # =========================
    # 📈 라인 차트
    # =========================
    ax.plot(
        df.index,
        df["Close"],
        linewidth=2.5,
        marker="o",
        color=line_color
    )

    ax.set_title(f"{period}", fontsize=12)
    ax.grid(alpha=0.3)

    # =========================
    # 🔢 y축 숫자 포맷 (1e6 제거)
    # =========================
    ax.ticklabel_format(axis="y", style="plain")
    ax.yaxis.set_major_formatter(
        FuncFormatter(lambda x, _: f"{int(x):,}")
    )

    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches="tight")
    plt.close(fig)
    buf.seek(0)

    return send_file(buf, mimetype="image/png")

@app.route("/api/korea/chart/toss/<code>")
def chart_toss(code):
    chart_type = request.args.get("type", "line")  # line | bar
    period = request.args.get("period", "week")

    df = get_daily_df(code, period)

    if df.empty:
        return "NO DATA", 404

    buf = draw_toss_style_chart(
        df,
        chart_type=chart_type,
        title=f"{code} {period.upper()}"
    )

    return send_file(buf, mimetype="image/png")
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

