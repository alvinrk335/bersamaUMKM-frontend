import { useParams } from "react-router-dom";
import type { Umkm } from "../../models/umkmModel";
import { useEffect, useState } from "react";
import "./UmkmDetail.css";

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // km

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // km
}

export default function UmkmDetail() {
  const { id } = useParams<{ id: string }>();
  const [umkm, setUmkm] = useState<Umkm | undefined>(undefined);
  const [distance, setDistance] = useState<string>("");

  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${backendUrl}/umkm/detail/${id}`);
      if (response.ok) {
        const data = await response.json();
        setUmkm(data);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!umkm?.latitude || !umkm?.longitude) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLon = pos.coords.longitude;

        const d = haversineDistance(
          userLat,
          userLon,
          umkm.latitude,
          umkm.longitude
        );

        setDistance(`${d.toFixed(2)} km`);
      },
      () => {
        console.warn("Location permission denied");
        setDistance("");
      }
    );
  }, [umkm]);

  return (
    <div className="umkm-detail-container">
      <div className="background-picture">
        <img src={umkm?.photoUrl} alt={umkm?.name} id="background-photo" />
      </div>

      <section className="umkm-info-container">
        <div className="umkm-info">
          <img src={umkm?.photoUrl} alt={umkm?.name} id="umkm-photo" />
          <span className="info-right">
            <h2>{umkm?.name}</h2>

            <div className="address">
              <div className="address-marquee">
                <span>{umkm?.address}</span>
              </div>
            </div>

            <span className="rating">
              <img
                src="/star-icon-removebg-preview.png"
                alt=""
                id="star-icon"
              />
              <span className="umkm-rating">{umkm?.rating ?? "N/A"}</span>
              <span className="dot">&bull;</span>
              <span className="distance">{distance}</span>
            </span>
          </span>
        </div>
      </section>

      <section className="product-container"></section>
    </div>
  );
}
