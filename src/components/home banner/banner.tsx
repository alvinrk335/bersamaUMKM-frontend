import "./banner.css";

function Banner() {
  return (
    <div className="banner-container">
      <div className="banner-wrapper">
        <div className="banner food-banner">
          <h2>Explore a World of Flavors!</h2>
          <button>Explore</button>
        </div>
        <div className="banner drink-banner">
          <h2>Sip Something Special!</h2>
          <button>Explore</button>
        </div>
        <div className="banner service-banner">
          <h2>Need Help On Day To Day Activities?</h2>
          <button>Explore</button>
        </div>
      </div>

      <div className="banner-dot">
        <div className="dot active-dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}

export default Banner;
