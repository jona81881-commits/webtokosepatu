import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";
import { formatRupiah } from "../utils/format";
import Stars from "./Stars";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const soldOut = p.stock === 0;
  const lowStock = p.stock > 0 && p.stock <= 8;

  const handleAdd = () => {
    addToCart(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="card-hover fade-in group bg-white rounded-[20px] overflow-hidden flex flex-col border border-brand-sky/40 shadow-[0_8px_28px_rgba(40,53,131,0.08)] hover:shadow-[0_18px_44px_rgba(40,53,131,0.18)]">
      <Link
        to={`/product/${p.slug}`}
        state={p}
        className="relative block aspect-[4/3] bg-gradient-to-br from-brand-mist/70 to-white p-6 overflow-hidden"
      >
        <img
          src={p.img}
          alt={p.name}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
          onError={(e) => (e.currentTarget.style.visibility = "hidden")}
        />
        <span className="absolute top-4 left-4 text-[11px] font-bold tracking-wider uppercase bg-brand-navy text-white px-3.5 py-1.5 rounded-full shadow-md">
          {p.category_name}
        </span>
        {soldOut && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md">
            Stok Habis
          </span>
        )}
        {lowStock && (
          <span className="absolute top-4 right-4 bg-amber-400 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md">
            Stok Tinggal {p.stock}
          </span>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <h2 className="font-bold text-lg text-brand-navy leading-snug">{p.name}</h2>
        <div className="mt-1">
          <Stars value={p.rating} />
        </div>
        <p className="text-brand-blue font-extrabold text-xl mt-2">{formatRupiah(p.price)}</p>

        <div className="mt-auto pt-4 flex gap-2">
          <Link
            to={`/product/${p.slug}`}
            state={p}
            className="px-4 py-2.5 rounded-xl border border-brand-sky text-brand-navy text-sm font-semibold hover:bg-brand-mist transition"
          >
            Detail
          </Link>
          <button
            onClick={handleAdd}
            disabled={soldOut}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition ${
              soldOut
                ? "bg-gray-300 cursor-not-allowed"
                : added
                ? "bg-green-500"
                : "bg-brand-blue hover:bg-brand-navy"
            }`}
          >
            {soldOut ? "Tidak Tersedia" : added ? "Ditambahkan ✓" : "+ Keranjang"}
          </button>
        </div>
      </div>
    </div>
  );
}