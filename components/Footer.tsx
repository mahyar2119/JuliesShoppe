"use client";
import { Send } from "lucide-react";
import { TELEGRAM_USERNAME } from "@/lib/store";
import { useLang } from "@/lib/lang";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const { lang, dir } = useLang();
  const ff   = { fontFamily: lang === "fa" ? "Vazirmatn,sans-serif" : "Sora,sans-serif" };
  const isFa = lang === "fa";

  return (
    <footer style={{ background: "#f0ece6", borderTop: "1px solid rgba(0,0,0,0.08)" }}>

      <div className="max-w-7xl mx-auto px-8 py-16" dir={dir}>
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="Julie's Shoppe"
              width={120}
              height={30}
              style={{ objectFit: "contain", marginBottom: "1.25rem", opacity: 0.75 }}
            />
            <p style={{ ...ff, fontSize: 12, color: "#7a7065", lineHeight: "2", fontWeight: 300 }}>
              {isFa
                ? "خرید مستقیم از بهترین برندهای ترکیه با ارسال سریع به ایران"
                : "Direct shopping from Turkey's finest brands with fast delivery to Iran"}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p style={{
              fontSize: 9, fontWeight: 600, letterSpacing: "0.38em",
              textTransform: "uppercase", color: "#a09484",
              marginBottom: "1.25rem", ...ff,
            }}>
              {isFa ? "صفحات" : "Navigation"}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[
                { fa: "خانه",     en: "Home",     href: "/" },
                { fa: "برندها",   en: "Brands",   href: "/brands" },
                { fa: "محصولات", en: "Products", href: "/products" },
                { fa: "درباره ما", en: "About",  href: "/about" },
              ].map(l => (
                <Link
                  key={l.fa}
                  href={l.href}
                  style={{ ...ff, fontSize: 13, color: "#4a4540", textDecoration: "none", transition: "color 0.16s" }}
                  className="hover:!text-[#111]"
                >
                  {isFa ? l.fa : l.en}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{
              fontSize: 9, fontWeight: 600, letterSpacing: "0.38em",
              textTransform: "uppercase", color: "#a09484",
              marginBottom: "1.25rem", ...ff,
            }}>
              {isFa ? "تماس" : "Contact"}
            </p>
            <a
              href={`https://t.me/${TELEGRAM_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...ff, fontSize: 13, color: "#4a4540", textDecoration: "none", display: "flex", alignItems: "center", gap: 7, marginBottom: "1.25rem", transition: "color 0.16s" }}
              className="hover:!text-[#111]"
            >
              <Send size={12} />
              @{TELEGRAM_USERNAME}
            </a>
            <a
              href={`https://t.me/${TELEGRAM_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...ff,
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 22px",
                background: "#111",
                color: "#fff",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background 0.18s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#2a2a2a")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#111")}
            >
              <Send size={11} />
              {isFa ? "سفارش و پشتیبانی" : "Order & Support"}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "1.5rem", textAlign: "center" }}>
          <p style={{ ...ff, fontSize: 11, color: "#a09484", letterSpacing: "0.04em" }}>
            © 2025 Julie&apos;s Shoppe
            {isFa ? " — تمام حقوق محفوظ است" : " — All rights reserved"}
          </p>
        </div>
      </div>
    </footer>
  );
}