import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
  const location = useLocation();
  const isWorldPreview = location.pathname === "/worldpreview";

  const [searchResults, setSearchResults] = useState([]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column", // ⭐ 세로 구조
      }}
    >
      {/* ✅ Topbar: 항상 최상단 */}
      {!isWorldPreview && (
        <Topbar setSearchResults={setSearchResults} />
      )}

      {/* 아래 영역: Sidebar + Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          minHeight: 0, // ⭐ 스크롤 버그 방지 (중요)
        }}
      >
        {/* Sidebar */}
        {!isWorldPreview && <Sidebar />}

        {/* 메인 콘텐츠 영역 */}
        <div
          style={{
            flex: 1,
            overflow: isWorldPreview ? "hidden" : "auto",
          }}
        >
          <div
            style={{
              padding: isWorldPreview ? 0 : 24,
              minHeight: "100%",
            }}
          >
            <Outlet context={{ searchResults }} />
          </div>
        </div>
      </div>
    </div>
  );
}
