import requests
import pandas as pd
from services.kis_auth import get_access_token
from config.settings import KIS_BASE_URL, KIS_APP_KEY, KIS_APP_SECRET
from datetime import datetime

def _now_hhmmss():
    return datetime.now().strftime("%H%M%S")

TR_ID = "FHKST03010200"

def get_minute_df(code, interval="1"):
    token = get_access_token()

    url = f"{KIS_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice"

    headers = {
        "authorization": f"Bearer {token}",
        "appkey": KIS_APP_KEY,
        "appsecret": KIS_APP_SECRET,
        "tr_id": TR_ID
    }

    now = _now_hhmmss()

    params = {
        "fid_cond_mrkt_div_code": "J",
        "fid_input_iscd": code,
        "fid_input_hour_1": "090000",
        # 🔥 현재 시각 기준으로 제한
        "fid_input_hour_2": min(now, "153000"),
        "fid_period_div_code": interval,
        "fid_org_adj_prc": "1"
    }

    res = requests.get(url, headers=headers, params=params, timeout=10)
    data = res.json()

    # ⚠️ 장 마감 후 / 휴장일 방어
    if data.get("rt_cd") != "0":
        print("KIS minute error:", data)
        return pd.DataFrame(columns=["time","Open","High","Low","Close","Volume"])

    rows = data.get("output1", [])
    if not rows:
        return pd.DataFrame(columns=["time","Open","High","Low","Close","Volume"])

    df = pd.DataFrame(rows)
    df = df.rename(columns={
        "stck_cntg_hour": "time",
        "stck_oprc": "Open",
        "stck_hgpr": "High",
        "stck_lwpr": "Low",
        "stck_prpr": "Close",
        "cntg_vol": "Volume"
    })

    df["time"] = pd.to_datetime(df["time"], format="%H%M%S")
    for c in ["Open","High","Low","Close","Volume"]:
        df[c] = pd.to_numeric(df[c], errors="coerce")

    df.sort_values("time", inplace=True)
    return df
