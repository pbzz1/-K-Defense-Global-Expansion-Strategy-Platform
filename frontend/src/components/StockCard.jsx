export default function StockCard({ code, name }) {
  const chartUrl = `http://localhost:5000/api/korea/chart?code=${code}`;

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <h4>{name}</h4>
      <img
        src={chartUrl}
        alt={name}
        style={{ width: "100%" }}
      />
    </div>
  );
}
