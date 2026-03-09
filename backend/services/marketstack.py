import requests
from config.settings import MARKETSTACK_API_KEY, MARKETSTACK_BASE_URL

def get_global_stock(symbol, date_from, date_to, limit=100):
    url = f"{MARKETSTACK_BASE_URL}/eod"
    params = {
        "access_key": MARKETSTACK_API_KEY,
        "symbols": symbol,
        "date_from": date_from,
        "date_to": date_to,
        "limit": limit,
        "sort": "DESC"
    }
    res = requests.get(url, params=params)
    res.raise_for_status()
    return res.json()["data"]
