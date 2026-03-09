// src/pages/CountryGroupReport.jsx
export default function CountryGroupReport() {
  return (
    <div style={{ height: "100vh" }}>
      <iframe
        src="../public/static-report/index.html"
        title="국가 그룹 분석 리포트"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
}
