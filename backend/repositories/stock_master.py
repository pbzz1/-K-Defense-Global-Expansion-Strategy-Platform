# backend/repositories/stock_master.py

import pandas as pd
import os
from datetime import datetime


BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")


class StockMaster:
    """
    국내 주식 마스터 데이터 관리 클래스
    - 종목명 / 종목코드 검색
    - 일별 가격 조회
    """

    def __init__(self):
        self.stock_list = self._load_stock_list()
        self.price_df = self._load_price_data()

    # ===============================
    # 내부 로딩 함수
    # ===============================

    def _load_stock_list(self):
        """
        종목 리스트 로딩
        (종목명, 종목코드)
        """
        path = os.path.join(DATA_DIR, "stock_list.csv")
        df = pd.read_csv(path, encoding="cp949")

        df["종목코드"] = df["종목코드"].astype(str).str.zfill(6)
        return df

    def _load_price_data(self):
        """
        주식 가격 데이터 로딩
        """
        path = os.path.join(DATA_DIR, "주식데이터20251228.csv")
        df = pd.read_csv(path, encoding="cp949")

        df["종목코드"] = df["종목코드"].astype(str).str.zfill(6)
        df["날짜"] = pd.to_datetime(df["날짜"])

        return df

    # ===============================
    # 외부 공개 메서드
    # ===============================

    def search_by_name(self, keyword: str):
        """
        종목명 검색
        """
        result = self.stock_list[
            self.stock_list["종목명"].str.contains(keyword, case=False, na=False)
        ][["종목명", "종목코드"]]

        return result.to_dict(orient="records")

    def get_today_price(self, code: str):
        """
        특정 종목의 가장 최근 가격 반환
        """
        code = str(code).zfill(6)

        df = self.price_df[self.price_df["종목코드"] == code]
        if df.empty:
            return None

        latest = df.sort_values("날짜").iloc[-1]

        return {
            "code": code,
            "open": self._safe_int(latest.get("시가")),
            "high": self._safe_int(latest.get("고가")),
            "low": self._safe_int(latest.get("저가")),
            "close": self._safe_int(latest.get("종가")),
            "volume": self._safe_int(latest.get("거래량")),
            "date": latest.get("날짜").strftime("%Y-%m-%d")
        }

    # ===============================
    # 유틸
    # ===============================

    def _safe_int(self, value):
        try:
            return int(value)
        except:
            return None
