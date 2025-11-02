import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Umkm } from "../../models/Umkm";
import StarIcon from "../Icon/StarIcon";

export default function AiSearchContent({
  data,
  dataType,
}: {
  data?: Umkm[];
  dataType?: "umkm" | "product";
}) {
  const navigate = useNavigate();
  const [umkmNames, setUmkmNames] = useState<{ [key: number]: string }>({});
  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

  const handleClick = (id: number | undefined) => {
    if (id) {
      navigate(`/umkm/detail/${id}`);
    }
  };

  // Fetch umkm names for products
  useEffect(() => {
    console.log("🔍 AI Search Debug - useEffect triggered:", {
      dataType,
      dataExists: !!data,
      dataLength: data?.length,
      backendUrl,
    });

    if (dataType === "product" && data && data.length > 0) {
      console.log(
        "📦 Fetching UMKM names for products:",
        data.map((item) => ({ id: item.id, name: item.name }))
      );

      const fetchUmkmNames = async () => {
        const names: { [key: number]: string } = {};

        for (const item of data) {
          console.log("🎯 Processing product:", {
            id: item.id,
            name: item.name,
          });

          if (item.id) {
            try {
              const url = `${backendUrl}/product/get/umkmName/${item.id}`;
              console.log("🌐 Fetching from URL:", url);

              const response = await fetch(url);
              console.log("📡 Response status:", response.status, response.ok);

              if (response.ok) {
                const result = await response.text();
                console.log("✅ UMKM name received:", {
                  productId: item.id,
                  umkmName: result,
                });
                names[item.id] = result;
              } else {
                console.warn(
                  "❌ API response not OK:",
                  response.status,
                  response.statusText
                );
              }
            } catch (error) {
              console.error(
                "🚫 Error fetching UMKM name for product",
                item.id,
                ":",
                error
              );
            }
          } else {
            console.warn("⚠️ Product missing ID:", item);
          }
        }

        console.log("💾 Setting UMKM names state:", names);
        setUmkmNames(names);
      };

      fetchUmkmNames();
    }
  }, [data, dataType, backendUrl]);

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
      return `${distance}${rating}`;
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
          {data.slice(0, 5).map((item) => {
            console.log("🖼️ Rendering item:", {
              id: item.id,
              name: item.name,
              dataType,
              price: (item as any).price,
              umkmNameExists: !!umkmNames[item.id!],
              umkmName: umkmNames[item.id!],
              umkmNamesState: umkmNames,
            });

            return (
              <div
                className="ai-item-container"
                key={item.id}
                onClick={() => handleClick(item.id)}
              >
                <img src={item.photoUrl || ""} alt={item.name} />
                <div className="ai-item-info">
                  <h3>{item.name}</h3>
                  {dataType === "product" && item.id && umkmNames[item.id] && (
                    <p className="ai-item-umkm-name">{umkmNames[item.id]}</p>
                  )}
                  <p className="ai-item-subtitle">{getItemSubtitle(item)}</p>
                  {dataType === "product" && (
                    <p className="ai-item-price">
                      Rp {((item as any).price || 0).toLocaleString()}
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
            );
          })}

          {data.length > 5 && (
            <div className="ai-more-results">
              <p>Dan {data.length - 5} hasil lainnya...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
