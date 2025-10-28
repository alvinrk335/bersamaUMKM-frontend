import L from "leaflet";
import personIcon from "/icon_person-removebg-preview.png";
import "./PersonIcon.css";

const iconPerson = new L.Icon({
  iconUrl: personIcon,
  iconRetinaUrl: personIcon,
  iconSize: new L.Point(50, 50),
  className: "person-icon",
});

export default iconPerson;
