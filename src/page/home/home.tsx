import "./home.css";
import UmkmCarousel from "../../components/umkmcarousel";
import { useEffect, useState } from "react";
import { Umkm } from "../../models/umkmModel";
import DotLoading from "../../components/DotLoading/DotLoading";
import UmkmMap from "../../components/map/map";

function Home() {
  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
  const [loading, setLoading] = useState(true);
  const [umkmData, setUmkmData] = useState<Umkm[]>([]);
  const [foodData, setFoodData] = useState<Umkm[]>([]);
  const [drinkData, setDrinkData] = useState<Umkm[]>([]);
  const [serviceData, setServiceData] = useState<Umkm[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`${backendUrl}/umkm/get/all`);
      const data = await response.json();

      if (response.status === 200) {
        console.log(data);
        const umkmList = data.map((item: any) => Umkm.fromJSON(item));
        setUmkmData(umkmList);
      } else {
        console.error("Failed to fetch UMKM data");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (umkmData.length > 0) {
      setFoodData(umkmData.filter((item) => item.type === "Food"));
      setDrinkData(umkmData.filter((item) => item.type === "Drinks"));
      setServiceData(umkmData.filter((item) => item.type === "Service"));
    }
  }, [umkmData]);

  if (loading) {
    return (
      <div className="loading-gif">
        <DotLoading />
      </div>
    );
  }
  return (
    <div className="home-body">
      <UmkmCarousel data={foodData} />
      <UmkmCarousel data={drinkData} />
      <UmkmCarousel data={serviceData} />
      <UmkmMap data={umkmData} />
    </div>
  );
}

export default Home;
