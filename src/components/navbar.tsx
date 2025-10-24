import "./navbar.css";
import Logo from "./logo";
import Home from "../assets/homeLogo.png";
import About from "../assets/aboutLogo.png";
import SearchBar from "./searchBar";

function Navbar() {
  return (
    <div className="container">
      <nav className="nav-container">
        <div className="nav-content">
          <Logo width={20} height={6} />
          <SearchBar />
          <div className="nav-clickable-container">
            <a href="#" className="nav-home">
              <img src={Home}></img>
            </a>
            <a href="#" className="nav-aboutUs">
              <img src={About}></img>
            </a>
            <button className="nav-login">
              <span>Login</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
