import { useNavigate } from "react-router-dom";
import { REGION, REGION_COUNTRIES } from "../../data/regions";

export default function Core() {
  const navigate = useNavigate();
  const countries = Array.from(REGION_COUNTRIES[REGION.CORE]);

  return (
    <div>
      <h1>CORE 시장 (수출중 10% 이상)</h1>
      <a
        href="/static-report/estonia.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        📄 국가 전략 리포트(정적 문서) 보기
      </a>
      <ul>
        {countries.map((iso3) => (
          <li
            key={iso3}
            style={{ cursor: "pointer", color: "#2F6BFF", marginBottom: 8 }}
            onClick={() => navigate(`/country/${iso3}`)}
          >
            {iso3}
          </li>
        ))}
      </ul>
    </div>
  );
}
