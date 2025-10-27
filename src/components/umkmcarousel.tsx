import { Link } from "react-router-dom";
import "./umkmcarousel.css";
import UmkmPreview from "./umkmpreview";
import { useEffect, useRef, useState } from "react";
import { Umkm } from "../models/umkmModel";

function UmkmCarousel({ type }: { type: string }) {
  const [umkmData, setUmkmData] = useState<
    (Umkm & { locationString?: string })[]
  >([]);
  const [noData, setNoData] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${backendUrl}/umkm/get/${type}`);
      const data = await response.json();

      if (response.status === 200) {
        console.log(data);
        const umkmList = data.map((item: any) => Umkm.fromJSON(item));

        const umkmWithLocation = await Promise.all(
          umkmList.map(async (umkm: any) => {
            const locationString = await convertLocation(
              umkm.latitude,
              umkm.longitude
            );
            return { ...umkm, locationString };
          })
        );

        setUmkmData(umkmWithLocation);
      } else {
        console.error("Failed to fetch UMKM data");
        setNoData(true);
        return;
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!autoScroll) return;
    else {
      const interval = setInterval(() => {
        if (carouselRef.current) {
          carouselRef.current.scrollBy({
            left: carouselRef.current.clientWidth,
            behavior: "smooth",
          });

          if (
            carouselRef.current.scrollLeft + carouselRef.current.clientWidth >=
            carouselRef.current.scrollWidth
          ) {
            setTimeout(() => {
              if (carouselRef.current)
                carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
            }, 500);
          }
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [autoScroll]);

  function handleArrowButtonClick(direction: "left" | "right") {
    if (carouselRef.current) {
      setAutoScroll(false);
      const scrollAmount =
        direction === "left"
          ? -carouselRef.current.clientWidth / 2
          : carouselRef.current.clientWidth / 2;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }

    const timeout = setTimeout(() => {
      setAutoScroll(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }

  async function convertLocation(
    latitude: number,
    longitude: number
  ): Promise<string> {
    const response = await fetch(`${backendUrl}/location/from/coordinates`, {
      method: "POST",
      body: JSON.stringify({ latitude, longitude }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.address.road + ", " + data.address.city;
    } else {
      console.error("Failed to convert location");
      return "";
    }
  }
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
      <div className="carousel-wrapper">
        <span
          className="arrow-button"
          onClick={() => handleArrowButtonClick("left")}
        >
          <button> &#8592;</button>
        </span>
        <div className="carousel-content" ref={carouselRef}>
          {noData ? (
            <div className="no-data-message">No UMKM data available</div>
          ) : (
            umkmData.map((umkmData) => (
              <UmkmPreview
                image={umkmData.photoUrl}
                name={umkmData.name}
                location={umkmData.locationString}
              />
            ))
          )}
        </div>
        <span
          className="arrow-button"
          onClick={() => handleArrowButtonClick("left")}
        >
          <button> &#8594;</button>
        </span>
      </div>
    </div>
  );
}

export default UmkmCarousel;
