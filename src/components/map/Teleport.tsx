import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function Teleport({
  lat,
  lng,
  zoom = 15,
  active,
}: {
  lat: number;
  lng: number;
  zoom?: number;
  active: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    if (lat && lng && active) {
      map.flyTo([lat, lng], zoom, {
        duration: 1.5,
      });
    }
  }, [lat, lng, map, zoom, active]);

  return null;
}
