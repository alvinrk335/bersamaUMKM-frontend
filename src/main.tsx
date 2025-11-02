import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "leaflet/dist/leaflet.css";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/footer/Footer.tsx";
import Navbar from "./components/navbar.tsx";
import { useLocation } from "react-router-dom";
import { LoadingProvider, useLoading } from "./contexts/LoadingContext.tsx";

const AppWrapper = () => {
  const location = useLocation();
  const { isLoading } = useLoading();
  const hideNavbarOn = ["/umkm/detail"];
  const shouldHideNavbar = hideNavbarOn.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideNavbar && !isLoading && <Navbar />}
      <App />
      {!isLoading && <Footer />}
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <AppWrapper />
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
);
