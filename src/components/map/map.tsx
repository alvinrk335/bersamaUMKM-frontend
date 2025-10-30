import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { Umkm } from "../../models/umkmModel";
import { useEffect, useState } from "react";
import "./map.css";
import UmkmPreview from "../umkmpreview";
import Teleport from "./Teleport";
import iconPerson from "./PersonIconForMarker";

export default function UmkmMap({ data }: { data: Umkm[] }) {
  const [currLocation, setCurrLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [isTeleporting, setIsTeleporting] = useState(false);
  //ambil lokasi user
  useEffect(() => {
    return;
  }, [currLocation]);

  function handleMyLocation() {
    if (!currLocation) {
      alert("Get your location first!");
      return;
    }

    setIsTeleporting(true);
    setTimeout(() => {
      setIsTeleporting(false);
    }, 1000);
  }

  function handleGetLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }

  return (
    <div className="map-container">
      <h1>UMKM near you</h1>
      {currLocation ? (
        <MapContainer
          center={[currLocation?.lat || 0, currLocation?.lng || 0]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {currLocation && (
            <Teleport
              lat={currLocation.lat}
              lng={currLocation.lng}
              active={isTeleporting}
            />
          )}

          {/* my location */}
          {currLocation && (
            <Marker
              position={[currLocation.lat, currLocation.lng]}
              icon={iconPerson}
            >
              <Popup>Your current location</Popup>
            </Marker>
          )}
          {data.map((umkm, index) => (
            <Marker key={index} position={[umkm.latitude, umkm.longitude]}>
              <Popup>
                <UmkmPreview data={umkm} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div className="map-placeholder">
          <div className="map-helper">
            {!currLocation ? (
              <button onClick={handleGetLocation}>Get my location</button>
            ) : (
              <button onClick={handleMyLocation}>Go to my location</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
