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
  const [search, setSearch]   = useState("");
  const [gender, setGender]   = useState<Gender | "all">("all");
  const [ageGroup, setAge]    = useState<AgeGroup>("all");
  const ff   = { fontFamily: lang === "fa" ? "Vazirmatn,sans-serif" : "Sora,sans-serif" };
  const isFa = lang === "fa";

  const filtered = useMemo(() => products.filter(p => {
    const q = search.toLowerCase();
    return (
      (!q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)) &&
      (gender   === "all" || p.gender   === gender) &&
      (ageGroup === "all" || p.ageGroup === ageGroup)
    );
  }), [products, search, gender, ageGroup]);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }} dir={dir}>
      <Navbar searchValue={search} onSearch={setSearch} activePage="products" />

      {/* ── PAGE HEADER ── */}
      <div style={{
        paddingTop:    "7rem",       /* clear fixed navbar */
        paddingBottom: "3rem",
        paddingLeft:   "1.5rem",
        paddingRight:  "1.5rem",
        textAlign:     "center",
        borderBottom:  "1px solid rgba(0,0,0,0.07)",
        marginBottom:  "2.5rem",
        background:    "var(--bg)",
      }}>
        <p style={{
          ...ff,
          fontSize:      10,
          fontWeight:    600,
          letterSpacing: "0.42em",
          textTransform: "uppercase",
          color:         "var(--ink-3)",
          marginBottom:  "0.75rem",
        }}>
          {isFa ? "فروشگاه" : "Collection"}
        </p>
        <h1 style={{
          fontFamily:    "'Cormorant Garamond', Georgia, serif",
          fontSize:      "clamp(2rem, 4vw, 3rem)",
          fontWeight:    600,
          color:         "var(--ink)",
          letterSpacing: "-0.02em",
          marginBottom:  "0.5rem",
          lineHeight:    1.1,
        }}>
          {isFa ? "همه محصولات" : "All Products"}
        </h1>
        <div style={{ width: 24, height: 1, background: "var(--accent)", margin: "1rem auto 0" }} />
      </div>

      <div className="pb-24 px-6 max-w-7xl mx-auto">

        {/* Filters */}
        <div style={{ marginBottom: "2rem" }}>
          <CategoryFilter
            gender={gender}
            ageGroup={ageGroup}
            onGender={g => { setGender(g); setAge("all"); }}
            onAge={setAge}
          />
        </div>

        {/* Active filter strip */}
        {(search || gender !== "all") && (
          <div style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            marginBottom:   "1.5rem",
          }}>
            <p style={{ ...ff, fontSize: 13, color: "var(--ink-2)" }}>
              {isFa ? `${filtered.length} محصول` : `${filtered.length} products`}
            </p>
            <button
              onClick={() => { setSearch(""); setGender("all"); setAge("all"); }}
              style={{
                ...ff,
                fontSize:    11,
                fontWeight:  600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding:     "6px 14px",
                background:  "transparent",
                color:       "var(--accent)",
                border:      "1px solid rgba(31,60,136,0.25)",
                cursor:      "pointer",
                transition:  "background 0.16s",
              }}
            >
              {isFa ? "پاک کردن" : "Clear"}
            </button>
          </div>
        )}

        {/* Grid or empty state */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 2rem", border: "1px solid var(--border)" }}>
            <p style={{ fontSize: 36, marginBottom: "1rem" }}>🔍</p>
            <p style={{ ...ff, fontWeight: 600, color: "var(--ink-2)" }}>
              {isFa ? "محصولی یافت نشد" : "No products found"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}