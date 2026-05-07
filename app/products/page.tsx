"use client";
import { useState, useMemo } from "react";
import { useStore } from "@/lib/context";
import { useLang } from "@/lib/lang";
import { Gender, AgeGroup } from "@/lib/store";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import Footer from "@/components/Footer";

export default function ProductsPage() {
  const { products } = useStore();
  const { lang, dir } = useLang();
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState<Gender | "all">("all");
  const [ageGroup, setAge] = useState<AgeGroup>("all");
  const ff = { fontFamily: lang === "fa" ? "Vazirmatn,sans-serif" : "Sora,sans-serif" };
  const isFa = lang === "fa";

  const filtered = useMemo(() => products.filter(p => {
    const q = search.toLowerCase();
    return (!q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
      && (gender === "all" || p.gender === gender)
      && (ageGroup === "all" || p.ageGroup === ageGroup);
  }), [products, search, gender, ageGroup]);

  return (
    <main style={{ minHeight: "100vh" }} dir={dir}>
      <Navbar searchValue={search} onSearch={setSearch} activePage="products" />
      <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label" style={ff}>{isFa ? "محصولات" : "Products"}</p>
          <h1 className="serif mt-3" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "var(--ink)", fontWeight: 700 }}>
            {isFa ? "همه محصولات" : "All Products"}
          </h1>
          <div className="gold-line" />
        </div>
        <div className="mb-10">
          <CategoryFilter gender={gender} ageGroup={ageGroup} onGender={g => { setGender(g); setAge("all"); }} onAge={setAge} />
        </div>
        {(search || gender !== "all") && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm" style={{ ...ff, color: "var(--ink-2)" }}>
              {isFa ? `${filtered.length} محصول` : `${filtered.length} products`}
            </p>
            <button onClick={() => { setSearch(""); setGender("all"); setAge("all"); }}
              className="text-xs font-bold px-3 py-1.5 rounded-xl"
              style={{ ...ff, background: "rgba(255,255,255,0.6)", color: "var(--accent)", border: "1px solid rgba(197,144,10,0.3)" }}>
              {isFa ? "پاک کردن" : "Clear"}
            </button>
          </div>
        )}
        {filtered.length === 0
          ? <div className="text-center py-24 glass-card rounded-3xl"><p className="text-4xl mb-4">🔍</p><p className="font-bold" style={{ ...ff, color: "var(--ink-2)" }}>{isFa ? "محصولی یافت نشد" : "No products found"}</p></div>
          : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">{filtered.map(p => <ProductCard key={p.id} product={p} />)}</div>
        }
      </div>
      <Footer />
    </main>
  );
}
