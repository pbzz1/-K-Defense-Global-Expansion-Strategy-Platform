# backend/services/stock_search.py

import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.dirname(BASE_DIR)
DATA_DIR = os.path.join(BACKEND_DIR, "data")

CSV_PATH = os.path.join(DATA_DIR, "stock_list.csv")


def load_stock_df():
    try:
        return pd.read_csv(CSV_PATH, encoding="cp949")
    except UnicodeDecodeError:
        return pd.read_csv(CSV_PATH, encoding="utf-8-sig")


def search_stock(keyword: str):
    df = load_stock_df()

    result = df[df["종목명"].str.contains(keyword, na=False)]

    return result.head(10).to_dict(orient="records")
