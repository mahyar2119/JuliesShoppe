"use client";
import { Send } from "lucide-react";
import { TELEGRAM_USERNAME } from "@/lib/store";
import { useLang } from "@/lib/lang";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const { lang, dir } = useLang();
  const ff = { fontFamily: lang === "fa" ? "Vazirmatn,sans-serif" : "Sora,sans-serif" };
  const isFa = lang === "fa";

  return (
    <footer style={{ background: "var(--navy)", color: "#e8eef5" }}>
      {/* Top gradient line */}
      <div style={{ height: 2, background: "linear-gradient(90deg, var(--accent), var(--green))" }} />

      <div className="max-w-7xl mx-auto px-6 py-14" dir={dir}>
        <div className="grid md:grid-cols-3 gap-10 mb-10">

          <div>
            <Image src="/logo.png" alt="Julie's Shoppe" width={120} height={32}
              className="mb-5 opacity-80" style={{ objectFit: "contain" }} />
            <p style={{ ...ff, fontSize: 12, color: "rgba(232,238,245,0.45)", lineHeight: "1.8" }}>
              {isFa ? "خرید مستقیم از بهترین برندهای ترکیه با ارسال سریع به ایران" : "Direct shopping from Turkey's best brands with fast delivery to Iran"}
            </p>
          </div>

          <div>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.40em", textTransform: "uppercase", marginBottom: "1.25rem", color: "var(--accent-lt)" }}>
              {isFa ? "صفحات" : "Pages"}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { fa: "خانه", en: "Home", href: "/" },
                { fa: "برندها", en: "Brands", href: "/brands" },
                { fa: "محصولات", en: "Products", href: "/products" },
                { fa: "درباره ما", en: "About", href: "/about" },
              ].map(l => (
                <Link key={l.fa} href={l.href} style={{ ...ff, fontSize: 12, color: "rgba(232,238,245,0.45)", textDecoration: "none", transition: "color 0.15s" }}
                  className="hover:!text-white/80">
                  {isFa ? l.fa : l.en}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.40em", textTransform: "uppercase", marginBottom: "1.25rem", color: "var(--green-lt)" }}>
              {isFa ? "تماس" : "Contact"}
            </p>
            <a href={`https://t.me/${TELEGRAM_USERNAME}`} target="_blank" rel="noopener noreferrer"
              style={{ ...ff, fontSize: 12, color: "rgba(232,238,245,0.45)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, marginBottom: "1.25rem" }}
              className="hover:!text-white/80">
              <Send size={11} />@{TELEGRAM_USERNAME}
            </a>
            <a href={`https://t.me/${TELEGRAM_USERNAME}`} target="_blank" rel="noopener noreferrer"
              className="btn-green text-xs" style={ff}>
              <Send size={12} />{isFa ? "سفارش و پشتیبانی" : "Order & Support"}
            </a>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", display: "flex", flexDirection: "column", gap: 4, alignItems: "center", textAlign: "center" }}>
          <p style={{ ...ff, fontSize: 11, color: "rgba(232,238,245,0.22)" }}>
            © 2025 Julie&apos;s Shoppe — {isFa ? "تمام حقوق محفوظ است" : "All rights reserved"}
          </p>
        </div>
      </div>
    </footer>
  );
}
