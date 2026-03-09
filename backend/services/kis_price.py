import requests
import os

KIS_BASE_URL = "https://openapi.koreainvestment.com:9443"

def get_domestic_price(access_token, stock_code):
    url = f"{KIS_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-price"

    headers = {
        "Content-Type": "application/json",
        "authorization": f"Bearer {access_token}",
        "appkey": os.getenv("KIS_APP_KEY"),
        "appsecret": os.getenv("KIS_APP_SECRET"),
        "tr_id": "FHKST01010100"
    }

    params = {
        "fid_cond_mrkt_div_code": "J",   # 코스피
        "fid_input_iscd": stock_code
    }

    res = requests.get(url, headers=headers, params=params)
    res.raise_for_status()

    output = res.json()["output"]

    return {
        "open": int(output["stck_oprc"]),
        "high": int(output["stck_hgpr"]),
        "low": int(output["stck_lwpr"]),
        "close": int(output["stck_prpr"])
    }
