# backend/services/kis_domestic.py

import os
import pandas as pd

# 🔑 이 파일 기준 절대경로 계산
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.dirname(BASE_DIR)
ASSETS_DIR = os.path.join(BACKEND_DIR, "data")

CSV_PATH = os.path.join(ASSETS_DIR, "주식데이터20251228.csv")


def load_stock_df():
    """
    CSV를 실제 호출 시점에 로드
    """
    # 인코딩 자동 대응 (cp949 / utf-8 혼합 방지)
    try:
        return pd.read_csv(CSV_PATH, encoding="cp949")
    except UnicodeDecodeError:
        return pd.read_csv(CSV_PATH, encoding="utf-8-sig")


def search_stock_by_name(keyword: str):
    """
    종목명 검색
    """
    df = load_stock_df()

    result = df[df["종목명"].str.contains(keyword, na=False)]

    return result[["종목코드", "종목명"]].head(10).to_dict(orient="records")
