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

  const label: React.CSSProperties = {
    fontSize: 9,
    fontWeight: 600,
    letterSpacing: "0.38em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.30)",
    marginBottom: "1.4rem",
    display: "block",
  };

  const link: React.CSSProperties = {
    ...ff,
    fontSize: 12,
    color: "rgba(255,255,255,0.45)",
    textDecoration: "none",
    display: "block",
    marginBottom: "0.7rem",
    transition: "color 0.16s",
    letterSpacing: "0.02em",
  };

  return (
    <footer style={{ background: "#111111", color: "#e8e6e1" }}>
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

      <div className="max-w-7xl mx-auto px-8 py-16" dir={dir}>
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          <div>
            <Image
              src="/logo.png"
              alt="Julie's Shoppe"
              width={120}
              height={30}
              style={{ filter: "invert(1) brightness(0.85)", objectFit: "contain", marginBottom: "1.5rem", opacity: 0.70 }}
            />
            <p style={{ ...ff, fontSize: 12, color: "rgba(255,255,255,0.30)", lineHeight: "2", fontWeight: 300 }}>
              {isFa
                ? "خرید مستقیم از بهترین برندهای ترکیه با ارسال سریع به ایران"
                : "Direct shopping from Turkey's finest brands with fast delivery to Iran"}
            </p>
          </div>

          <div>
            <span style={label}>{isFa ? "صفحات" : "Navigation"}</span>
            {[
              { fa: "خانه",     en: "Home",     href: "/" },
              { fa: "برندها",   en: "Brands",   href: "/brands" },
              { fa: "محصولات", en: "Products", href: "/products" },
              { fa: "درباره ما", en: "About",  href: "/about" },
            ].map(l => (
              <Link key={l.fa} href={l.href} style={link} className="hover:!text-white/70">
                {isFa ? l.fa : l.en}
              </Link>
            ))}
          </div>

          <div>
            <span style={label}>{isFa ? "تماس" : "Contact"}</span>
            <a
              href={`https://t.me/${TELEGRAM_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...link, display: "flex", alignItems: "center", gap: 6 }}
              className="hover:!text-white/70"
            >
              <Send size={11} />@{TELEGRAM_USERNAME}
            </a>
            <a
              href={`https://t.me/${TELEGRAM_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...ff,
                marginTop: "1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 20px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.60)",
                fontSize: 11,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "border-color 0.18s, color 0.18s",
              }}
            >
              <Send size={11} />
              {isFa ? "سفارش در تلگرام" : "Order via Telegram"}
            </a>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", textAlign: "center" }}>
          <p style={{ ...ff, fontSize: 11, color: "rgba(255,255,255,0.18)", letterSpacing: "0.04em" }}>
            © 2025 Julie&apos;s Shoppe
            {isFa ? " — تمام حقوق محفوظ است" : " — All rights reserved"}
          </p>
        </div>
      </div>
    </footer>
  );
}