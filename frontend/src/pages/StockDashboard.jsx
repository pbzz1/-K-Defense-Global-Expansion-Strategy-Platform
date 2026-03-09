import React, { useState } from "react";
import ChartCard from "../components/ChartCard";

// const API_BASE =
//   window.location.hostname === "localhost"
//     ? "http://localhost:5000"
//     : window.location.origin;
// const API_BASE =  'https://9f9hp6tf-5000.asse.devtunnels.ms';

const API_BASE =  'http://localhost:5000';
const DEFENSE_TOP5 = [
  { name: "풍산", code: "103140" },
  { name: "한화에어로스페이스", code: "012450" },
  { name: "한화시스템", code: "272210" },
  { name: "한국항공우주", code: "047810" },
  { name: "현대로템", code: "064350" },
];

export default function StockDashboard() {
//분봉차트
const [period, setPeriod] = useState("day");   // week | month | year | minute
const [viewTop5Minute, setViewTop5Minute] = useState(false);

  /* 📊 종목별 차트 타입 */
  const [chartTypes, setChartTypes] = useState({});

  /* 📊 차트 타입 변경 */
  const handleChangeChartType = (code, type) => {
    setChartTypes((prev) => ({
      ...prev,
      [code]: type,
    }));
  };

  return (
    <div>
      <h2>Defense Stock Dashboard</h2>

      {/* 📊 기간 선택 버튼 */}
      <div className="period-selector">
        {[
          { key: "week", label: "주" },
          { key: "month", label: "월" },
          { key: "year", label: "종합" },
        ].map((p) => (
          <button
            key={p.key}
            className={`period-btn ${period === p.key ? "active" : ""}`}
            onClick={() => setPeriod(p.key)}
          >
            {p.label}
          </button>
        ))}
      </div>
      {/* 📊 TOP5 차트 */}
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
            name={stock.name}
            code={stock.code}
            apiBase={API_BASE}
            period={period}
            chartType={chartTypes[stock.code] || "bar"}
            onChangeChartType={handleChangeChartType}
          />
        ))}
      </div>
    </div>
  );
}
