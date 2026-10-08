import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { categories } from "../utils/data";

export default function MainLayout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value === "" || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    navigate({ pathname: "/dashboard", search: params.toString() }, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="filterbar">
        <div className="wrap">
          <div className="relative w-full md:w-1/2">
            <svg
              className="ikon absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Cari sepatu kets, lari, formal, bot..."
              value={q}
              onChange={(e) => updateFilter("q", e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-sm border border-brand-sky/70 outline-none focus:ring-2 focus:ring-brand-blue/40"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
              <svg className="ikon text-brand-blue" viewBox="0 0 24 24">
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
              Kategori:
            </span>
            <select
              value={category}
              onChange={(e) => updateFilter("category", e.target.value)}
              className="w-full md:w-auto px-4 py-3 rounded-xl bg-white text-sm font-semibold border border-brand-sky/70 outline-none focus:ring-2 focus:ring-brand-blue/40"
            >
              <option value="all">Semua Kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="wrap flex-1">
        <div className="blog">
          <div className="conteudo">
            <Outlet />
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="wrap">
          <p>© 2026 Josepa | Jonathan Valerio Simatupang | Versi 1.0</p>
        </div>
      </footer>
    </div>
  );
}