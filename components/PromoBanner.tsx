"use client";
import { useLang } from "@/lib/lang";
import { Sparkles } from "lucide-react";

export default function PromoBanner() {
  const { t, lang, dir } = useLang();
  const ff = { fontFamily: lang === "fa" ? "Vazirmatn,sans-serif" : "Sora,sans-serif" };

  return (
    <section className="px-4 py-6 max-w-7xl mx-auto">
      <div
        className="relative overflow-hidden rounded-2xl px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{
          background: "linear-gradient(135deg, #0d0d2e 0%, #1a0a3e 50%, #0a1a3e 100%)",
          border: "1px solid rgba(212,175,55,0.2)",
          boxShadow: "0 0 60px rgba(155,92,255,0.1)",
        }}
        dir={dir}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #9b5cff, transparent)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #4f7cff, transparent)", transform: "translate(-30%, 30%)" }} />

        {/* Gold shimmer line top */}
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)" }} />

        <div className="relative text-center md:text-start z-10">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)" }}>
            <Sparkles size={10} style={{ color: "#d4af37" }} />
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#d4af37", ...ff }}>
              {t.promo_badge}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: "#f0f0ff", fontFamily: "Playfair Display, serif" }}>
            {t.promo_title}
          </h3>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)", ...ff }}>{t.promo_sub}</p>
        </div>

        <div className="relative z-10 shrink-0">
          <a
            href="#featured"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(212,175,55,0.9), rgba(180,140,30,0.9))",
              color: "#0a0a1a",
              boxShadow: "0 8px 30px rgba(212,175,55,0.25)",
              ...ff,
            }}
          >
            {t.promo_cta}
          </a>
        </div>
      </div>
    </section>
  );
}
