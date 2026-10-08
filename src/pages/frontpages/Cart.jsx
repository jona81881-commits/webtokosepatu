import { Link } from "react-router-dom";
import { useCart } from "../../utils/CartContext";
import { formatRupiah } from "../../utils/format";

export default function Cart() {
  const { cart, updateQty, removeFromCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        <p className="mb-4">Keranjang masih kosong.</p>
        <Link to="/" className="text-brand-blue hover:underline">Mulai belanja →</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Keranjang Belanja</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-brand-sky p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-brand-mist rounded-md overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                />
              </div>
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-600">{formatRupiah(item.price)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                value={item.qty}
                min="1"
                max={item.stock}
                className="w-16 border border-brand-sky rounded text-center"
                onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
              />
              <p className="w-28 text-right font-semibold">{formatRupiah(item.price * item.qty)}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3 bg-white border border-brand-sky p-4 rounded-lg">
        <p className="text-lg">
          Total: <span className="font-bold text-brand-blue">{formatRupiah(totalPrice)}</span>
        </p>
        <Link
          to="/checkout"
          className="px-5 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-navy"
        >
          Lanjut ke Pembayaran
        </Link>
      </div>
    </div>
  );
}