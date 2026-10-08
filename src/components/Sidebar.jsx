import { Link } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
      <ul onClick={() => setSidebarOpen(false)}>
        <li><Link to="/admin/dashboard">Dasbor</Link></li>
        <li><Link to="/admin/about">Tentang</Link></li>
        <li><Link to="/">← Kembali ke Toko</Link></li>
      </ul>
    </div>
  );
}