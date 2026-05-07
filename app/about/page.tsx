"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/lang";
import { TELEGRAM_USERNAME } from "@/lib/store";
import { Send, Heart, Shield, Truck, Star } from "lucide-react";

export default function AboutPage() {
  const { lang, dir } = useLang();
  const ff = { fontFamily: lang === "fa" ? "Vazirmatn,sans-serif" : "Sora,sans-serif" };
  const isFa = lang === "fa";

  const values = [
    { icon: <Heart size={20} />, fa: "اعتماد و شفافیت",  en: "Trust & Transparency", subFa: "قیمت‌گذاری کاملاً شفاف با ۱۵٪ کارمزد مشخص — بدون هزینه‌های پنهان",              subEn: "Transparent pricing with a clear 15% service fee — no hidden costs", color: "var(--accent)" },
    { icon: <Shield size={20} />, fa: "خرید مطمئن",      en: "Safe Shopping",        subFa: "اطلاعات شما محفوظ است و پرداخت فقط پس از تأیید سفارش انجام می‌شود",           subEn: "Your info is safe and payment only after order confirmation", color: "var(--green)" },
    { icon: <Truck size={20} />,  fa: "ارسال سریع",       en: "Fast Delivery",        subFa: "ارسال مستقیم از ترکیه به سراسر ایران با پیگیری کامل",                          subEn: "Direct shipping from Turkey to Iran with full tracking", color: "var(--accent)" },
    { icon: <Star size={20} />,   fa: "کیفیت اصل",        en: "Authentic Products",   subFa: "تمام محصولات مستقیم از فروشگاه‌های رسمی برند خریداری می‌شوند",                subEn: "All products purchased directly from official brand stores", color: "var(--green)" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "transparent" }} dir={dir}>
      <Navbar activePage="about" />

      {/* Full-page backdrop */}
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem 4rem",
        position: "relative",
      }}>
        {/* Subtle background blobs */}
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,108,186,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,143,106,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Glass popup container */}
        <div style={{
          maxWidth: 680,
          width: "100%",
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(40px) saturate(160%)",
          WebkitBackdropFilter: "blur(40px) saturate(160%)",
          border: "1px solid rgba(220,228,240,0.85)",
          borderRadius: 28,
          boxShadow: "0 24px 80px rgba(13,35,64,0.12), 0 4px 20px rgba(13,35,64,0.06), inset 0 1px 0 rgba(255,255,255,0.98)",
          overflow: "hidden",
          position: "relative",
        }}>
          {/* Color top stripe */}
          <div style={{ height: 3, background: "linear-gradient(90deg, var(--accent), var(--green))" }} />

          <div style={{ padding: "2.5rem" }}>

            {/* Header */}
            <div className="text-center" style={{ marginBottom: "2rem" }}>
              <p className="section-label" style={ff}>{isFa ? "درباره ما" : "About Us"}</p>
              <h1 className="serif" style={{ fontSize: "clamp(1.7rem,3.5vw,2.4rem)", color: "var(--ink)", fontWeight: 700, marginTop: "0.6rem", marginBottom: "0.8rem" }}>
                {isFa ? "درباره جولیز شاپ" : "About Julie's Shoppe"}
              </h1>
              <div className="accent-line" />
            </div>

            {/* Story text */}
            <div style={{ marginBottom: "2rem", padding: "1.5rem", borderRadius: 16, background: "rgba(248,249,251,0.65)", border: "1px solid rgba(220,228,240,0.60)" }}>
              <h2 style={{ ...ff, fontSize: 15, fontWeight: 600, color: "var(--ink)", marginBottom: "0.9rem" }}>
                {isFa ? "داستان ما" : "Our Story"}
              </h2>
              <div style={{ ...ff, fontSize: 13, color: "var(--ink-2)", lineHeight: "2", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {isFa ? (
                  <>
                    <p>جولیز شاپ یک پلتفرم خرید مستقیم از ترکیه است که با هدف ارائه دسترسی آسان به بهترین برندهای جهانی برای مشتریان ایرانی ایجاد شده است.</p>
                    <p>ما با بیش از ۴۵ برند معتبر ترکیه از جمله Zara، Mango، Nike، Adidas، IKEA، Sephora و ده‌ها برند دیگر همکاری داریم.</p>
                    <p>ما خرید را از ترکیه انجام می‌دهیم و با سریع‌ترین روش ممکن به دست شما می‌رسانیم — با قیمتی شفاف و بدون هیچ هزینه پنهانی.</p>
                  </>
                ) : (
                  <>
                    <p>Julie's Shoppe is a direct-from-Turkey shopping platform created to give Iranian customers easy access to the world's best brands.</p>
                    <p>We work with 45+ top Turkish brands including Zara, Mango, Nike, Adidas, IKEA, Sephora and many more.</p>
                    <p>We purchase from Turkey and deliver to you as fast as possible — with fully transparent pricing and zero hidden fees.</p>
                  </>
                )}
              </div>
            </div>

            {/* Values grid */}
            <div className="grid sm:grid-cols-2 gap-3" style={{ marginBottom: "2rem" }}>
              {values.map((v, i) => (
                <div key={i} style={{
                  padding: "1.1rem 1.25rem",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.75)",
                  border: "1px solid rgba(220,228,240,0.65)",
                  display: "flex",
                  gap: "0.9rem",
                  alignItems: "flex-start",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${v.color}12`, color: v.color, flexShrink: 0,
                  }}>
                    {v.icon}
                  </div>
                  <div>
                    <h3 style={{ ...ff, fontWeight: 600, fontSize: 13, color: "var(--ink)", marginBottom: 3 }}>
                      {isFa ? v.fa : v.en}
                    </h3>
                    <p style={{ ...ff, fontSize: 11, lineHeight: "1.75", color: "var(--ink-2)" }}>
                      {isFa ? v.subFa : v.subEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <a href={`https://t.me/${TELEGRAM_USERNAME}`} target="_blank" rel="noopener noreferrer"
                className="btn-green" style={ff}>
                <Send size={14} />
                {isFa ? "شروع خرید در تلگرام" : "Start Shopping on Telegram"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
