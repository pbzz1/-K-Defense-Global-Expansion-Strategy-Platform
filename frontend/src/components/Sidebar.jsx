import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const baseStyle = {
    padding: "12px 20px",
    display: "block",
    textDecoration: "none",
    color: "#333",
  };

  const activeStyle = {
    background: "#6576ff",
    color: "#fff",
  };

  return (
    <div id= 'sidebar'>
      <aside
        style={{
          width: 240,
          background: "#fff",
          borderRight: "1px solid #ddd",
        }}
      >
        {/* <h3 style={{ padding: 20 }}>Defense Dashboard</h3> */}

        <NavLink
          to="/worldpreview"
          style={({ isActive }) =>
            isActive ? { ...baseStyle, ...activeStyle } : baseStyle
          }
        >
          🌍 Global Overview
        </NavLink>

        <NavLink
          to="/company-trade"
          style={({ isActive }) =>
            isActive ? { ...baseStyle, ...activeStyle } : baseStyle
          }
        >
          📈 Company Analytics
        </NavLink>

        <NavLink
          to="/dashboard"
          style={({ isActive }) =>
            isActive ? { ...baseStyle, ...activeStyle } : baseStyle
          }
        >
          📊 Market Dashboard
        </NavLink>
        
        {/* <NavLink
          to="/dashlite"
          style={({ isActive }) =>
            isActive ? { ...baseStyle, ...activeStyle } : baseStyle
          }
        >
          🧩 dashlite
        </NavLink> */}
      </aside>
    </div>
  );
}
