export default function SearchResultPanel({ results, onSelect }) {
  if (!Array.isArray(results) || results.length === 0) {
    return (
      <div style={{ padding: 12, color: "#777" }}>
        검색 결과 없음
      </div>
    );
  }

  return (
    <div style={{ padding: 12 }}>
      <h4>검색 결과</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {results.map((item, idx) => (
          <li
            key={item.code ?? idx}
            style={{
              cursor: "pointer",
              padding: "6px 0",
              borderBottom: "1px solid #eee",
            }}
            onClick={() => onSelect(item)}
          >
            {item.name} ({item.code})
          </li>
        ))}
      </ul>
    </div>
  );
}
