"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/lang";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import OrderModal from "@/components/OrderModal";
import Link from "next/link";

export default function Home() {
  const { lang, dir } = useLang();
  const ff    = { fontFamily: lang === "fa" ? "Vazirmatn,sans-serif" : "Sora,sans-serif" };
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const isFa  = lang === "fa";

  const [showOrder,  setShowOrder]  = useState(false);
  const [browsHover, setBrowsHover] = useState(false);
  const [orderHover, setOrderHover] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (v) { v.muted = true; v.play().catch(() => {}); }
  }, []);

  return (
    <main dir={dir}>
      <Navbar activePage="home" />
      {showOrder && <OrderModal onClose={() => setShowOrder(false)} />}

      <section style={{
        position: "relative", height: "100svh", minHeight: 600,
        overflow: "hidden", display: "flex",
        alignItems: "center", justifyContent: "center",
      }}>
        {/* Video */}
        <video ref={videoRef} autoPlay muted loop playsInline preload="auto"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Overlays */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(8,6,4,0.52)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to top, rgba(8,6,4,0.72) 0%, transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to bottom, rgba(8,6,4,0.40) 0%, transparent 40%)" }} />

        {/* Content */}
        <div className="fade-up" style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 1.5rem", width: "100%", maxWidth: 680 }}>

          <p style={{ ...ff, fontSize: 10, fontWeight: 500, letterSpacing: "0.50em", textTransform: "uppercase", color: "rgba(255,255,255,0.50)", marginBottom: "2.2rem" }}>
            {isFa ? "ایستنبول — تهران" : "Istanbul — Tehran"}
          </p>

          <div style={{ marginBottom: "2.8rem" }}>
            <Image src="/logo.png" alt="Julie's Shoppe" width={360} height={90} priority
              style={{ objectFit: "contain", filter: "invert(1) brightness(1.0)", margin: "0 auto", display: "block", maxWidth: "min(360px, 72vw)", height: "auto", opacity: 0.95 }} />
          </div>

          <div style={{ width: 36, height: 1, background: "rgba(255,255,255,0.28)", margin: "0 auto 2.4rem" }} />

          <p style={{ ...serif, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.15rem,2.8vw,1.55rem)", color: "rgba(255,255,255,0.78)", lineHeight: 1.7, maxWidth: 420, margin: "0 auto 3.2rem" }}>
            {isFa ? "بهترین برندهای ترکیه، مستقیم به دست شما" : "Turkey's finest labels, curated for you"}
          </p>

          {/* ── CTAs ── */}
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>

            {/* Browse Brands */}
            <Link
              href="/brands"
              onMouseEnter={() => setBrowsHover(true)}
              onMouseLeave={() => setBrowsHover(false)}
              style={{
                ...ff,
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 34px",
                background:     browsHover ? "rgba(255,255,255,0.88)" : "#fff",
                color:          browsHover ? "var(--accent)" : "#111",
                fontSize:       "12px",
                fontWeight:     browsHover ? 700 : 600,
                letterSpacing:  "0.12em",
                textTransform:  "uppercase",
                textDecoration: "none",
                borderBottom:   `2px solid ${browsHover ? "var(--accent)" : "transparent"}`,
                transition:     "background 0.18s, color 0.18s, border-color 0.18s",
              }}
            >
              {isFa ? "مشاهده برندها" : "Explore Brands"}
            </Link>

            {/* Place Order */}
            <button
              onClick={() => setShowOrder(true)}
              onMouseEnter={() => setOrderHover(true)}
              onMouseLeave={() => setOrderHover(false)}
              style={{
                ...ff,
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "13px 32px",
                background:    "transparent",
                border:        `1px solid ${orderHover ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.38)"}`,
                borderBottom:  `2px solid ${orderHover ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.38)"}`,
                color:         orderHover ? "#fff" : "rgba(255,255,255,0.82)",
                fontSize:      "12px",
                fontWeight:    orderHover ? 700 : 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor:        "pointer",
                transition:    "border-color 0.18s, color 0.18s",
              }}
            >
              {isFa ? "ثبت سفارش" : "Place an Order"}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "2.2rem", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.32 }}>
          <div style={{ width: 1, height: 44, background: "#fff", animation: "scrollPulse 2s ease-in-out infinite" }} />
          <p style={{ fontSize: 8, letterSpacing: "0.38em", textTransform: "uppercase", color: "#fff", fontFamily: "Sora,sans-serif" }}>
            {isFa ? "پایین" : "scroll"}
          </p>
        </div>

        {/* City credit */}
        <p style={{ position: "absolute", bottom: "2rem", zIndex: 10, right: dir === "rtl" ? "auto" : "2rem", left: dir === "rtl" ? "2rem" : "auto", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", fontFamily: "Sora,sans-serif" }}>
          {isFa ? "نیشانتاشی · ایستینیه پارک" : "Nişantaşı · Istinye Park"}
        </p>

        <style>{`
          @keyframes scrollPulse {
            0%, 100% { transform: scaleY(1);   opacity: 0.35; }
            50%       { transform: scaleY(0.6); opacity: 0.15; }
          }
        `}</style>
      </section>

      <Footer />
    </main>
  );
}