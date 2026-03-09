import { useNavigate } from "react-router-dom";
import { REGION, REGION_COUNTRIES } from "../../data/regions";
import "./edge.css";

export default function Edge() {
  const navigate = useNavigate();
  const countries = Array.from(REGION_COUNTRIES[REGION.EDGE]);

  return (
    <div className="edge-grid">
      {countries.map((iso3) => (
        <div
          key={iso3}
          className="edge-card"
          onClick={() => navigate(`/country/${iso3}`)}
        >
          <div className="iso">{iso3}</div>
          <div className="desc">잠재 수출 시장</div>
        </div>
      ))}
    </div>
  );
}
