import type { ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./DashboardLayout.css";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <div className="main-content">
        <Header title={title} subtitle={subtitle} />
        
        <main className="content-area">
          <div className="content-container">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}