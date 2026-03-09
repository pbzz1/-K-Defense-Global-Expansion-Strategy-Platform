import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import countriesTopo from "world-atlas/countries-110m.json";

import { NAME_TO_ISO3 } from "../data/nameToIso3";
import { getRegionByISO3, REGION_STYLE } from "../data/regions";
import { WEAPON_PINS } from "../data/weaponPins";
import Snowfall from "react-snowfall";
/* =========================
   핀 색상 (시장 그룹 연동)
========================= */
const PIN_COLOR = {
  CORE: "#4f7cff", // 파랑
  EDGE: "#3ddc97", // 초록
  NEW: "#f5c542",  // 노랑
};

export default function WorldMap() {
  const navigate = useNavigate();

  /* 국가 hover 이름 */
  const [hoverName, setHoverName] = useState("");

  /* 핀 hover */
  const [hoverPin, setHoverPin] = useState(null);

  // TopoJSON (memoized)
  const geoUrl = useMemo(() => countriesTopo, []);

  const BASE_FILL = "#C9D0DB";
  const BASE_STROKE = "#9AA6B2";

  /** 국가 → region(stage) 판별 */
  const getRegionFromGeo = (geo) => {
    const name = geo?.properties?.name;
    const iso3 = NAME_TO_ISO3[name];
    return iso3 ? getRegionByISO3(iso3) : null;
  };

  /** 클릭 시 국가 상세 이동 (원하면 사용) */
  const handleCountryClick = (geo) => {
    const name = geo?.properties?.name;
    const iso3 = NAME_TO_ISO3[name];
    if (iso3) {
      navigate(`/country/${iso3}`);
    }
  };

  /** 채우기 색상 */
  const getFill = (geo) => {
    const region = getRegionFromGeo(geo);
    return region ? REGION_STYLE[region].fill : BASE_FILL;
  };

  /** 글로우 효과 */
  const getGlow = (geo) => {
    const region = getRegionFromGeo(geo);
    return region
      ? `drop-shadow(0 0 10px ${REGION_STYLE[region].glow})`
      : "none";
  };

  /** 클릭 가능 여부 */
  const isClickable = (geo) => !!getRegionFromGeo(geo);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Snowfall color="#82C3D9"/>
      {/* =========================
         Hover 국가명 (좌상단)
      ========================= */}
      {hoverName && (
        <div
          style={{
            position: "absolute",
            left: 24,
            top: 24,
            padding: "10px 14px",
            borderRadius: 12,
            background: "rgba(0,0,0,0.35)",
            color: "#fff",
            backdropFilter: "blur(6px)",
            fontWeight: 700,
            zIndex: 20,
          }}
        >
          {hoverName}
        </div>
      )}

      {/* =========================
         범례 (좌하단)
      ========================= */}
      <div
        style={{
          position: "absolute",
          left: 24,
          bottom: 24,
          padding: "14px 16px",
          borderRadius: 14,
          background: "rgba(0,0,0,0.4)",
          color: "#fff",
          backdropFilter: "blur(6px)",
          zIndex: 20,
          minWidth: 260,
        }}
      >
        <div style={{ fontWeight: 800, marginBottom: 10, fontSize: 14 }}>
          수출 단계 범례
        </div>

        {Object.entries(REGION_STYLE).map(([key, style]) => (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
              fontSize: 13,
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                background: style.fill,
                boxShadow: `0 0 10px ${style.glow}`,
                display: "inline-block",
              }}
            />
            <span>{style.label}</span>
          </div>
        ))}
      </div>

      {/* =========================
         지도
      ========================= */}
      <ComposableMap
        projection="geoMercator"
        style={{ position: "relative", width: "100%", height: "100%", overflow: "visible" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const clickable = isClickable(geo);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() =>
                    setHoverName(geo?.properties?.name || "")
                  }
                  onMouseLeave={() => setHoverName("")}
                  onClick={() => clickable && handleCountryClick(geo)}
                  style={{
                    default: {
                      fill: getFill(geo),
                      stroke: BASE_STROKE,
                      strokeWidth: 0.6,
                      outline: "none",
                      filter: getGlow(geo),
                      cursor: clickable ? "pointer" : "default",
                      transition: "all 120ms ease",
                    },
                    hover: {
                      fill: clickable ? "#FFFFFF" : getFill(geo),
                      stroke: BASE_STROKE,
                      strokeWidth: 0.9,
                      outline: "none",
                      cursor: clickable ? "pointer" : "default",
                    },
                    pressed: {
                      fill: getFill(geo),
                      stroke: BASE_STROKE,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* =========================
           무기 핀
        ========================= */}
        {WEAPON_PINS.map((pin) => {
          const region = getRegionByISO3(pin.iso3);
          const color = PIN_COLOR[region];

          return (
            <Marker key={pin.iso3} coordinates={pin.coordinates}>
              {/* 외곽 글로우 */}
              {/* <circle r={7} fill={`${color}33`} /> */}
              <g
                onClick={() => handleCountryClick(pin.iso3)}
                onMouseEnter={() => handleCountryClick(pin.name)}
                onMouseLeave={() => setHoverName("")}
                style={{ cursor: "pointer" }}
              >
                {/* 핀 외형 */}
                {/* <circle r={0.1} fill="#fff" stroke="#000" strokeWidth={2} />
                <circle r={0.1} fill="#000" /> */}
              </g>
              {/* 메인 핀 */}
              <circle
                r={3}
                fill={color}
                stroke="#ffffff"
                strokeWidth={1.5}
                onMouseEnter={() => setHoverPin(pin.iso3)}
                onMouseLeave={() => setHoverPin(null)}
              />

              {/* 중심 점 */}
              <circle r={1.8} fill="#ff0000" />
              
              {/* hover 시 라벨 */}
              {hoverPin === pin.iso3 && (
                <g transform="translate(10, -10)">
                  {/* 연결선 */}
                  <line
                    x1={0}
                    y1={0}
                    x2={12}
                    y2={-12}
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth={1}
                  />

                  {/* 라벨 박스 */}
                  <rect
                    x={12}
                    y={-24}
                    rx={6}
                    ry={6}
                    width={pin.weapons.join(", ").length * 6 + pin.name.length * 6  +10}
                    height={22}
                    fill="rgba(20,20,20,0.85)"
                    stroke="rgba(255,255,255,0.25)"
                  />

                  {/* 텍스트 */}
                  <text
                    x={20}
                    y={-9}
                    fontSize={11}
                    fill="#ffffff"
                    fontWeight={600}
                  >
                  <tspan x={20} dy={0}>
                    {pin.name}
                  </tspan>
                    {pin.weapons.length > 0
                      ? `: ${pin.weapons.join(", ")}`
                      : ""}
                  </text>
                </g>
              )}
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
}
