import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { products, categories, heroImage } from "../../utils/data";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";

  const filtered = products.filter((p) => {
   const matchName = `${p.name} ${p.category_name}`.toLowerCase().includes(q.toLowerCase());
    const matchCat = category === "all" || p.category === Number(category);
    return matchName && matchCat;
  });

  const activeCategory = categories.find((c) => c.id === Number(category));

  return (
    <div>
      <section
        className="rounded-3xl text-white mb-10 min-h-[200px] flex flex-col justify-center px-6 md:px-10 py-7 bg-cover bg-center shadow-[0_18px_40px_rgba(40,53,131,0.22)]"
        style={{
          backgroundImage: `linear-gradient(100deg, rgba(40,53,131,.96) 0%, rgba(40,53,131,.82) 45%, rgba(68,118,219,.55) 100%), url(${heroImage})`,
        }}
      >
        <span className="w-fit flex items-center gap-2 text-xs font-semibold bg-white/10 border border-white/25 px-3.5 py-1.5 rounded-full mb-3">
          <svg className="ikon" viewBox="0 0 24 24">
            <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
          </svg>
          Koleksi Sepatu 2026
        </span>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight max-w-3xl">
          Langkah Terbaikmu Dimulai di Sini.
        </h1>
        <p className="mt-2 text-white/85 text-sm md:text-base max-w-xl">
          Koleksi sepatu kets, lari, formal, kasual, dan bot dengan harga bersahabat. Klik detail untuk
          informasi lengkap atau langsung tambahkan ke keranjang belanja.
        </p>
      </section>

      <div id="katalog" className="mb-6 pb-4 border-b border-brand-sky/50 scroll-mt-28">
        <h2 className="text-3xl font-extrabold tracking-tight">Katalog Produk</h2>
        <p className="mt-1 text-sm text-slate-500">
          Kategori:{" "}
          <span className="font-bold text-brand-blue">
            {activeCategory ? activeCategory.name : "Semua Kategori"}
          </span>{" "}
          • Menampilkan <span className="font-bold text-brand-blue">{filtered.length}</span> produk
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">Sepatu yang kamu cari tidak ditemukan.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <ProductCard key={item.id} p={item} />
          ))}
        </div>
      )}
    </div>
  );
}