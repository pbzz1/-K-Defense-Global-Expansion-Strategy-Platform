import ChartGrid from "./ChartGrid";

export default function StockDetail({ stock }) {
  if (!stock) {
    return (
      <div style={{ padding: 12, color: "#777" }}>
        종목을 선택하세요
      </div>
    );
  }

  return (
    <div style={{ padding: 12 }}>
      <h3>
        {stock.name} ({stock.code})
      </h3>
      <ChartGrid />
    </div>
  );
}
