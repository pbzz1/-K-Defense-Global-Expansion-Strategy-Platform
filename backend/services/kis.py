import requests
from config.settings import KIS_APP_KEY, KIS_APP_SECRET, KIS_BASE_URL
from cachetools import TTLCache
from utils.http import post_json

# 한화에어로스페이스 : 012450
# 현대로템 : 064350
# 한국항공우주(KAI) : 047810
# 한화시스템 : 272210
# LIG넥스원 : 079550
# 풍산 : 103140

token_cache = TTLCache(maxsize=1, ttl=60 * 50)

def get_access_token():
    if "token" in token_cache:
        return token_cache["token"]

    url = f"{KIS_BASE_URL}/oauth2/tokenP"
    headers = {"content-type": "application/json"}
    body = {
        "grant_type": "client_credentials",
        "appkey": KIS_APP_KEY,
        "appsecret": KIS_APP_SECRET,
    }

    data = post_json(url, headers=headers, data=body)
    token_cache["token"] = data["access_token"]
    return data["access_token"]

def get_korea_stock_price(stock_code):
    token = get_access_token()

    url = f"{KIS_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-price"
    headers = {
        "authorization": f"Bearer {token}",
        "appkey": KIS_APP_KEY,
        "appsecret": KIS_APP_SECRET,
        "tr_id": "FHKST01010100"
    }
    params = {
        "fid_cond_mrkt_div_code": "J",
        "fid_input_iscd": stock_code
    }

    res = requests.get(url, headers=headers, params=params)
    res.raise_for_status()
    return res.json()["output"]

