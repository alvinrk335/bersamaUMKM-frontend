import type { Umkm } from "../models/umkmModel";
import "./umkmpreview.css";

function UmkmPreview({ data }: { data?: Umkm }) {
  return (
    <div className="umkm-preview-card">
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
