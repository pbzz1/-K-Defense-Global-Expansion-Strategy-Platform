import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import io

def draw_toss_style_chart(df, chart_type="line", title=""):
    """
    df columns:
    - Open, High, Low, Close, Volume
    index: datetime
    """

    fig, (ax_price, ax_vol) = plt.subplots(
        2, 1,
        figsize=(7, 4.5),
        sharex=True,
        gridspec_kw={"height_ratios": [3, 1]}
    )

    # =========================
    # 1️⃣ 가격 차트
    # =========================
    if chart_type == "line":
        ax_price.plot(
            df.index,
            df["Close"],
            color="#4C6EF5",
            linewidth=2.2
        )

    elif chart_type == "bar":
        ax_price.bar(
            df.index,
            df["Close"],
            color="#4C6EF5",
            width=0.8
        )

    ax_price.set_title(title, fontsize=12, pad=10)
    ax_price.grid(True, alpha=0.3)

    # 🔥 숫자 포맷 (1e6 제거)
    ax_price.ticklabel_format(axis="y", style="plain")
    ax_price.yaxis.set_major_formatter(
        ticker.FuncFormatter(lambda x, _: f"{int(x):,}")
    )

    # =========================
    # 2️⃣ 거래량 바 차트
    # =========================
    ax_vol.bar(
        df.index,
        df["Volume"],
        color="#ADB5BD",
        width=0.8
    )

    ax_vol.ticklabel_format(axis="y", style="plain")
    ax_vol.yaxis.set_major_formatter(
        ticker.FuncFormatter(lambda x, _: f"{int(x):,}")
    )

    ax_vol.grid(True, axis="y", alpha=0.2)

    plt.tight_layout()

    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches="tight")
    plt.close(fig)
    buf.seek(0)

    return buf
