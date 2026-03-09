import os
from dotenv import load_dotenv

# .env 로드
load_dotenv()

# ===== KIS 공통 설정 =====
KIS_BASE_URL = "https://openapi.koreainvestment.com:9443"

KIS_APP_KEY = os.getenv("KIS_APP_KEY")
KIS_APP_SECRET = os.getenv("KIS_APP_SECRET")

# 방어 코드 (개발 중 즉시 에러 확인용)
if not KIS_APP_KEY or not KIS_APP_SECRET:
    raise RuntimeError("❌ KIS_APP_KEY 또는 KIS_APP_SECRET이 .env에 없습니다.")
