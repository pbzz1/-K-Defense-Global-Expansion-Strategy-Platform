import { useParams } from "react-router-dom";
import { REGION, getRegionByISO3 } from "../data/regions";

export default function CountryDetail() {
  const { iso3 } = useParams();

  return (
    <div>
      {/* ⬇️ 여기서 HTML 로드 */}
      <div
        style={{
          marginTop: 24,
          border: "1px solid #ddd",
          borderRadius: 8,
          overflow: "hidden",
          height: "120vh",
        }}
      >
        <iframe
          src={`/static-report/${iso3.toLowerCase()}.html`}
          title="국가 전략 리포트"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </div>
    </div>
  );
}
