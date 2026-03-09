// src/components/CapabilityChips.jsx
export default function CapabilityChips({ capabilities = [] }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {capabilities.map((cap, idx) => (
        <span
          key={idx}
          style={{
            display: "inline-block",
            padding: "6px 12px",
            marginRight: 8,
            marginBottom: 8,
            borderRadius: 16,
            fontSize: 13,
            fontWeight: 500,
            backgroundColor: getColorByType(cap.type),
            color: "#333",
          }}
        >
          #{cap.label}
        </span>
      ))}
    </div>
  );
}

function getColorByType(type) {
  const colors = {
    weapon: "#FFE2E2",
    ammo: "#FFF1CC",
    aircraft: "#E2F0FF",
    navy: "#E6ECFF",
    mro: "#E8F7EE",
    engine: "#F3E8FF",
    system: "#F1F3F5",
  };
  return colors[type] || "#F1F3F5";
}
