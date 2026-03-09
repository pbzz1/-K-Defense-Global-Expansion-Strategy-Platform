// frontend/src/components/ChartCard.jsx
import React, { useMemo } from "react";

export default function ChartCard({
  name,
  code,
  apiBase,
  period,
  chartType,
  onChangeChartType,
}) {
  /**
   * period별 API URL 결정
   */
  const imgSrc = useMemo(() => {
    if (period === "minute") {
      // 분봉
      return `${apiBase}/api/korea/minute/${code}?interval=1`;
    }

    if (period === "week" || period === "month") {
      // 주 / 월
      return `${apiBase}/api/korea/chart/period/${code}?period=${period}`;
    }

    if (period === "year") {
      // 종합 (연간/전체 개요 → 오늘 차트 활용)
      return `${apiBase}/api/korea/chart/${code}?type=${encodeURIComponent(
        chartType
      )}&zoom=1&title=${encodeURIComponent(`${name} (${code})`)}`;
    }

    // 기본(day)
    return `${apiBase}/api/korea/chart/${code}?type=${encodeURIComponent(
      chartType
    )}&zoom=1&title=${encodeURIComponent(`${name} (${code})`)}`;
  }, [apiBase, code, period, chartType, name]);

  /**
   * 🔥 캐시 무효화 (화면 이동 후 복귀 시 차트 안 비게)
   */
  const finalSrc = `${imgSrc}${
    imgSrc.includes("?") ? "&" : "?"
  }_=${Date.now()}`;

  return (
    <div
      style={{
        border: "1px solid #e5e9f2",
        background: "#fff",
        borderRadius: 10,
        padding: 14,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {/* 제목 */}
      <div style={{ fontWeight: 700, marginBottom: 10 }}>{name}</div>

      {/* 차트 타입 선택 */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <select
          value={chartType}
          onChange={(e) => onChangeChartType(code, e.target.value)}
          style={{
            padding: "6px 8px",
            borderRadius: 6,
            border: "1px solid #ddd",
          }}
          disabled={period !== "year" && period !== "day"}
        >
          {/* <option value="bar">막대</option>
          <option value="line">라인</option>
          <option value="candle">캔들</option> */}
        </select>

        {period === "minute" && (
          <span style={{ fontSize: 12, color: "#8094ae" }}>
            (분봉은 고정 차트)
          </span>
        )}
      </div>

      {/* 차트 이미지 */}
      <div style={{ marginTop: 12 }}>
        <img
          src={finalSrc}
          alt={`${name} chart`}
          style={{
            width: "100%",
            borderRadius: 8,
            border: "1px solid #f0f2f5",
          }}
          onError={(e) => {
            // 이미지 깨질 경우 최소한의 UX 유지
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    </div>
  );
}
