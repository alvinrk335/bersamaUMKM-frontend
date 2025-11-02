import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Umkm } from "../../models/Umkm";
import { useLoading } from "../../contexts/LoadingContext";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import "./HomeV2.css";

interface StatsCard {
  title: string;
  value: number;
  icon: string;
  color: string;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
}

function HomeV2() {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
  const [loading, setLoading] = useState(true);
  const { setIsLoading } = useLoading();
  const [umkmData, setUmkmData] = useState<Umkm[]>([]);
  const [stats, setStats] = useState<StatsCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setIsLoading(true);
      
      try {
        const response = await fetch(`${backendUrl}/umkm/get/all`);
        const data = await response.json();

        if (response.status === 200) {
          const umkmList = data.map((item: any) => Umkm.fromJSON(item));
          setUmkmData(umkmList);
          
          // Calculate stats
          const totalUmkm = umkmList.length;
          const foodCount = umkmList.filter((item: Umkm) => item.type === "Food").length;
          const drinkCount = umkmList.filter((item: Umkm) => item.type === "Drink").length;
          const serviceCount = umkmList.filter((item: Umkm) => item.type === "Service").length;
          
          setStats([
            {
              title: "Total UMKM",
              value: totalUmkm,
              icon: "fas fa-store",
              color: "#3498db",
              trend: { value: 12, direction: "up" }
            },
            {
              title: "Food & Beverage",
              value: foodCount + drinkCount,
              icon: "fas fa-utensils",
              color: "#e74c3c",
              trend: { value: 8, direction: "up" }
            },
            {
              title: "Services",
              value: serviceCount,
              icon: "fas fa-concierge-bell",
              color: "#f39c12",
              trend: { value: 5, direction: "down" }
            },
            {
              title: "Active Today",
              value: Math.floor(totalUmkm * 0.7),
              icon: "fas fa-chart-line",
              color: "#27ae60",
              trend: { value: 15, direction: "up" }
            }
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch UMKM data:", error);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [backendUrl, setIsLoading]);

  const handleUmkmClick = (id: number) => {
    navigate(`/umkm/detail/${id}`);
  };

  if (loading) {
    return (
      <DashboardLayout title="Dashboard" subtitle="Welcome back">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back">
      <div className="dashboard-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                <i className={stat.icon}></i>
              </div>
              <div className="stat-info">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-title">{stat.title}</div>
                {stat.trend && (
                  <div className={`stat-trend ${stat.trend.direction}`}>
                    <i className={`fas fa-arrow-${stat.trend.direction}`}></i>
                    <span>{stat.trend.value}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* UMKM Table */}
        <div className="table-section">
          <div className="table-header">
            <h2>UMKM Listings</h2>
            <div className="table-actions">
              <button className="btn btn-secondary">
                <i className="fas fa-filter"></i>
                Filter
              </button>
              <button className="btn btn-primary">
                <i className="fas fa-plus"></i>
                Add UMKM
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {umkmData.slice(0, 10).map((umkm, index) => (
                  <tr key={umkm.id} onClick={() => handleUmkmClick(umkm.id!)}>
                    <td>
                      <span className="table-id">{index + 1}</span>
                    </td>
                    <td>
                      <div className="name-cell">
                        <div className="umkm-avatar">
                          <img src={umkm.photoUrl || "/placeholder.png"} alt={umkm.name} />
                        </div>
                        <div className="name-info">
                          <div className="umkm-name">{umkm.name}</div>
                          <div className="umkm-description">{umkm.description?.substring(0, 50)}...</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`type-badge ${umkm.type.toLowerCase()}`}>
                        {umkm.type}
                      </span>
                    </td>
                    <td>
                      <div className="location-cell">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{umkm.address?.substring(0, 30)}...</span>
                      </div>
                    </td>
                    <td>
                      <div className="rating-cell">
                        <i className="fas fa-star"></i>
                        <span>{umkm.rating || "N/A"}</span>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge active">Active</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn view" title="View">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="action-btn edit" title="Edit">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="action-btn delete" title="Delete">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="table-info">
              Showing {Math.min(10, umkmData.length)} of {umkmData.length} entries
            </div>
            <div className="pagination">
              <button className="page-btn" disabled>Previous</button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn">Next</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default HomeV2;