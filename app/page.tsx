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
  const [showOrder, setShowOrder] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure autoplay fires after hydration
  useEffect(() => {
    const v = videoRef.current;
    if (v) { v.muted = true; v.play().catch(() => {}); }
  }, []);

  return (
    <main dir={dir}>
      <Navbar activePage="home" />
      {showOrder && <OrderModal onClose={() => setShowOrder(false)} />}

      {/* ══════════════════════════════════════════
          CINEMATIC HERO
      ══════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        height: "100svh",
        minHeight: 600,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>

        {/* ── VIDEO BACKGROUND ── */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 0,
          }}
        >
          {/*
            Place your video at /public/hero.mp4
            Recommended: 15–30s loop, 1920×1080, luxury shopping / Istanbul / fashion footage
            Free sources: Pexels.com → search "luxury fashion" or "istanbul shopping"
          */}
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* ── LAYERED OVERLAYS ── */}
        {/* Base dark veil */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "rgba(8,6,4,0.52)",
        }} />
        {/* Bottom-up fade for text legibility */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          background: "linear-gradient(to top, rgba(8,6,4,0.72) 0%, transparent 55%)",
        }} />
        {/* Top vignette for logo legibility */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          background: "linear-gradient(to bottom, rgba(8,6,4,0.40) 0%, transparent 40%)",
        }} />
        {/* Subtle side vignettes */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(8,6,4,0.35) 100%)",
        }} />

        {/* ── HERO CONTENT ── */}
        <div
          className="fade-up"
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "0 1.5rem",
            width: "100%",
            maxWidth: 680,
          }}
        >
          {/* Eyebrow */}
          <p style={{
            ...ff,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.50em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.50)",
            marginBottom: "2.2rem",
          }}>
            {isFa ? "ایستنبول — تهران" : "Istanbul — Tehran"}
          </p>

          {/* Logo — white on dark video */}
          <div style={{ marginBottom: "2.8rem" }}>
            <Image
              src="/logo.png"
              alt="Julie's Shoppe"
              width={360}
              height={90}
              priority
              style={{
                objectFit: "contain",
                filter: "invert(1) brightness(1.0)",
                margin: "0 auto",
                display: "block",
                maxWidth: "min(360px, 72vw)",
                height: "auto",
                opacity: 0.95,
              }}
            />
          </div>

          {/* Thin rule */}
          <div style={{
            width: 36,
            height: 1,
            background: "rgba(255,255,255,0.28)",
            margin: "0 auto 2.4rem",
          }} />

          {/* Tagline */}
          <p style={{
            ...serif,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(1.15rem, 2.8vw, 1.55rem)",
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.7,
            maxWidth: 420,
            margin: "0 auto 3.2rem",
            letterSpacing: "0.01em",
          }}>
            {isFa
              ? "بهترین برندهای ترکیه، مستقیم به دست شما"
              : "Turkey's finest labels, curated for you"}
          </p>

          {/* CTAs */}
          <div style={{
            display: "flex",
            gap: "0.875rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}>
            {/* Primary — filled white */}
            <Link
              href="/brands"
              style={{
                ...ff,
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "14px 34px",
                background: "#fff",
                color: "#111",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background 0.22s, color 0.22s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.88)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#fff";
              }}
            >
              {isFa ? "مشاهده برندها" : "Explore Brands"}
            </Link>

            {/* Secondary — ghost */}
            <button
              onClick={() => setShowOrder(true)}
              style={{
                ...ff,
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "13px 32px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.38)",
                color: "rgba(255,255,255,0.82)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "border-color 0.22s, color 0.22s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(255,255,255,0.70)";
                el.style.color = "#fff";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(255,255,255,0.38)";
                el.style.color = "rgba(255,255,255,0.82)";
              }}
            >
              {isFa ? "ثبت سفارش" : "Place an Order"}
            </button>
          </div>
        </div>

        {/* ── SCROLL INDICATOR ── */}
        <div style={{
          position: "absolute",
          bottom: "2.2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: 0.35,
        }}>
          <div style={{
            width: 1,
            height: 44,
            background: "#fff",
            animation: "scrollPulse 2s ease-in-out infinite",
          }} />
          <p style={{
            fontSize: 8,
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "#fff",
            fontFamily: "Sora,sans-serif",
          }}>
            {isFa ? "پایین" : "scroll"}
          </p>
        </div>

        {/* ── BOTTOM CITY CREDIT ── */}
        <p style={{
          position: "absolute",
          bottom: "2rem",
          right: dir === "rtl" ? "auto" : "2rem",
          left: dir === "rtl" ? "2rem" : "auto",
          zIndex: 10,
          fontSize: 9,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.22)",
          fontFamily: "Sora,sans-serif",
        }}>
          {isFa ? "نیشانتاشی · ایستینیه پارک" : "Nişantaşı · Istinye Park"}
        </p>

        <style>{`
          @keyframes scrollPulse {
            0%, 100% { transform: scaleY(1); opacity: 0.35; }
            50%       { transform: scaleY(0.6); opacity: 0.15; }
          }
        `}</style>
      </section>

      <Footer />
    </main>
  );
}