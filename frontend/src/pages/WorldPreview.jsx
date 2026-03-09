import React from "react";
import WorldMap from "../components/WorldMap";

export default function Landing() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "radial-gradient(circle at 50% 40%, #16254A 0%, #070B18 55%, #040610 100%)",
        overflow: "hidden",
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <WorldMap />
      </div>
    </div>
  );
}
