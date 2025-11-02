import { useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import "./App.css";

import routes from "./routes/route.tsx";

function App() {
  const navigate = useNavigate();
  const elements = useRoutes(routes);

  useEffect(() => {
    navigate("/home");
  }, []);

  //unused
  const location = useLocation();

  //unused
  const hideNavbarOn = ["/umkm/detail"];
  hideNavbarOn.some((path) => location.pathname.startsWith(path));
  return <div className="App">{elements}</div>;
}

export default App;
