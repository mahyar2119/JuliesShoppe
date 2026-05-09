"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/lang";
import Image from "next/image";
import { useState } from "react";
import OrderModal from "@/components/OrderModal";
import Link from "next/link";

export default function Home() {
  const { lang, dir } = useLang();
  const ff = { fontFamily: lang === "fa" ? "Vazirmatn,sans-serif" : "Sora,sans-serif" };
  const isFa = lang === "fa";
  const [showOrder, setShowOrder] = useState(false);

  return (
    <main dir={dir} style={{ minHeight: "100vh" }}>
      <Navbar activePage="home" />
      {showOrder && <OrderModal onClose={() => setShowOrder(false)} />}

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 2rem",
        gap: 0,
      }}>
        <div className="fade-up" style={{ textAlign: "center", maxWidth: 560 }}>

          {/* Eyebrow */}
          <p className="section-label" style={{ ...ff, marginBottom: "2.8rem" }}>
            {isFa ? "خرید مستقیم از ترکیه" : "Direct from Turkey"}
          </p>

          {/* Logo */}
          <div style={{ marginBottom: "3.5rem" }}>
            <Image
              src="/logo.png"
              alt="Julie's Shoppe"
              width={360}
              height={90}
              style={{
                filter: "invert(1) brightness(0.05)",
                objectFit: "contain",
                margin: "0 auto",
                display: "block",
                maxWidth: "100%",
                height: "auto",
              }}
              priority
            />
          </div>

          {/* Thin rule */}
          <div style={{ width: 40, height: 1, background: "var(--border-mid)", margin: "0 auto 3rem" }} />

          {/* Description */}
          <p style={{
            ...ff,
            color: "var(--ink-2)",
            lineHeight: "2",
            fontSize: "14px",
            maxWidth: 400,
            margin: "0 auto 3.5rem",
            fontWeight: 300,
          }}>
            {isFa
              ? "پوشاک، کفش، الکترونیک و لوازم خانگی — مستقیم از بهترین برندهای ترکیه با ارسال مطمئن به سراسر ایران."
              : "Fashion, shoes, electronics and home goods — sourced directly from Turkey's finest brands, delivered reliably to Iran."}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/brands" className="btn-accent" style={ff}>
              {isFa ? "مشاهده برندها" : "Browse Brands"}
            </Link>
            <button onClick={() => setShowOrder(true)} className="btn-glass" style={ff}>
              {isFa ? "ثبت سفارش" : "Place an Order"}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: 0.3,
        }}>
          <div style={{ width: 1, height: 40, background: "var(--ink)" }} />
          <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink)", fontFamily: "Sora,sans-serif" }}>
            {isFa ? "پایین" : "scroll"}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}