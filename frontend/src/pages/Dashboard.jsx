import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ChartCard from "../components/ChartCard";
import SearchResultPanel from "../components/search/SearchResultPanel";
import StockDetail from "../components/search/StockDetail";


const DEFENSE_TOP5 = [
  { name: "풍산", code: "103140" },
  { name: "한화에어로스페이스", code: "012450" },
  { name: "한화시스템", code: "272210" },
  { name: "한국항공우주", code: "047810" },
  { name: "현대로템", code: "064350" },
];

export default function Dashboard() {
  /* ===============================
     🔗 Layout(Outlet)에서 검색 결과 받기
  =============================== */
  const { searchResults } = useOutletContext();

  /* ===============================
     기존 상태 (TOP5 유지)
  =============================== */
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false);

  /* ===============================
     검색 결과 선택 상태
  =============================== */
  const [selectedStock, setSelectedStock] = useState(null);

  /* ===============================
     기존 TOP5 실시간 조회 (유지)
  =============================== */
  const loadTop5Prices = async () => {
    setLoading(true);

    try {
      // 1️⃣ 토큰 발급
      await fetch("http://localhost:5000/api/korea/init-token", {
        method: "POST",
      });

      // 2️⃣ 가격 조회
      const results = {};

      for (const stock of DEFENSE_TOP5) {
        const res = await fetch(
          `http://localhost:5000/api/korea/today/${stock.code}`
        );
        const json = await res.json();
        results[stock.code] = json;
      }

      setPrices(results);
    } catch (e) {
      console.error("실시간 데이터 로드 실패", e);
      alert("실시간 데이터 로드 실패 (백엔드 확인)");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     화면 렌더링
  =============================== */
  return (
    <div>
      <h2>Defense Stock Dashboard</h2>

      {/* 🔑 TOP5 실시간 버튼 */}
      <button onClick={loadTop5Prices}>
        🔑 방산 TOP5 실시간 조회
      </button>

      {/* 📊 TOP5 카드 */}
      <div
        style={{
          marginTop: 20,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
        }}
      >
        {DEFENSE_TOP5.map((stock) => (
          <ChartCard
            key={stock.code}
            title={stock.name}
            data={prices[stock.code]}
            type="bar"
            loading={loading}
          />
        ))}
      </div>

      {/* 🔍 검색 결과 + 종목 상세 */}
      <div
        style={{
          marginTop: 30,
          display: "flex",
          gap: 20,
        }}
      >
        {/* 검색 결과 목록 */}
        <div style={{ flex: 1 }}>
          <SearchResultPanel
            results={searchResults}
            onSelect={setSelectedStock}
          />
        </div>

        {/* 선택 종목 상세 */}
        <div style={{ flex: 2 }}>
          <StockDetail stock={selectedStock} />
        </div>
      </div>
    </div>
  );
}
