import { useNavigate } from "react-router-dom";
import { REGION, REGION_COUNTRIES } from "../../data/regions";

export default function NewMarket() {
  const navigate = useNavigate();
  const countries = Array.from(REGION_COUNTRIES[REGION.NEW]);

  return (
    <div>
      <h1>NEW 시장 (신시장)</h1>

      <ul>
        {countries.map((iso3) => (
          <li
            key={iso3}
            style={{ cursor: "pointer", color: "#F7B84B", marginBottom: 8 }}
            onClick={() => navigate(`/country/${iso3}`)}
          >
            {iso3}
          </li>
        ))}
      </ul>
    </div>
  );
}
