import "./logo.css";
import logo from "../assets/bersamaUMKMLogo.png";

interface LogoProps {
  width: number;
  height: number;
}

const Logo: React.FC<LogoProps> = ({ width = 10, height = 10 }) => {
  return (
    <div className="logo-container">
      <img
        src={logo}
        style={{
          width: `${width}vh`,
          height: `${height}vh`,
        }}
      ></img>
    </div>
  );
};

export default Logo;
