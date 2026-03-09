import os
import matplotlib.pyplot as plt
from config.settings import CHART_SAVE_PATH
import matplotlib.font_manager as fm
import sys

# ===== 한글 폰트 설정 =====
if sys.platform.startswith("win"):
    font_path = "C:/Windows/Fonts/malgun.ttf"   # 윈도우
elif sys.platform.startswith("darwin"):
    font_path = "/System/Library/Fonts/AppleGothic.ttf"  # macOS
else:
    font_path = "/usr/share/fonts/truetype/nanum/NanumGothic.ttf"  # Linux

if os.path.exists(font_path):
    font_name = fm.FontProperties(fname=font_path).get_name()
    plt.rc("font", family=font_name)

# 마이너스 기호 깨짐 방지
plt.rcParams["axes.unicode_minus"] = False
def draw_stock_chart(stock_code, stock_name, price_data):
    os.makedirs(CHART_SAVE_PATH, exist_ok=True)

    labels = ["시가", "고가", "저가", "현재가"]
    values = price_data

    file_path = f"{CHART_SAVE_PATH}/{stock_code}.png"

    plt.figure(figsize=(8, 4))
    plt.bar(labels, values)
    plt.title(f"{stock_name} ({stock_code})")
    plt.tight_layout()
    plt.savefig(file_path)
    plt.close()

    return file_path
