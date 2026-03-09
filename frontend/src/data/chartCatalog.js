// src/data/chartCatalog.js
export const CHART_CATALOG = {
  korea: {
    label: "대한민국 방산 전체",
    description: "국가 단위 방산 수출 구조 종합",
    images: [
      "kr_comp.png",
      "kr_top5_comp.png",
      "kr_categorychart.png",
    ],
  },
  hanwha: {
    label: "한화에어로스페이스",
    description: "방산·항공우주 수출 국가별 분석",
    images: [
      "amount.png",
      "amount_defense.png",
      "amount_defense2.png",
      "count.png",
      "count_defense.png",
      "count_defense2.png",
    ],
  },

  kai: {
    label: "한국항공우주",
    description: "해외 수출 비중 및 순위",
    images: ["abroad_rank.png", "abroad_ratio.png"],
  },

  lignex1: {
    label: "LIG넥스원",
    description: "주요 수출 국가 비중",
    images: ["lignex1_ratio.png"],
  },

  poongsan: {
    label: "풍산",
    description: "국가별 방산 수출 비중",
    images: ["poongsan_ratio.png"],
  },

  rotem: {
    label: "현대로템",
    description: "지상무기 수출 분석",
    images: [], // ← 없음
  },
};
