"use client";
import { useState, useEffect } from "react";
import { X, Send, Check, Loader2, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/lang";
import { useStore } from "@/lib/context";
import { TELEGRAM_USERNAME, OrderRequest } from "@/lib/store";
import { sendFullOrder } from "@/lib/telegram";

interface Props {
  productName?: string;
  productBrand?: string;
  productUrl?: string;
  productId?: string;
  onClose: () => void;
}

type Step = "form" | "sending" | "success";

const SIZES = ["XS","S","M","L","XL","XXL","36","37","38","39","40","41","42","43","44","45","One Size"];

export default function OrderModal({
  productName = "",
  productBrand = "",
  productUrl = "",
  productId = "",
  onClose,
}: Props) {
  const { lang, dir } = useLang();
  const { saveOrder }  = useStore();
  const ff   = { fontFamily: lang === "fa" ? "Vazirmatn,sans-serif" : "Sora,sans-serif" };
  const isFa = lang === "fa";

  const [step,  setStep]  = useState<Step>("form");
  const [brand, setBrand] = useState(productBrand);
  const [type,  setType]  = useState(productName);
  const [color, setColor] = useState("");
  const [size,  setSize]  = useState("");
  const [url,   setUrl]   = useState(productUrl);
  const [specs, setSpecs] = useState("");
  const [name,  setName]  = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const canSubmit = brand.trim() && type.trim() && name.trim() && phone.trim();

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStep("sending");
    await sendFullOrder({
      brand: brand.trim(), productType: type.trim(), color: color.trim(),
      size, url: url.trim(), specs: specs.trim(),
      fullName: name.trim(), phone: phone.trim(),
    });
    const order: OrderRequest = {
      id: Date.now().toString(), name: name.trim(), phone: phone.trim(),
      product: `${brand} — ${type}`, productId, size, note: specs.trim(), date: Date.now(),
    };
    saveOrder(order);
    setStep("success");
  };

  /* ── Input base style ── */
  const iStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 0,
    fontSize: "14px",
    outline: "none",
    border: "1px solid rgba(0,0,0,0.12)",
    background: "#fff",
    color: "#111",
    transition: "border-color 0.18s",
    ...ff,
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#1f3c88";
    e.currentTarget.style.outline = "none";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
  };

  const Label = ({ text }: { text: string }) => (
    <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "#7a7065", marginBottom: 8, ...ff }}>
      {text}
    </label>
  );

  const SectionTitle = ({ text }: { text: string }) => (
    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: "#a09484", marginBottom: "1.5rem", ...ff }}>
      {text}
    </p>
  );

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(0,0,0,0.60)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* ── PANEL — wider & taller than before ── */}
      <div
        className="w-full relative"
        style={{
          maxWidth: 720,           /* was 512px (max-w-lg) */
          maxHeight: "92vh",
          overflowY: "auto",
          background: "#f7f5f2",
          border: "1px solid rgba(0,0,0,0.09)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
        }}
      >
        {/* Accent top bar */}
        <div style={{ height: 3, background: "#1f3c88" }} />

        {/* ── HEADER ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.75rem 2.5rem 1.5rem",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
          }}
          dir={dir}
        >
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.42em", textTransform: "uppercase", color: "#a09484", marginBottom: 6, ...ff }}>
              Julie&apos;s Shoppe
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.85rem", fontWeight: 600, color: "#111", letterSpacing: "-0.01em", lineHeight: 1 }}>
              {isFa ? "ثبت سفارش" : "Place an Order"}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36, height: 36,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(0,0,0,0.10)",
              background: "transparent",
              color: "#7a7065",
              cursor: "pointer",
              transition: "background 0.16s, color 0.16s, border-color 0.16s",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.background = "#111";
              el.style.color = "#fff";
              el.style.borderColor = "#111";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.background = "transparent";
              el.style.color = "#7a7065";
              el.style.borderColor = "rgba(0,0,0,0.10)";
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* ════════════ FORM ════════════ */}
        {step === "form" && (
          <div style={{ padding: "2rem 2.5rem 2.5rem" }} dir={dir}>

            {/* ── Product details ── */}
            <SectionTitle text={isFa ? "مشخصات محصول" : "Product Details"} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <Label text={isFa ? "نام برند *" : "Brand Name *"} />
                <input value={brand} onChange={e => setBrand(e.target.value)}
                  placeholder={isFa ? "مثلاً: Zara" : "e.g. Zara"}
                  dir="ltr" style={{ ...iStyle, fontFamily: "Sora,sans-serif" }}
                  onFocus={onFocus} onBlur={onBlur} />
              </div>
              <div>
                <Label text={isFa ? "نوع محصول *" : "Product Type *"} />
                <input value={type} onChange={e => setType(e.target.value)}
                  placeholder={isFa ? "مثلاً: پیراهن" : "e.g. Dress"} dir={dir}
                  style={iStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <Label text={isFa ? "رنگ" : "Color"} />
                <input value={color} onChange={e => setColor(e.target.value)}
                  placeholder={isFa ? "مثلاً: مشکی" : "e.g. Black"} dir={dir}
                  style={iStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
              <div>
                <Label text={isFa ? "سایز" : "Size"} />
                <div style={{ position: "relative" }}>
                  <select value={size} onChange={e => setSize(e.target.value)}
                    style={{ ...iStyle, appearance: "none", cursor: "pointer" }}
                    onFocus={onFocus} onBlur={onBlur}>
                    <option value="">{isFa ? "انتخاب..." : "Select..."}</option>
                    {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={13} style={{
                    position: "absolute", top: "50%", transform: "translateY(-50%)",
                    pointerEvents: "none", color: "#7a7065",
                    [dir === "rtl" ? "left" : "right"]: "14px",
                  }} />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <Label text={isFa ? "لینک محصول (URL)" : "Product URL"} />
              <input value={url} onChange={e => setUrl(e.target.value)}
                placeholder="https://www.zara.com/tr/..." dir="ltr" type="url"
                style={{ ...iStyle, fontFamily: "Sora,sans-serif", fontSize: "13px" }}
                onFocus={onFocus} onBlur={onBlur} />
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <Label text={isFa ? "مشخصات بیشتر" : "Additional Notes"} />
              <textarea value={specs} onChange={e => setSpecs(e.target.value)} rows={4}
                placeholder={isFa ? "هر توضیح اضافی، مدل خاص، کد محصول..." : "Any extra notes, model code, specific details..."}
                dir={dir} style={{ ...iStyle, resize: "none" }}
                onFocus={onFocus} onBlur={onBlur} />
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(0,0,0,0.07)", marginBottom: "2rem" }} />

            {/* ── Contact info ── */}
            <SectionTitle text={isFa ? "اطلاعات تماس شما" : "Your Contact Info"} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <Label text={isFa ? "نام و نام خانوادگی *" : "Full Name *"} />
                <input value={name} onChange={e => setName(e.target.value)}
                  placeholder={isFa ? "نام کامل" : "Your full name"} dir={dir}
                  style={iStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
              <div>
                <Label text={isFa ? "شماره تماس *" : "Phone Number *"} />
                <input value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="09xxxxxxxxx" type="tel" dir="ltr"
                  style={{ ...iStyle, fontFamily: "Sora,sans-serif" }}
                  onFocus={onFocus} onBlur={onBlur} />
              </div>
            </div>

            {/* Telegram notice */}
            <div style={{
              padding: "12px 16px", background: "rgba(31,60,136,0.05)",
              border: "1px solid rgba(31,60,136,0.14)",
              display: "flex", alignItems: "center", gap: 10,
              ...ff, fontSize: 12, color: "#1f3c88", marginBottom: "1.75rem",
            }}>
              <Send size={13} style={{ flexShrink: 0 }} />
              {isFa
                ? "پس از ثبت سفارش، پیام تأیید از طریق تلگرام ارسال می‌شود."
                : "A Telegram confirmation will be sent after your order is placed."}
            </div>

            <p style={{ ...ff, fontSize: 11, color: "#a09484", marginBottom: "1.25rem" }}>
              {isFa ? "* فیلدهای ضروری" : "* Required fields"}
            </p>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              style={{
                ...ff,
                width: "100%",
                padding: "16px",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                background: canSubmit ? "#111" : "rgba(0,0,0,0.10)",
                color: canSubmit ? "#fff" : "#aaa",
                border: "none",
                cursor: canSubmit ? "pointer" : "not-allowed",
                transition: "background 0.20s",
              }}
              onMouseEnter={e => { if (canSubmit) (e.currentTarget as HTMLButtonElement).style.background = "#1f3c88"; }}
              onMouseLeave={e => { if (canSubmit) (e.currentTarget as HTMLButtonElement).style.background = "#111"; }}
            >
              <Send size={15} />
              {isFa ? "ثبت سفارش" : "Submit Order"}
            </button>
          </div>
        )}

        {/* ════════════ SENDING ════════════ */}
        {step === "sending" && (
          <div style={{ padding: "5rem 2.5rem", textAlign: "center" }}>
            <Loader2 size={32} className="mx-auto mb-5 animate-spin" style={{ color: "#1f3c88" }} />
            <p style={{ ...ff, fontSize: 14, color: "#4a4540" }}>
              {isFa ? "در حال ارسال سفارش..." : "Submitting your order..."}
            </p>
          </div>
        )}

        {/* ════════════ SUCCESS ════════════ */}
        {step === "success" && (
          <div style={{ padding: "4rem 2.5rem", textAlign: "center" }}>
            <div style={{
              width: 64, height: 64, border: "1px solid rgba(0,0,0,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}>
              <Check size={28} style={{ color: "#1f3c88" }} />
            </div>

            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.7rem", fontWeight: 600, color: "#111", marginBottom: "0.75rem" }}>
              {isFa ? "سفارش ثبت شد" : "Order Confirmed"}
            </h3>
            <p style={{ ...ff, fontSize: 13, lineHeight: "1.9", color: "#4a4540", maxWidth: 360, margin: "0 auto 1.5rem", fontWeight: 300 }}>
              {isFa
                ? "سفارش شما ثبت شد و پیام تأیید از طریق تلگرام ارسال گردید. به زودی با شما تماس خواهیم گرفت."
                : "Your order has been placed and a confirmation has been sent via Telegram. We'll be in touch shortly."}
            </p>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 18px", marginBottom: "2rem",
              background: "rgba(31,60,136,0.06)", border: "1px solid rgba(31,60,136,0.14)",
              ...ff, fontSize: 12, color: "#1f3c88",
            }}>
              <Send size={12} />
              {isFa ? "پیام تأیید ارسال شد" : "Confirmation sent via Telegram"}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 300, margin: "0 auto" }}>
              <a
                href={`https://t.me/${TELEGRAM_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...ff,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "13px", background: "#111", color: "#fff",
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
                  textDecoration: "none", transition: "background 0.18s",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#1f3c88")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#111")}
              >
                <Send size={13} />
                {isFa ? "پیگیری در تلگرام" : "Follow up on Telegram"}
              </a>
              <button
                onClick={onClose}
                style={{
                  ...ff,
                  padding: "12px",
                  background: "transparent",
                  border: "1px solid rgba(0,0,0,0.10)",
                  fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase",
                  color: "#7a7065", cursor: "pointer", transition: "border-color 0.16s, color 0.16s, font-weight 0.16s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "#111";
                  el.style.color = "#111";
                  el.style.fontWeight = "700";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(0,0,0,0.10)";
                  el.style.color = "#7a7065";
                  el.style.fontWeight = "500";
                }}
              >
                {isFa ? "بستن" : "Close"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}