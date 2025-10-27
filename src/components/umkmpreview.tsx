import "./umkmpreview.css";

function UmkmPreview({
  image,
  name,
  location,
}: {
  image?: string;
  name?: string;
  location?: string;
}) {
  return (
    <div className="umkm-preview-card">
      <div className="umkm-preview-image-container">
        <img
          src={image ? image : "https://via.placeholder.com/150"}
          className="umkm-preview-image"
        />
      </div>
      <div className="umkm-preview-info-container">
        <div className="umkm-preview-name">{name ? name : "UMKM Name"}</div>
        <span className="umkm-preview-location">
          {location ? location : "Location"}
        </span>
      </div>
    </div>
  );
}

export default UmkmPreview;
