import { useNavigate } from "react-router-dom";
import type { Umkm } from "../../models/umkmModel";
import StarIcon from "../Icon/StarIcon";

export default function NormalSearchContent({
  data,
  type,
}: {
  data?: Umkm[];
  type?: "umkm" | "product";
  firstTime?: boolean;
}) {
  const navigate = useNavigate();

  const handleClick = (id: number | undefined) => {
    if (id) {
      navigate(`/umkm/detail/${id}`);
    }
  };

  if (!data) {
    return <div>No data available.</div>;
  }

  return (
    <div className="search-content">
      {data.length === 0 ? (
        <div className="no-data-message">No results found.</div>
      ) : (
        data.map((item) => (
          <div
            className="item-container"
            key={item.id}
            onClick={() => handleClick(item.id)}
          >
            <img src={item.photoUrl || "/placeholder.png"} alt={item.name} />
            <div className="item-info">
              <h3>{item.name}</h3>
              {type === "umkm" ? (
                <p className="muted">{item.address}</p>
              ) : (
                <p className="muted">{item.description}</p>
              )}
              <div className="rating-row">
                <StarIcon />
                <span className="rating">{item.rating ?? "-"}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
