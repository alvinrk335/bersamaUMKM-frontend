import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

interface SidebarItem {
  id: string;
  title: string;
  icon: string;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  { id: "dashboard", title: "Dashboard", icon: "fas fa-chart-bar", path: "/home" },
  { id: "umkm", title: "UMKM", icon: "fas fa-store", path: "/umkm" },
  { id: "products", title: "Products", icon: "fas fa-box", path: "/products" },
  { id: "map", title: "Map", icon: "fas fa-map", path: "/map" },
  { id: "search", title: "Search", icon: "fas fa-search", path: "/search" },
  { id: "categories", title: "Categories", icon: "fas fa-tags", path: "/categories" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <i className="fas fa-building"></i>
          {!isCollapsed && <span className="brand-text">UMKM Platform</span>}
        </div>
        <button 
          className="sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {sidebarItems.map((item) => (
            <li 
              key={item.id}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleItemClick(item.path)}
            >
              <div className="sidebar-link">
                <i className={item.icon}></i>
                {!isCollapsed && <span className="sidebar-text">{item.title}</span>}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-item">
          <div className="sidebar-link">
            <i className="fas fa-cog"></i>
            {!isCollapsed && <span className="sidebar-text">Settings</span>}
          </div>
        </div>
      </div>
    </div>
  );
}