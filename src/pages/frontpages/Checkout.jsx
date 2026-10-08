import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../utils/CartContext";
import { formatRupiah } from "../../utils/format";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", address: "", payment: "" });
  const [errors, setErrors] = useState({});
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = {};
    if (!form.name.trim()) err.name = "Nama wajib diisi";
    if (form.address.trim().length < 10) err.address = "Alamat minimal 10 karakter";
    if (!form.payment) err.payment = "Pilih metode pembayaran";
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setOrderId("JSP-" + Date.now().toString().slice(-6));
    clearCart();
  };

  if (orderId) {
    return (
      <div className="max-w-md mx-auto text-center bg-white border border-brand-sky rounded-xl p-8 shadow">
        <div className="text-5xl mb-2">✅</div>
        <h1 className="text-2xl font-bold mb-2">Pesanan Berhasil!</h1>
        <p className="text-gray-600">Terima kasih, {form.name}.</p>
        <p className="mt-2">
          Nomor pesanan: <span className="font-semibold">{orderId}</span>
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-5 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-navy"
        >
          Kembali Belanja
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center text-gray-600">
        <p className="mb-4">Tidak ada barang untuk dibayar.</p>
        <Link to="/" className="text-brand-blue hover:underline">Mulai belanja →</Link>
      </div>
    );
  }

  const inputClass = "w-full border border-brand-sky rounded-lg px-3 py-2 bg-white";

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Pembayaran</h1>

      <div className="bg-white border border-brand-sky rounded-lg p-4 mb-6">
        <h2 className="font-semibold mb-2">Ringkasan Pesanan</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm py-1">
            <span>{item.name} × {item.qty}</span>
            <span>{formatRupiah(item.price * item.qty)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold border-t border-brand-sky mt-2 pt-2">
          <span>Total</span>
          <span className="text-brand-blue">{formatRupiah(totalPrice)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nama</label>
          <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Alamat</label>
          <textarea
            name="address"
            rows="3"
            value={form.address}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Pembayaran</label>
          <select name="payment" value={form.payment} onChange={handleChange} className={inputClass}>
            <option value="">-- Pilih metode --</option>
            <option>Transfer Bank</option>
            <option>E-Wallet</option>
            <option>COD (Bayar di Tempat)</option>
          </select>
          {errors.payment && <p className="text-red-500 text-sm mt-1">{errors.payment}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-navy"
        >
          Buat Pesanan
        </button>
      </form>
    </div>
  );
}