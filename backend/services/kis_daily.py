import requests
import pandas as pd
from services.kis_auth import get_access_token
from config.settings import KIS_BASE_URL, KIS_APP_KEY, KIS_APP_SECRET

TR_ID = "FHKST03010100"

def get_daily_df(code, period="month"):
    token = get_access_token()

    rule = {
        "week": "W",
        "month": "ME",
        "year": "YE"
    }[period]

    url = f"{KIS_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice"

    headers = {
        "authorization": f"Bearer {token}",
        "appkey": KIS_APP_KEY,
        "appsecret": KIS_APP_SECRET,
        "tr_id": TR_ID
    }

    params = {
        "fid_cond_mrkt_div_code": "J",
        "fid_input_iscd": code,
        "fid_input_date_1": "20240101",
        "fid_input_date_2": "20261231",
        "fid_period_div_code": "D",
        "fid_org_adj_prc": "1"
    }

    res = requests.get(url, headers=headers, params=params)
    res.raise_for_status()

    df = pd.DataFrame(res.json()["output2"])
    df = df.rename(columns={
        "stck_bsop_date": "date",
        "stck_oprc": "Open",
        "stck_hgpr": "High",
        "stck_lwpr": "Low",
        "stck_clpr": "Close",
        "acml_vol": "Volume"
    })

    df["date"] = pd.to_datetime(df["date"])
    df.set_index("date", inplace=True)

    for c in df.columns:
        df[c] = pd.to_numeric(df[c], errors="coerce")

    df.sort_index(inplace=True)

    return df.resample(rule).agg({
        "Open": "first",
        "High": "max",
        "Low": "min",
        "Close": "last",
        "Volume": "sum"
    }).dropna()
