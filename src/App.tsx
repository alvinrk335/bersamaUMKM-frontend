import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar.tsx";
import Home from "./page/home/home.tsx";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, []);

  return (
    <body>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/umkm/${type}" element="#" />
      </Routes>
    </body>
  );
}

export default App;
