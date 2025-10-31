import { useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar.tsx";
import routes from "./routes/route.tsx";

function App() {
  const navigate = useNavigate();
  const elements = useRoutes(routes);
  //unused
  const location = useLocation();

  useEffect(() => {
    navigate("/home");
  }, []);

  //unused
  const hideNavbarOn = ["/umkm/detail"];
  const shouldHideNavbar = hideNavbarOn.some((path) =>
    location.pathname.startsWith(path)
  );
  return <div className="App">{elements}</div>;
}

export default App;
