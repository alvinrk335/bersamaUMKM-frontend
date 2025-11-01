import type { Umkm } from "../models/Umkm";
import "./umkmpreview.css";

function UmkmPreview({
  data,
  onClick,
}: {
  data?: Umkm;
  onClick?: (umkm: Umkm | undefined) => void;
}) {
  return (
    <div
      className="umkm-preview-card"
      onClick={() => {
        console.log("Clicked data:", data);
        onClick?.(data);
      }}
    >
      <div className="umkm-preview-image-container">
        <img
          src={
            data?.photoUrl ? data.photoUrl : "https://via.placeholder.com/150"
          }
          className="umkm-preview-image"
        />
      </div>
      <div className="umkm-preview-info-container">
        <div className="umkm-preview-name">
          {data?.name ? data.name : "UMKM Name"}
        </div>
        <span className="umkm-preview-location">
          {data?.address ? data.address : "Location"}
        </span>
      </div>
    </div>
  );
}

export default UmkmPreview;
