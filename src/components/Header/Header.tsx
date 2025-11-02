import { useState } from "react";
import "./Header.css";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-title-section">
          <h1 className="header-title">{title}</h1>
          {subtitle && <span className="header-subtitle">{subtitle}</span>}
        </div>
      </div>

      <div className="header-right">
        <div className="header-search">
          <i className="fas fa-search search-icon"></i>
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input"
          />
        </div>

        <div className="header-actions">
          <button className="header-action-btn">
            <i className="fas fa-bell"></i>
            <span className="badge">3</span>
          </button>

          <div className="user-menu-container">
            <button 
              className="user-menu-trigger"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="user-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="user-info">
                <span className="user-name">Admin User</span>
                <span className="user-role">Administrator</span>
              </div>
              <i className="fas fa-chevron-down"></i>
            </button>

            {showUserMenu && (
              <div className="user-dropdown">
                <div className="dropdown-item">
                  <i className="fas fa-user"></i>
                  <span>Profile</span>
                </div>
                <div className="dropdown-item">
                  <i className="fas fa-cog"></i>
                  <span>Settings</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item">
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}