import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import StockDashboard from "./pages/StockDashboard";
import StockSearch from "./pages/StockSearch";
import DashliteTab from "./pages/DashliteTab";
import WorldDashBoardTab from "./pages/WorldPreview.jsx";
import CompanyTradeDashboard from "./pages/CompanyTradeDashboard";
import CountryGroupReport from "./pages/CountryGroupReport";

import Core from "./components/region/core";
import Edge from "./components/region/edge";
import NewMarket from "./components/region/new";
import CountryDetail from "./pages/CountryDetail";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/worldpreview" />} />
        <Route path="/dashboard" element={<StockDashboard />} />
        <Route path="/search" element={<StockSearch />} />
        <Route path="/dashlite" element={<DashliteTab />} />
        <Route path="/company-trade" element={<CompanyTradeDashboard />} />

        <Route path="/worldpreview" element={<WorldDashBoardTab />} />

        {/* 단계별 */}
        <Route path="/region/core" element={<Core />} />
        <Route path="/region/edge" element={<Edge />} />
        <Route path="/region/new" element={<NewMarket />} />

        {/* 국가 상세 */}
        <Route path="/country/:iso3" element={<CountryDetail />} />
        <Route path="/country-group" element={<CountryGroupReport />} />

      </Route>
    </Routes>
  );
}

export default App;
