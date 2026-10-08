import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <div className="header">
        <div className="container">
          <div className="logo">
            <h1>Admin Josepa</h1>
          </div>
          <div className="nav">
            <ul>
              <li>
                <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                  ☰
                </button>
              </li>
              <li><Link to="/">Lihat Toko</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="wrapper">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="content p-6">
            <Outlet />
          </div>
        </div>
      </div>

      <div className="admin-footer">
        <p>© 2026 Admin Josepa — v1.0.0</p>
      </div>
    </div>
  );
}