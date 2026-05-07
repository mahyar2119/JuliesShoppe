"use client";
import { useState, useMemo } from "react";
import { turkishBrands, BRAND_CATEGORIES, BrandCategory } from "@/lib/store";
import { useLang } from "@/lib/lang";
import BrandCard from "./BrandCard";
import { Send } from "lucide-react";
import { TELEGRAM_USERNAME } from "@/lib/store";

// Category icons rendered as SVG glyphs with brand-inspired colors
const CATEGORY_COLORS: Record<string, string> = {
  all:         "var(--accent)",
  fashion:     "#c0392b",
  shoes:       "#8e44ad",
  bags:        "#d35400",
  electronics: "#2980b9",
  sports:      "#27ae60",
  beauty:      "#e91e8c",
  home:        "#16a085",
  kids:        "#e67e22",
  accessories: "#7f8c8d",
  eyewear:     "#2c3e50",
  auto:        "#34495e",
  food:        "#f39c12",
};

// Grouped sections for better organization
const CATEGORY_GROUPS = [
  { titleFa: "پوشاک و مد",    titleEn: "Fashion & Style",     keys: ["fashion", "bags", "accessories"] },
  { titleFa: "کفش و ورزش",   titleEn: "Shoes & Sports",       keys: ["shoes", "sports"] },
  { titleFa: "الکترونیک",    titleEn: "Electronics",           keys: ["electronics"] },
  { titleFa: "خانه و زندگی", titleEn: "Home & Living",         keys: ["home"] },
  { titleFa: "زیبایی",       titleEn: "Beauty",                keys: ["beauty"] },
  { titleFa: "کودک",         titleEn: "Kids",                  keys: ["kids"] },
  { titleFa: "عینک",         titleEn: "Eyewear",               keys: ["eyewear"] },
  { titleFa: "خودرو",        titleEn: "Auto",                  keys: ["auto"] },
  { titleFa: "غذا",          titleEn: "Food",                  keys: ["food"] },
];

export default function BrandsSection({ search }: { search: string }) {
  const { lang, dir } = useLang();
  const ff = { fontFamily: lang === "fa" ? "Vazirmatn, sans-serif" : "Sora, sans-serif" };
  const isFa = lang === "fa";
  const [cat, setCat] = useState<BrandCategory>("all");

  const filtered = useMemo(() => turkishBrands.filter(b => {
    const matchCat = cat === "all" || b.categories.includes(cat);
    const q = search.toLowerCase();
    const matchSearch = !q || b.name.toLowerCase().includes(q) || b.nameFa.includes(q) || b.descFa.includes(q) || b.descEn.toLowerCase().includes(q);
    return matchCat && matchSearch;
  }), [cat, search]);

  const featured = filtered.filter(b => b.featured);
  const rest = filtered.filter(b => !b.featured);

  // For "all" mode, group the rest brands by category
  const groupedRest = useMemo(() => {
    if (cat !== "all" || search) return null;
    return CATEGORY_GROUPS.map(group => {
      const brands = rest.filter(b => group.keys.some(k => b.categories.includes(k as BrandCategory)));
      return { ...group, brands };
    }).filter(g => g.brands.length > 0);
  }, [cat, search, rest]);

  return (
    <section id="brands" className="relative" style={{ paddingTop: "5rem" }}>

      {/* ── TOP HERO BAR (AI-redesigned) ── */}
      <div style={{
        background: "linear-gradient(135deg, var(--navy) 0%, #0d3a6e 50%, #0a4a3a 100%)",
        padding: "5rem 1.5rem 4rem",
        position: "relative",
        overflow: "hidden",
        marginBottom: "4rem",
      }}>
        {/* Geometric decoration */}
        <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,108,186,0.25) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,143,106,0.20) 0%, transparent 70%)", transform: "translate(-20%, 30%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="max-w-7xl mx-auto relative z-10" dir={dir}>
          <div className="text-center mb-10">
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(100,200,160,0.85)", marginBottom: "1rem", ...ff }}>
              {isFa ? "جولیز شاپ — مستقیم از ترکیه" : "Julie's Shoppe — Direct from Turkey"}
            </p>
            <h1 className="serif" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
              {isFa ? "برندهای معتبر ترکیه" : "Top Turkish Brands"}
            </h1>
            <p style={{ ...ff, color: "rgba(255,255,255,0.60)", fontSize: 14, maxWidth: 440, margin: "0 auto", lineHeight: "1.8" }}>
              {isFa
                ? "برند دلخواهتان را انتخاب کنید — ما از ترکیه به دست شما می‌رسانیم"
                : "Choose your brand — we deliver from Turkey straight to you"}
            </p>
          </div>

          {/* Stats strip */}
          <div style={{ display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap" }}>
            {[
              { n: "45+",  fa: "برند معتبر",    en: "Brands" },
              { n: "24/7", fa: "پشتیبانی",      en: "Support" },
              { n: "15%",  fa: "کارمزد شفاف",  en: "Fee" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <p className="serif" style={{ fontSize: "1.9rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{s.n}</p>
                <p style={{ ...ff, fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{isFa ? s.fa : s.en}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6" style={{ paddingBottom: "6rem" }}>

        {/* Category pills */}
        <div className="pills-scroll flex gap-2 pb-1 mb-12 justify-center flex-wrap">
          {BRAND_CATEGORIES.map(c => (
            <button key={c.key} className={`pill ${cat === c.key ? "active" : ""}`} style={{
              ...ff,
              ...(cat === c.key ? {} : { borderColor: `${CATEGORY_COLORS[c.key]}33`, color: CATEGORY_COLORS[c.key] }),
            }} onClick={() => setCat(c.key)}>
              <span className="mr-1">{c.icon}</span>{isFa ? c.labelFa : c.labelEn}
            </button>
          ))}
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div className="text-center glass-card rounded-3xl" style={{ padding: "5rem 2rem" }}>
            <p style={{ fontSize: 40, marginBottom: "1rem" }}>🔍</p>
            <p style={{ ...ff, color: "var(--ink-2)" }}>{isFa ? "برندی یافت نشد" : "No brands found"}</p>
          </div>
        )}

        {/* Featured section */}
        {featured.length > 0 && (
          <div style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }} dir={dir}>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, var(--accent), transparent)" }} />
              <p style={{ ...ff, fontSize: 10, fontWeight: 700, letterSpacing: "0.40em", textTransform: "uppercase", color: "var(--accent)", whiteSpace: "nowrap" }}>
                {isFa ? "برندهای ویژه" : "Featured Brands"}
              </p>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg, var(--accent), transparent)" }} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {featured.map(b => <BrandCard key={b.id} brand={b} />)}
            </div>
          </div>
        )}

        {/* Grouped rest (when showing "all") */}
        {groupedRest ? groupedRest.map(group => (
          <div key={group.titleEn} style={{ marginBottom: "3.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }} dir={dir}>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, var(--green), transparent)" }} />
              <p style={{ ...ff, fontSize: 10, fontWeight: 700, letterSpacing: "0.40em", textTransform: "uppercase", color: "var(--green)", whiteSpace: "nowrap" }}>
                {isFa ? group.titleFa : group.titleEn}
              </p>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg, var(--green), transparent)" }} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {group.brands.map(b => <BrandCard key={b.id} brand={b} />)}
            </div>
          </div>
        )) : rest.length > 0 && (
          <div>
            {featured.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }} dir={dir}>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, var(--ink-3), transparent)" }} />
                <p style={{ ...ff, fontSize: 10, fontWeight: 700, letterSpacing: "0.40em", textTransform: "uppercase", color: "var(--ink-3)", whiteSpace: "nowrap" }}>
                  {isFa ? "سایر برندها" : "More Brands"}
                </p>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg, var(--ink-3), transparent)" }} />
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {rest.map(b => <BrandCard key={b.id} brand={b} />)}
            </div>
          </div>
        )}

        {/* How it works */}
        <div style={{ marginTop: "5rem" }}>
          <div className="glass-card rounded-3xl relative overflow-hidden" style={{ padding: "3.5rem 2rem" }}>
            <div style={{ position: "absolute", top: 0, inset: "auto 0 auto", height: 2, background: "linear-gradient(90deg, transparent, var(--accent), var(--green), transparent)" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "1.5rem", background: "linear-gradient(135deg, rgba(26,108,186,0.04) 0%, rgba(26,143,106,0.03) 100%)", pointerEvents: "none" }} />

            <div className="relative z-10 text-center mb-10" dir={dir}>
              <p className="section-label" style={ff}>{isFa ? "چطور کار می‌کند؟" : "How It Works"}</p>
              <h3 className="serif mt-3" style={{ fontSize: "1.7rem", color: "var(--ink)", fontWeight: 700 }}>
                {isFa ? "۳ قدم تا رسیدن سفارشتان" : "3 Steps to Your Order"}
              </h3>
              <div className="accent-line" />
            </div>

            <div className="relative z-10 grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                { n: "۱", nEn: "1", fa: "برند را انتخاب کن",    en: "Choose a Brand",     subFa: "از لیست برندها روی فروشگاه دلخواهتان کلیک کنید",          subEn: "Click any brand to visit their Turkish store" },
                { n: "۲", nEn: "2", fa: "محصول را انتخاب کن",  en: "Pick Your Product",  subFa: "محصول، سایز، رنگ دلخواه را در سایت برند انتخاب کنید",     subEn: "Browse the brand's site and choose size, color & product" },
                { n: "۳", nEn: "3", fa: "در تلگرام سفارش بده", en: "Order via Telegram", subFa: "لینک محصول را به ما بفرست — بقیه کار را ما انجام می‌دهیم", subEn: "Send us the product link — we handle the rest" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-4">
                  <div className="step-num">{isFa ? step.n : step.nEn}</div>
                  <div>
                    <h4 style={{ ...ff, fontWeight: 600, fontSize: 14, marginBottom: 6, color: "var(--ink)" }}>{isFa ? step.fa : step.en}</h4>
                    <p style={{ ...ff, fontSize: 12, lineHeight: "1.8", color: "var(--ink-2)" }}>{isFa ? step.subFa : step.subEn}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative z-10 text-center mt-10">
              <a href={`https://t.me/${TELEGRAM_USERNAME}`} target="_blank" rel="noopener noreferrer" className="btn-green" style={ff}>
                <Send size={14} />
                {isFa ? "شروع خرید در تلگرام" : "Start Shopping on Telegram"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
