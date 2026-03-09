export default function StockDetail({ stock }) {
  const chartUrl = `http://localhost:5000/api/korea/chart?code=${stock.종목코드}`;

  return (
    <div style={{ marginBottom: 30 }}>
      <h2>{stock.종목명} ({stock.종목코드})</h2>

      <img
        src={chartUrl}
        alt={stock.종목명}
        style={{ width: 600 }}
      />

      <ul>
        <li>시장구분: {stock.시장구분}</li>
        <li>소속부: {stock.소속부 || "없음"}</li>
      </ul>
    </div>
  );
}
