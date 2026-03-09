from flask import Blueprint, request, jsonify, send_file
from repositories.stock_master import search_stock, get_stock_by_code
from services.kis_domestic import get_korea_price
from utils.chart import draw_stock_chart
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import matplotlib as mpl
import os

# ===== 한글 폰트 설정 =====
font_path = "C:/Windows/Fonts/malgun.ttf"

if os.path.exists(font_path):
    font_name = fm.FontProperties(fname=font_path).get_name()
    mpl.rc('font', family=font_name)

# 마이너스 깨짐 방지
mpl.rcParams['axes.unicode_minus'] = False


korea_stocks_bp = Blueprint("korea_stocks", __name__)

@korea_stocks_bp.get("/api/korea/search")
def korea_search():
    q = request.args.get("q", "")
    result = search_stock(q)
    return jsonify(result.to_dict(orient="records"))

@korea_stocks_bp.get("/api/korea/chart")
def korea_chart():
    code = request.args.get("code")

    stock_info = get_stock_by_code(code)
    raw = get_korea_price(code)["output"]

    prices = [
        int(raw["stck_oprc"]),
        int(raw["stck_hgpr"]),
        int(raw["stck_lwpr"]),
        int(raw["stck_prpr"]),
    ]

    img_path = draw_stock_chart(
        stock_code=code,
        stock_name=stock_info["종목명"],
        price_data=prices
    )

    return send_file(img_path, mimetype="image/png")
