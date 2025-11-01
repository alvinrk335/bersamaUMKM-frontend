import "./Footer.css";
import Logo from "../logo";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-top-section-navigation">
            <a href="/home">BLOG</a>
            <a href="/home">EXPLORE</a>
            <a href="/home">KNOW MORE</a>
            <a href="/home">CONTACT</a>
          </div>

          <div className="footer-top-section-app-download"></div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-section-logo">
            <Logo width={35} height={10} />
          </div>
          <div className="footer-bottom-section-social-media">
            <a href="#">📸</a>
            <a href="#">💼</a>
            <a href="#">📘</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
