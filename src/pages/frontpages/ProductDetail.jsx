import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { products } from "../../utils/data";
import { useCart } from "../../utils/CartContext";
import { formatRupiah } from "../../utils/format";
import Stars from "../../components/Stars";

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const p = location.state ?? products.find((item) => item.slug === id);
  const { addToCart } = useCart();

  const [qty, setQty] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [added, setAdded] = useState(false);

  if (!p) {
    return (
      <div className="text-center">
        <p className="mb-4">Produk tidak ditemukan.</p>
        <Link to="/" className="text-brand-blue hover:underline">← Kembali ke katalog</Link>
      </div>
    );
  }

  const soldOut = p.stock === 0;

  const handleAdd = () => {
    addToCart(p, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !review.trim()) return;
    setReviews([...reviews, { id: Date.now(), rating, review }]);
    setRating(0);
    setReview("");
  };

  return (
    <div className="space-y-8">
      <Link to="/" className="text-brand-blue hover:underline text-sm">← Kembali ke katalog</Link>

      <div className="grid md:grid-cols-2 gap-8 bg-white border border-brand-sky rounded-xl p-6 shadow">
        <div className="h-72 md:h-96 bg-brand-mist rounded-lg overflow-hidden">
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.visibility = "hidden")}
          />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs bg-brand-sky/50 px-2 py-0.5 rounded-full w-fit">{p.category_name}</span>
          <h1 className="text-3xl font-bold">{p.name}</h1>
          <Stars value={p.rating} />
          <p className="text-2xl text-brand-blue font-bold">{formatRupiah(p.price)}</p>
          <p className="text-gray-600">{p.description}</p>
          <p className="text-sm">
            Stok:{" "}
            {soldOut ? (
              <span className="text-red-500 font-semibold">Habis</span>
            ) : (
              <span className="font-semibold">{p.stock} pasang</span>
            )}
          </p>

          {!soldOut && (
            <div className="flex items-center gap-3">
              <button
                className="w-8 h-8 border border-brand-sky rounded hover:bg-brand-mist"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                −
              </button>
              <span className="w-8 text-center">{qty}</span>
              <button
                className="w-8 h-8 border border-brand-sky rounded hover:bg-brand-mist"
                onClick={() => setQty(Math.min(p.stock, qty + 1))}
              >
                +
              </button>
            </div>
          )}

          <div className="flex gap-3 mt-2">
            <button
              onClick={handleAdd}
              disabled={soldOut}
              className={`px-5 py-2 rounded-lg text-white transition ${
                soldOut
                  ? "bg-gray-300 cursor-not-allowed"
                  : added
                  ? "bg-green-500"
                  : "bg-brand-blue hover:bg-brand-navy"
              }`}
            >
              {soldOut ? "Stok Habis" : added ? "Ditambahkan ✓" : "Tambah ke Keranjang"}
            </button>

            <button
              onClick={() => setWishlist(!wishlist)}
              className={`px-5 py-2 rounded-lg border transition ${
                wishlist ? "bg-red-50 border-red-400 text-red-500" : "border-brand-sky hover:bg-brand-mist"
              }`}
            >
              {wishlist ? "♥ Difavoritkan" : "♡ Favorit"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <section className="flex-1">
          <h2 className="text-xl font-semibold mb-3">Ulasan Pembeli</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">Belum ada ulasan.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((r) => (
                <li key={r.id} className="border border-brand-sky rounded-lg p-4 bg-white shadow-sm">
                  <Stars value={r.rating} />
                  <p className="text-gray-700 mt-1">{r.review}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="md:w-80 bg-white border border-brand-sky rounded-xl p-4 shadow h-fit">
          <h2 className="text-xl font-semibold mb-3">Tulis Ulasan</h2>
          <form onSubmit={handleSubmit}>
            <label className="block font-medium mb-2">Penilaian:</label>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                >
                  ★
                </button>
              ))}
            </div>

            <label className="block font-medium mb-2">Ulasan:</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full border border-brand-sky rounded-lg p-3 mb-4"
              rows="3"
              placeholder="Tulis pengalamanmu..."
            />

            <button
              type="submit"
              className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-navy"
            >
              Kirim
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}