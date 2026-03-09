import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ChartCard from "../components/ChartCard";

//const API_BASE = "http://localhost:5000";
const API_BASE =  'https://9f9hp6tf-5000.asse.devtunnels.ms';
/* 🔢 8가지 차트 정의 */
const CHART_VIEWS = [
  { key: "bar", label: "가격(막대)", type: "bar" },
  { key: "line", label: "가격(라인)", type: "line" },
  { key: "candle", label: "캔들", type: "candle" },
  { key: "zoom", label: "가격 확대", type: "line", zoom: 2 },
  { key: "short", label: "단기 추세", type: "line", window: 5 },
  { key: "mid", label: "중기 추세", type: "line", window: 20 },
  { key: "range", label: "변동성", type: "bar", metric: "range" },
  { key: "volume", label: "거래량", type: "bar", metric: "volume" },
];

export default function StockSearch() {
  const [params] = useSearchParams();
  const query = params.get("q");

  const [results, setResults] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [tokenReady, setTokenReady] = useState(false);

  /* 🔑 토큰 */
const initToken = async () => {
  try {
    await fetch(`${API_BASE}/api/korea/init-token`, { method: "POST" });
    setTokenReady(true);
  } catch (err) {
    console.warn("⚠️ initToken 실패:", err.message);
    setTokenReady(false); // 앱 죽이지 말 것
  }
};

  /* 🔍 검색 */
  useEffect(() => {
    if (!query) return;

    const fetchSearch = async () => {
      const res = await fetch(
        `${API_BASE}/api/korea/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      const list = data.results || [];

      setResults(list);
      if (list.length > 0) setSelectedStock(list[0]);
    };

    fetchSearch();
    initToken();
  }, [query]);

  return (
    <div>
      <h2>검색 결과</h2>
      <p>
        검색어: <b>{query}</b>
      </p>

      {/* 📋 검색 결과 */}
      <ul>
        {results.map((item) => (
          <li
            key={item.종목코드}
            style={{
              cursor: "pointer",
              fontWeight:
                selectedStock?.종목코드 === item.종목코드 ? 700 : 400,
            }}
            onClick={() => setSelectedStock(item)}
          >
            {item.종목명} ({item.종목코드})
          </li>
        ))}
      </ul>

      {/* 📊 8가지 차트 */}
      {selectedStock && (
        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
          }}
        >
          {CHART_VIEWS.map((cfg) => (
            <ChartCard
              key={cfg.key}
              name={`${selectedStock.종목명} - ${cfg.label}`}
              code={selectedStock.종목코드}
              apiBase={API_BASE}
              tokenReady={tokenReady}
              chartType={cfg.type}
              onChangeChartType={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}
