const titles = [
  "가격 추이",
  "거래량",
  "이동평균",
  "변동성",
  "수익률 분포",
  "누적 수익률",
  "비교 차트",
  "기술 지표",
];

export default function ChartGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
      }}
    >
      {titles.map((title) => (
        <div
          key={title}
          style={{
            border: "1px solid #ddd",
            height: 180,
            padding: 8,
            background: "#fafafa",
          }}
        >
          <strong>{title}</strong>
          <div style={{ marginTop: 12, color: "#999" }}>
            차트 생성 예정
          </div>
        </div>
      ))}
    </div>
  );
}
