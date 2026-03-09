import { useState } from "react";

export default function StockSearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    const res = await fetch(
      //`http://localhost:5000/api/korea/search?q=${query}`
      `https://9f9hp6tf-5000.asse.devtunnels.ms/api/korea/search?q=${query}`
    );
    const data = await res.json();
    setResults(data);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        placeholder="종목명 검색"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={search}>검색</button>

      <ul>
        {results.map(item => (
          <li
            key={item.종목코드}
            style={{ cursor: "pointer" }}
            onClick={() => onSelect(item)}
          >
            {item.종목명} ({item.종목코드})
          </li>
        ))}
      </ul>
    </div>
  );
}
