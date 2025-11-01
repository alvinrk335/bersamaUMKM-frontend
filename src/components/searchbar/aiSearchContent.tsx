import { useNavigate } from "react-router-dom";
import type { Umkm } from "../../models/umkmModel";
import StarIcon from "../Icon/StarIcon";

export default function AiSearchContent({
  data,
  dataType,
}: {
  data?: Umkm[];
  dataType?: "umkm" | "product";
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

  const getAiIntroText = () => {
    if (data.length === 0) {
      return "Maaf, saya tidak menemukan hasil yang sesuai dengan permintaan Anda.";
    }

    const resultType = dataType === "product" ? "produk" : "UMKM";
    const count = data.length;

    if (count === 1) {
      return `Saya menemukan 1 ${resultType} yang sesuai dengan pencarian Anda:`;
    } else if (count <= 3) {
      return `Berikut ${count} ${resultType} terbaik yang saya rekomendasikan:`;
    } else {
      return `Saya menemukan ${count} ${resultType} yang sesuai. Berikut beberapa rekomendasi terbaik:`;
    }
  };

  const getItemSubtitle = (item: any) => {
    const distance = (item as any).distance
      ? ` (${(item as any).distance.toFixed(1)} km)`
      : "";
    const rating = item.rating ? ` • Rating ${item.rating}` : "";

    if (dataType === "product") {
      return `${(item as any).umkm_name || ""}${distance}${rating}`;
    } else {
      return `${item.address || ""}${distance}${rating}`;
    }
  };

  return (
    <div className="search-content-ai">
      <div className="ai-intro">
        <div className="ai-response-text">{getAiIntroText()}</div>
      </div>

      {data.length > 0 && (
        <div className="ai-results">
          {data.slice(0, 5).map((item) => (
            <div
              className="ai-item-container"
              key={item.id}
              onClick={() => handleClick(item.id)}
            >
              <img src={item.photoUrl || "/placeholder.png"} alt={item.name} />
              <div className="ai-item-info">
                <h3>{item.name}</h3>
                <p className="ai-item-subtitle">{getItemSubtitle(item)}</p>
                {dataType === "product" && (item as any).price && (
                  <p className="ai-item-price">
                    Rp {(item as any).price.toLocaleString()}
                  </p>
                )}
                {dataType === "umkm" && item.description && (
                  <p className="ai-item-description">{item.description}</p>
                )}
                <div className="ai-rating-row">
                  <StarIcon />
                  <span className="rating">{item.rating ?? "-"}</span>
                </div>
              </div>
            </div>
          ))}

          {/* {data.length > 5 && (
            <div className="ai-more-results">
              <p>Dan {data.length - 5} hasil lainnya...</p>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
}
