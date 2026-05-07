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

      {/* ── CENTERED HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 1.5rem" }}>
        <div className="fade-up text-center" style={{ maxWidth: 540 }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <Image
              src="/logo.png"
              alt="Julie's Shoppe"
              width={220}
              height={56}
              style={{
  objectFit: "contain",
  margin: "0 auto",
  display: "block"
}}
              priority
            />
          </div>

          <p className="text-sm" style={{ ...ff, color: "var(--ink-2)", lineHeight: "1.9", maxWidth: 420, margin: "0 auto 2.5rem" }}>
            {isFa
              ? "خرید مستقیم از بهترین برندهای ترکیه — پوشاک، کفش، الکترونیک، لوازم خانگی و بیشتر. ارسال سریع و مطمئن به سراسر ایران."
              : "Direct shopping from Turkey's finest brands — fashion, shoes, electronics, home goods and more. Fast, reliable delivery to Iran."}
          </p>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/brands" className="btn-accent" style={ff}>
              {isFa ? "مشاهده برندها" : "Browse Brands"}
            </Link>
            <button onClick={() => setShowOrder(true)} className="btn-glass" style={ff}>
              {isFa ? "ثبت سفارش" : "Place an Order"}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
