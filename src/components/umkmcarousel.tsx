import { Link } from "react-router-dom";
import "./umkmcarousel.css";
import UmkmPreview from "./umkmpreview";
import { useEffect, useState } from "react";
import { Umkm } from "../models/umkmModel";

function UmkmCarousel({ type }: { type: string }) {
  const [umkmData, setUmkmData] = useState<Umkm[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/umkm/get/${type}`);
      const data = await response.json();
      const umkmList: Umkm[] = [];

      data.map((item: any) => {
        const umkm = Umkm.fromJSON(item);
        umkmList.push(umkm);
      });

      setUmkmData(umkmList);
    };
    fetchData();
  }, [type]);

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <div className="umkm-type-name">{type}</div>
        <div className="see-more-container">
          <Link to={`/umkm/${type}`} className="see-more-link">
            see more
          </Link>
        </div>
      </div>
      <div className="carousel-content">
        {umkmData.map((umkmData) => (
          <UmkmPreview image={umkmData.photoUrl} name={umkmData.name} />
        ))}
      </div>
    </div>
  );
}

export default UmkmCarousel;
