// src/data/regions.js

/**
 * 시장 단계 정의
 * - CORE : 수출중 10% 이상 (주력 시장)
 * - EDGE : 수출중 10% 미만, 시간적 우위 확보 시장
 * - NEW  : 아직 수출 없음, 신규 개척 시장
 */
export const REGION = {
  CORE: "core",
  EDGE: "edge",
  NEW: "new",
};

/**
 * ISO3 코드 기준 국가 분류
 * WorldMap / Stage 페이지 / 국가 상세 라우팅에서 공통 사용
 */

// Group1 : 미국 / 영국 / 독일 
// Group2-1 : 사우디 -  UAE, 이라크 
// Group2-2 : 폴란드 - 에스토니아, 루마니아 
// Group3 : 페루,칠레,콜롬비아
export const REGION_COUNTRIES = {
  [REGION.CORE]: new Set([
    "USA", // 미국
    "GBR", // 영국
    "DEU", // 독일
  ]),

  [REGION.EDGE]: new Set([
    "POL", // 폴란드
    "SAU", // 사우디아라비아
    "ARE", // UAE
    "EST", // 에스토니아
    "ROU", // 루마니아
    "IRQ", // 이라크

  ]),

  [REGION.NEW]: new Set([
    "CHL", // 칠레
    "COL", // 콜롬비아
    "PER", // 페루
  ]),
};

/**
 * 지도 시각화용 스타일
 * - fill  : 국가 채움색
 * - glow  : hover / 강조 효과
 * - label : 범례(Legend) 텍스트
 */
export const REGION_STYLE = {
  [REGION.CORE]: {
    fill: "#2F6BFF",                 // 블루 (핵심 시장)
    glow: "rgba(47,107,255,0.75)",
    label: "Advanced Partnership Market (CORE)",
  },

  [REGION.EDGE]: {
    fill: "#34C38F",                 // 그린 (확장 시장)
    glow: "rgba(52,195,143,0.75)",
    label: "유럽권 및 중동권(EDGE)",
  },

  [REGION.NEW]: {
    fill: "#F7B84B",                 // 옐로우 (신시장)
    glow: "rgba(247,184,75,0.75)",
    label: "신시장 (NEW)",
  },
};

/**
 * ISO3 → 시장 단계 판별
 * WorldMap.jsx에서 그대로 사용
 */
export function getRegionByISO3(iso3) {
  for (const [region, countrySet] of Object.entries(REGION_COUNTRIES)) {
    if (countrySet.has(iso3)) {
      return region;
    }
  }
  return null;
}
