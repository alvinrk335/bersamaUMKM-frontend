import { Link, useNavigate } from "react-router-dom";
import "./umkmcarousel.css";
import UmkmPreview from "./umkmpreview";
import { useEffect, useRef, useState } from "react";
import { Umkm } from "../models/Umkm";

function UmkmCarousel({ data, title }: { data: Umkm[]; title?: string }) {
  const [umkmData, setUmkmData] = useState<Umkm[]>(data);
  const [noData, setNoData] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const type = data.length > 0 ? data[0].type : "UMKM";
  const navigate = useNavigate();

  useEffect(() => {
    if (data.length === 0) {
      setNoData(true);
    } else {
      setNoData(false);
    }
    setUmkmData(data);
  }, [data]);

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
      }, 7000);

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

  const handleUmkmClick = (umkm: Umkm | undefined) => {
    navigate(`/umkm/detail/${umkm?.id}`);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <div className="umkm-type-name">{title}</div>
        <div className="see-more-container">
          <Link to={`/umkm/${type}`} className="see-more-link">
            see more
          </Link>
        </div>
      </div>
      <div className="carousel-wrapper">
        {!noData && (
          <span
            className="arrow-button"
            onClick={() => handleArrowButtonClick("left")}
          >
            <button> &#8249;</button>
          </span>
        )}

        <div className="carousel-content" ref={carouselRef}>
          {noData ? (
            <div className="no-data-message">No UMKM data available</div>
          ) : (
            umkmData.map((item) => (
              <UmkmPreview data={item} onClick={handleUmkmClick} />
            ))
          )}
        </div>

        {!noData && (
          <span
            className="arrow-button"
            onClick={() => handleArrowButtonClick("right")}
          >
            <button> &#8250; </button>
          </span>
        )}
      </div>
    </div>
  );
}

export default UmkmCarousel;
