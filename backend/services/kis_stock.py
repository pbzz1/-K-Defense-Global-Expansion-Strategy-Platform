# backend/services/kis_stock.py
import os
import time
import requests

from services.kis_auth import get_access_token
from config.settings import KIS_BASE_URL, KIS_APP_KEY, KIS_APP_SECRET

# KIS 국내주식 현재가 조회 TR
TR_ID_PRICE = "FHKST01010100"

def _to_int(x):
    try:
        if x is None:
            return None
        s = str(x).strip()
        if s == "" or s.lower() == "none":
            return None
        # "12,345" 같은 케이스 방어
        s = s.replace(",", "")
        return int(float(s))
    except Exception:
        return None

def get_today_price(stock_code: str):
    """
    return:
      {
        "code": "064350",
        "open": 12345,
        "high": 13000,
        "low": 12000,
        "close": 12800,
        "volume": 1234567
      }
    """
    token = get_access_token()

    url = f"{KIS_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-price"
    headers = {
        "authorization": f"Bearer {token}",
        "appkey": KIS_APP_KEY,
        "appsecret": KIS_APP_SECRET,
        "tr_id": TR_ID_PRICE,
    }
    params = {
        "fid_cond_mrkt_div_code": "J",     # KOSPI/KOSDAQ 통합은 J
        "fid_input_iscd": stock_code,
    }

    r = requests.get(url, headers=headers, params=params, timeout=10)
    r.raise_for_status()
    j = r.json()

    # KIS는 output 안에 값이 들어오는 형태가 일반적
    out = j.get("output") or {}
    # 필드명: 시가 stck_oprc, 고가 stck_hgpr, 저가 stck_lwpr, 현재가 stck_prpr, 거래량 acml_vol
    data = {
        "code": stock_code,
        "open": _to_int(out.get("stck_oprc")),
        "high": _to_int(out.get("stck_hgpr")),
        "low": _to_int(out.get("stck_lwpr")),
        "close": _to_int(out.get("stck_prpr")),
        "volume": _to_int(out.get("acml_vol")),
    }

    return data
