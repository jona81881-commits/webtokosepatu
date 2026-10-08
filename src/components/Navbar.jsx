import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../utils/CartContext";

const IkonBeranda = () => (
  <svg className="ikon" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const IkonKeranjang = () => (
  <svg className="ikon" viewBox="0 0 24 24">
    <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6" />
    <circle cx="9" cy="20" r="1" />
    <circle cx="17" cy="20" r="1" />
  </svg>
);

const IkonPembayaran = () => (
  <svg className="ikon" viewBox="0 0 24 24">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </svg>
);

const IkonAdmin = () => (
  <svg className="ikon" viewBox="0 0 24 24">
    <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
  </svg>
);

export default function Navbar() {
  const { totalQty } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="wrap">
        <Link to="/dashboard" className="brand">
          <div className="logo">👟</div>
          <div>
            <div className="judul">Josepa</div>
            <div className="deskripsi">TOKO SEPATU</div>
          </div>
        </Link>

        <button className="menu-toggle" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>

        <nav className={`menu ${open ? "open" : ""}`}>
          <ul onClick={() => setOpen(false)}>
            <li>
              <NavLink to="/dashboard"><IkonBeranda />Beranda</NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                <IkonKeranjang />
                Keranjang
                {totalQty > 0 && <span className="badge">{totalQty}</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/checkout"><IkonPembayaran />Pembayaran</NavLink>
            </li>
            <li className="pemisah"></li>
            <li>
              <NavLink to="/admin" className="admin-link"><IkonAdmin />Admin</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}