import { useState } from "react";
import CapabilityChips from "../components/CapabilityChips";
import { COMPANY_CAPABILITIES } from "../data/companyCapabilities";
/**
 * 기업 / korea 공통으로 취급
 * public/charts/{key}/ 아래 이미지들을 그대로 사용
 */
const TARGETS = [
  { label: "Korea 종합", key: "korea" },
  { label: "한화에어로스페이스", key: "hanwha" },
  { label: "KAI", key: "kai" },
  { label: "LIG넥스원", key: "lignex1" },
  { label: "현대로템", key: "rotem" },
  { label: "풍산", key: "poongsan" },
];

/**
 * 파일명에 포함되면 원차트(도넛/파이)로 간주
 */
const PIE_KEYWORDS = ["pie", "donut", "ratio",'amount','count','comp'];

const isPieChart = (filename) =>
  PIE_KEYWORDS.some((k) => filename.toLowerCase().includes(k));

export default function CompanyTradeDashboard() {
  const [target, setTarget] = useState("korea");

  /**
   * 정적 이미지 목록 (실시간 X)
   * 👉 실제 존재하는 파일명만 여기에 나열
   * 👉 없으면 자동으로 "차트 생성 예정" 처리
   */
  const IMAGE_MAP = {
    hanwha: [
      "amount.png",
      "amount_defense.png",
      "count.png",
      "count_defense.png",
      "swot.png",
    ],
    kai: ["swot.png",'abroad_ratio.png', 'abroad_rank.png',],
    lignex1: ['lignex1_ratio.png',"swot.png",],
    rotem: ['amount_chart.png','count_chart.png','sell_country_chart.png',"swot.png",],
    poongsan: ['poongsan_ratio.png',],
    korea: ["kr_categorychart.png","sell_country.png", "sell_country_korea.png" ],
  };

  const images = IMAGE_MAP[target] || [];

  const pieImages = images.filter(isPieChart);
  const normalImages = images.filter((img) => !isPieChart(img));

  return (
    <div style={{ padding: 12 }}>
      {/* ===== 헤더 ===== */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 8 }}>기업별 국가 거래 비중 분석</h2>
      </div>

      {/* ===== 기업 선택 ===== */}
      <div style={{ marginBottom: 24 }}>
        <select
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="company-select"
        >
          {TARGETS.map((t) => (
            <option key={t.key} value={t.key}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <CapabilityChips capabilities={COMPANY_CAPABILITIES[target]}/>

      {/* ===== 이미지 없을 때 ===== */}
      {images.length === 0 && (
        <div
          style={{
            padding: 48,
            textAlign: "center",
            color: "#9ca3af",
            border: "1px dashed #d1d5db",
            borderRadius: 8,
          }}
        >
          차트 생성 예정
        </div>
      )}

      {/* ===== 일반 차트 (세로 1열) ===== */}
      {normalImages.map((img, i) => (
        <div key={i} style={{ marginBottom: 32 }}>
          <img
            src={`/charts/${target}/${img}`}
            alt={img}
            style={{
              width: "100%",
              maxWidth: 960,
              borderRadius: 8,
              border: "1px solid #eee",
            }}
          />
        </div>
      ))}

      {/* ===== 원차트 (2열 그리드) ===== */}
      {pieImages.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
            gap: 24,
            marginTop: 24,
          }}
        >
          {pieImages.map((img, i) => (
            <div
              key={i}
              style={{
                padding: 12,
                borderRadius: 8,
                border: "1px solid #eee",
                background: "#fff",
              }}
            >
              <img
                src={`/charts/${target}/${img}`}
                alt={img}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
