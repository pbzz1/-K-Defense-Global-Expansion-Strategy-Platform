// src/data/weaponPins.js

export const WEAPON_PINS = [
  // ======================
  // CORE : 기술·부품 협력 시장
  // ======================
  {
    iso3: "USA",
    name: "미국",
    coordinates: [-98.5795, 39.8283], // 미국 중심
    weapons: ['satellite', 'rocket', 'drone'],
  },
  {
    iso3: "GBR",
    name: "영국",
    coordinates: [-3.4359, 55.3781],
    weapons: ['aircraft', 'jet'],
  },
  {
    iso3: "DEU",
    name: "독일",
    coordinates: [10.4515, 51.1657],
    weapons: ['jet', 'aircraft', 'drone'],
  },

  // ======================
  // EDGE : 전략 수주 핵심 시장
  // ======================
  {
    iso3: "POL",
    name: "폴란드",
    coordinates: [19.1451, 51.9194],
    weapons: ['jet', 'tank', 'submarine'],
  },
  {
    iso3: "SAU",
    name: "사우디",
    coordinates: [45.0792, 23.8859],
    weapons: [ `missile,fighter,aircraft`
    ],
  },
  {
    iso3: "ARE",
    name: "아랍에미리트",
    coordinates: [54.3773, 24.4539], // 아부다비 기준
    weapons: ["unmanned", "aircraft"],
  },
  {
    iso3: "EST",
    name: "에스토니아",
    coordinates: [25.0136, 58.5953],
    weapons: ['missile'],
  },
  {
    iso3: "ROU",
    name: "루마니아",
    coordinates: [24.9668, 45.9432],
    weapons: ['fighter', 'drone', 'missile'],
  },
  {
    iso3: "IRQ",
    name: "이라크",
    coordinates: [43.6793, 33.2232],
    weapons: ['drone', 'jet', 'tank'],
  },

  // ======================
  // NEW : 신시장 개척 대상
  // ======================
  {
    iso3: "CHL",
    name: "칠레",
    coordinates: [-71.5430, -35.6751],
    weapons: ['missile'],
  },
  {
    iso3: "COL",
    name: "콜롬비아",
    coordinates: [-74.2973, 4.5709],
    weapons: ['bomb', 'drone', 'military'],
  },
  {
    iso3: "PER",
    name: "페루",
    coordinates: [-75.0152, -9.1900],
    weapons: ['ship', 'armored', 'jet'],
  },
];
