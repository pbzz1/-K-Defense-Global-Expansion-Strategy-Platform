import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchStock = () => {
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div
      style={{
        height: 60,
        background: "#fff",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: 8,
        justifyContent: "space-between",
      }}
    >
    <h3 style={{ padding: 2 }}>📊Defense Dashboard</h3>
      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="종목명 검색"
          className="search-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") searchStock();
          }}
        />
        <button onClick={searchStock} className="search-button">검색</button>
      </div>
    </div>
  );
}
