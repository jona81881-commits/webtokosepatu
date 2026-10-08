import { products } from "../../utils/data";
import { formatRupiah } from "../../utils/format";

export default function AdminDashboard() {
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const soldOut = products.filter((p) => p.stock === 0).length;

  const stats = [
    { label: "Jumlah Produk", value: products.length },
    { label: "Total Stok", value: totalStock },
    { label: "Stok Menipis", value: lowStock },
    { label: "Stok Habis", value: soldOut },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dasbor</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold text-brand-blue">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-navy text-white">
            <tr>
              <th className="p-3">Produk</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Stok</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.category_name}</td>
                <td className="p-3">{formatRupiah(p.price)}</td>
                <td className="p-3">
                  {p.stock === 0 ? (
                    <span className="text-red-500 font-semibold">Habis</span>
                  ) : p.stock <= 5 ? (
                    <span className="text-orange-500 font-semibold">{p.stock} (menipis)</span>
                  ) : (
                    p.stock
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}