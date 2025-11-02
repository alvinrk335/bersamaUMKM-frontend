import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Umkm } from "../../models/Umkm";
import Product from "../../models/Product";
import { useLoading } from "../../contexts/LoadingContext";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import "./UmkmDetailV2.css";

function UmkmDetailV2() {
  const { id } = useParams();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
  const [loading, setLoading] = useState(true);
  const { setIsLoading } = useLoading();
  const [umkm, setUmkm] = useState<Umkm | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      setLoading(true);
      setIsLoading(true);

      try {
        // Fetch UMKM details
        const umkmResponse = await fetch(`${backendUrl}/umkm/get/${id}`);
        const umkmData = await umkmResponse.json();

        if (umkmResponse.status === 200) {
          setUmkm(Umkm.fromJSON(umkmData));
        }

        // Fetch products for this UMKM
        const productsResponse = await fetch(`${backendUrl}/product/get/umkm/${id}`);
        const productsData = await productsResponse.json();

        if (productsResponse.status === 200) {
          const productList = productsData.map((item: any) => Product.fromJson(item));
          setProducts(productList);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, backendUrl, setIsLoading]);

  const handleBackClick = () => {
    navigate("/home");
  };

  if (loading) {
    return (
      <DashboardLayout title="UMKM Detail" subtitle="Loading information">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading UMKM details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!umkm) {
    return (
      <DashboardLayout title="UMKM Detail" subtitle="Not found">
        <div className="error-state">
          <i className="fas fa-exclamation-triangle"></i>
          <h3>UMKM not found</h3>
          <p>The requested UMKM could not be found.</p>
          <button className="btn btn-primary" onClick={handleBackClick}>
            <i className="fas fa-arrow-left"></i>
            Back to Home
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={umkm.name} subtitle="UMKM Details">
      <div className="umkm-detail-content">
        {/* Back Button */}
        <div className="detail-header">
          <button className="back-btn" onClick={handleBackClick}>
            <i className="fas fa-arrow-left"></i>
            Back to Home
          </button>
          <div className="detail-actions">
            <button className="btn btn-secondary">
              <i className="fas fa-edit"></i>
              Edit UMKM
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-share"></i>
              Share
            </button>
          </div>
        </div>

        {/* UMKM Info Cards */}
        <div className="info-grid">
          {/* Main Info Card */}
          <div className="info-card main-info">
            <div className="umkm-header">
              <div className="umkm-image">
                <img src={umkm.photoUrl || "/placeholder.png"} alt={umkm.name} />
              </div>
              <div className="umkm-info">
                <h1>{umkm.name}</h1>
                <div className="umkm-meta">
                  <span className={`type-badge ${umkm.type.toLowerCase()}`}>
                    {umkm.type}
                  </span>
                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <span>{umkm.rating || "No rating"}</span>
                  </div>
                </div>
                <p className="description">{umkm.description}</p>
              </div>
            </div>
          </div>

          {/* Contact Info Card */}
          <div className="info-card contact-info">
            <h3>
              <i className="fas fa-address-book"></i>
              Contact Information
            </h3>
            <div className="contact-details">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <label>Address</label>
                  <span>{umkm.address || "No address provided"}</span>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-user"></i>
                <div>
                  <label>User ID</label>
                  <span>{umkm.userId}</span>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-map"></i>
                <div>
                  <label>Coordinates</label>
                  <span>{umkm.latitude}, {umkm.longitude}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="products-section">
          <div className="section-header">
            <h2>
              <i className="fas fa-box"></i>
              Products & Services
            </h2>
            <button className="btn btn-primary">
              <i className="fas fa-plus"></i>
              Add Product
            </button>
          </div>

          {products.length > 0 ? (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.photoUrl || "/placeholder.png"} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price">
                      Rp {product.price?.toLocaleString("id-ID") || "N/A"}
                    </div>
                    <div className="product-actions">
                      <button className="action-btn edit">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="action-btn delete">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fas fa-box-open"></i>
              <h3>No products yet</h3>
              <p>This UMKM hasn't added any products or services yet.</p>
              <button className="btn btn-primary">
                <i className="fas fa-plus"></i>
                Add First Product
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default UmkmDetailV2;