import { useParams } from "react-router-dom";
import type { Umkm } from "../../models/umkmModel";
import { useEffect, useState } from "react";
import "./UmkmDetail.css";

export default function UmkmDetail() {
  const { id } = useParams<{ id: string }>();
  const [umkm, setUmkm] = useState<Umkm | undefined>(undefined);

  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

  useEffect(() => {
    console.log("Fetching UMKM detail for ID:", id);
    const fetchData = async () => {
      const response = await fetch(`${backendUrl}/umkm/detail/${id}`);

      if (response.ok) {
        const data = await response.json();
        setUmkm(data);
      } else {
        console.error("Failed to fetch UMKM data");
      }
    };
    fetchData();
  }, [id]);
  return (
    <div className="umkm-detail-container">
      <section className="umkm-info-container">
        <div className="umkm-info">
          <img src={umkm?.photoUrl} alt={umkm?.name} id="umkm-photo" />
          <span className="info-right">
            <h2>{umkm?.name}</h2>
            <p>{umkm?.address}</p>
            <span className="rating">
              <img src="/star-icon.png" alt="" id="star-icon" />
              <span>{umkm?.rating ?? "N/A"}</span>
            </span>
          </span>
        </div>
      </section>

      <section className="product-container">
        
      </section>
    </div>
  );
}
