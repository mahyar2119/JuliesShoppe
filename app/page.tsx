"use client";
import { useState, useMemo, useEffect } from "react";
import { useStore } from "@/lib/context";
import { useLang } from "@/lib/lang";
import { useTheme } from "@/lib/theme";
import { Gender, AgeGroup, ProductCategory } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";

const SECTIONS: { key: ProductCategory; labelFa: string; labelEn: string; badge: string }[] = [
  { key:"featured",  labelFa:"پیشنهاد ویژه",  labelEn:"Featured Items",    badge:"Bestsellers"    },
  { key:"new",       labelFa:"جدیدترین‌ها",    labelEn:"New Arrivals",      badge:"New Arrivals"   },
  { key:"suggested", labelFa:"محصولات ویژه",  labelEn:"Suggested Products",badge:"Curated for you"},
];

export default function Home() {
  const { products } = useStore();
  const { lang, dir } = useLang();
  const { theme } = useTheme();
  const [search, setSearch]   = useState("");
  const [gender, setGender]   = useState<Gender|"all">("all");
  const [ageGroup, setAge]    = useState<AgeGroup>("all");

  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const q = search.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      const matchGender = gender==="all" || p.gender===gender;
      const matchAge    = ageGroup==="all" || p.ageGroup===ageGroup;
      return matchSearch && matchGender && matchAge;
    });
  }, [products, search, gender, ageGroup]);

  const ff = { fontFamily: lang==="fa"?"Vazirmatn,sans-serif":"DM Sans,sans-serif" };

  return (
    <main dir={dir} style={{ background:"var(--bg)", minHeight:"100vh" }}>
      <Navbar/>
      <Hero/>

      {/* ── SEARCH + FILTER SECTION ── */}
      <div id="products" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <SearchBar value={search} onChange={setSearch}/>
        </div>
        <CategoryFilter gender={gender} ageGroup={ageGroup} onGender={g=>{setGender(g);setAge("all");}} onAge={setAge}/>
      </div>

      {/* ── PRODUCT GRID ── */}
      {search || gender!=="all" ? (
        /* Filtered results */
        <div className="px-4 pb-16 max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between" dir={dir}>
            <p className="text-sm opacity-60" style={{ ...ff, color:"var(--text2)" }}>
              {lang==="fa" ? `${filtered.length} محصول یافت شد` : `${filtered.length} products found`}
            </p>
            {(search||gender!=="all") && (
              <button onClick={()=>{setSearch("");setGender("all");setAge("all");}}
                className="text-xs px-3 py-1.5 rounded-lg" style={{ ...ff, background:"var(--shine)", color:"var(--blue)" }}>
                {lang==="fa"?"پاک کردن فیلتر":"Clear filters"}
              </button>
            )}
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-24 glass rounded-2xl">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg font-bold" style={{ ...ff, color:"var(--text2)" }}>
                {lang==="fa"?"محصولی یافت نشد":"No products found"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(p=><ProductCard key={p.id} product={p}/>)}
            </div>
          )}
        </div>
      ) : (
        /* Default sectioned view */
        <>
          {SECTIONS.map(sec => {
            const items = products.filter(p => p.category === sec.key);
            if (!items.length) return null;
            return (
              <div key={sec.key} id={sec.key} className="py-16 px-4 max-w-7xl mx-auto">
                <div className="mb-10 text-center">
                  <p className="text-[10px] tracking-[0.5em] uppercase font-bold mb-3 gradient-text">{sec.badge}</p>
                  <h2 className="section-title text-3xl md:text-4xl font-bold" style={{ color:"var(--text)", ...ff }}>
                    {lang==="fa" ? sec.labelFa : sec.labelEn}
                  </h2>
                  <div className="w-16 h-0.5 mx-auto mt-4 rounded" style={{ background:"linear-gradient(90deg,var(--blue),var(--purple))" }}/>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map(p=><ProductCard key={p.id} product={p}/>)}
                </div>
              </div>
            );
          })}
        </>
      )}

      <div style={{ borderTop:"1px solid var(--border)", background:"var(--bg2)" }}>
        <VideoSection/>
      </div>
      <Footer/>
    </main>
  );
}
