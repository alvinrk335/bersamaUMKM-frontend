import "./home.css";
import UmkmCarousel from "../../components/umkmcarousel";

function Home() {
  return (
    <div className="home-body">
      <UmkmCarousel type="Food" />
      <UmkmCarousel type="Drinks" />
      <UmkmCarousel type="Service" />
    </div>
  );
}

export default Home;
