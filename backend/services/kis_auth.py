import os, requests, time
from dotenv import load_dotenv

load_dotenv()

_TOKEN = None
_EXPIRE = 0

def get_access_token():
    global _TOKEN, _EXPIRE

    # 이미 유효한 토큰 있으면 그대로 사용
    if _TOKEN and time.time() < _EXPIRE:
        return _TOKEN

    res = requests.post(
        "https://openapi.koreainvestment.com:9443/oauth2/tokenP",
        json={
            "grant_type": "client_credentials",
            "appkey": os.getenv("KIS_APP_KEY"),
            "appsecret": os.getenv("KIS_APP_SECRET")
        },
        timeout=10
    )

    data = res.json()

    if "access_token" not in data:
        raise RuntimeError(
            f"KIS token error: {data.get('error_code')} {data.get('error_description')} | raw={data}"
        )

    _TOKEN = data["access_token"]
    _EXPIRE = time.time() + int(data["expires_in"]) - 60
    return _TOKEN
