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

export default function OrderModal({ productName = "", productBrand = "", productUrl = "", productId = "", onClose }: Props) {
  const { lang, dir } = useLang();
  const { saveOrder } = useStore();
  const ff = { fontFamily: lang === "fa" ? "Vazirmatn,sans-serif" : "Sora,sans-serif" };
  const isFa = lang === "fa";

  const [step, setStep]   = useState<Step>("form");
  const [brand, setBrand] = useState(productBrand);
  const [type, setType]   = useState(productName);
  const [color, setColor] = useState("");
  const [size, setSize]   = useState("");
  const [url, setUrl]     = useState(productUrl);
  const [specs, setSpecs] = useState("");
  const [name, setName]   = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  const canSubmit = brand.trim() && type.trim() && name.trim() && phone.trim();

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStep("sending");
    await sendFullOrder({ brand: brand.trim(), productType: type.trim(), color: color.trim(), size, url: url.trim(), specs: specs.trim(), fullName: name.trim(), phone: phone.trim() });
    const order: OrderRequest = { id: Date.now().toString(), name: name.trim(), phone: phone.trim(), product: `${brand} — ${type}`, productId, size, note: specs.trim(), date: Date.now() };
    saveOrder(order);
    setStep("success");
  };

  const iStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", borderRadius: "10px", fontSize: "13px",
    outline: "none", border: "1px solid rgba(180,200,224,0.45)",
    background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)",
    color: "var(--ink)", transition: "border-color 0.18s, box-shadow 0.18s", ...ff,
  };
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "var(--accent)";
    e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(26,108,186,0.10)";
  };
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(180,200,224,0.45)";
    e.currentTarget.style.boxShadow   = "none";
  };

  const Label = ({ text }: { text: string }) => (
    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--ink-2)", ...ff }}>{text}</label>
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(13,35,64,0.50)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>

      <div className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden"
        style={{
          background: "rgba(248,249,251,0.94)",
          backdropFilter: "blur(36px) saturate(160%)",
          WebkitBackdropFilter: "blur(36px) saturate(160%)",
          border: "1px solid rgba(220,228,240,0.85)",
          boxShadow: "0 -8px 60px rgba(13,35,64,0.16), 0 40px 80px rgba(13,35,64,0.20), inset 0 1px 0 rgba(255,255,255,0.98)",
          maxHeight: "94vh", overflowY: "auto",
        }}>

        {/* Gradient top bar */}
        <div style={{ height: "2.5px", background: "linear-gradient(90deg, var(--accent), var(--green))" }} />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid rgba(180,200,224,0.25)" }} dir={dir}>
          <div>
            <p className="section-label text-[8px]" style={ff}>Julie&apos;s Shoppe</p>
            <h2 className="font-semibold text-base mt-0.5 serif" style={{ color: "var(--ink)" }}>
              {isFa ? "ثبت سفارش" : "Place an Order"}
            </h2>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-black/6"
            style={{ color: "var(--ink-3)" }}>
            <X size={16} />
          </button>
        </div>

        {step === "form" && (
          <div className="px-6 pt-5 pb-7 space-y-5" dir={dir}>

            {/* Product info */}
            <div>
              <p className="section-label text-[9px] mb-4" style={ff}>
                {isFa ? "مشخصات محصول" : "Product Details"}
              </p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label text={isFa ? "نام برند *" : "Brand Name *"} />
                    <input value={brand} onChange={e => setBrand(e.target.value)}
                      placeholder={isFa ? "مثلاً: Zara" : "e.g. Zara"}
                      dir="ltr" style={{ ...iStyle, fontFamily: "Sora,sans-serif" }}
                      onFocus={focus} onBlur={blur} />
                  </div>
                  <div>
                    <Label text={isFa ? "نوع محصول *" : "Product Type *"} />
                    <input value={type} onChange={e => setType(e.target.value)}
                      placeholder={isFa ? "مثلاً: پیراهن" : "e.g. Dress"} dir={dir}
                      style={iStyle} onFocus={focus} onBlur={blur} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label text={isFa ? "رنگ" : "Color"} />
                    <input value={color} onChange={e => setColor(e.target.value)}
                      placeholder={isFa ? "مثلاً: مشکی" : "e.g. Black"} dir={dir}
                      style={iStyle} onFocus={focus} onBlur={blur} />
                  </div>
                  <div>
                    <Label text={isFa ? "سایز" : "Size"} />
                    <div className="relative">
                      <select value={size} onChange={e => setSize(e.target.value)}
                        style={{ ...iStyle, appearance: "none", cursor: "pointer" }}
                        onFocus={focus} onBlur={blur}>
                        <option value="">{isFa ? "انتخاب..." : "Select..."}</option>
                        {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={13} className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: "var(--ink-3)", [dir === "rtl" ? "left" : "right"]: "12px" }} />
                    </div>
                  </div>
                </div>

                <div>
                  <Label text={isFa ? "لینک محصول (URL)" : "Product URL"} />
                  <input value={url} onChange={e => setUrl(e.target.value)}
                    placeholder="https://www.zara.com/tr/..." dir="ltr" type="url"
                    style={{ ...iStyle, fontFamily: "Sora,sans-serif", fontSize: "12px" }}
                    onFocus={focus} onBlur={blur} />
                </div>

                <div>
                  <Label text={isFa ? "مشخصات بیشتر" : "Additional Specifications"} />
                  <textarea value={specs} onChange={e => setSpecs(e.target.value)} rows={3}
                    placeholder={isFa ? "هر توضیح اضافی، مدل خاص، کد محصول..." : "Any extra notes, model code, specific details..."}
                    dir={dir} style={{ ...iStyle, resize: "none" }} onFocus={focus} onBlur={blur} />
                </div>
              </div>
            </div>

            <div className="divider-line" />

            {/* Customer info */}
            <div>
              <p className="section-label text-[9px] mb-4" style={ff}>
                {isFa ? "اطلاعات تماس شما" : "Your Contact Info"}
              </p>
              <div className="space-y-3">
                <div>
                  <Label text={isFa ? "نام و نام خانوادگی *" : "Full Name *"} />
                  <input value={name} onChange={e => setName(e.target.value)}
                    placeholder={isFa ? "نام کامل" : "Your full name"} dir={dir}
                    style={iStyle} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <Label text={isFa ? "شماره تماس *" : "Phone Number *"} />
                  <input value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="09xxxxxxxxx" type="tel" dir="ltr"
                    style={{ ...iStyle, fontFamily: "Sora,sans-serif" }}
                    onFocus={focus} onBlur={blur} />
                </div>
              </div>
            </div>

            {/* Telegram notice */}
            <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(26,143,106,0.08)", border: "1px solid rgba(26,143,106,0.20)", ...ff, fontSize: 12, color: "var(--green)", display: "flex", alignItems: "center", gap: 8 }}>
              <Send size={13} />
              {isFa
                ? "پس از ثبت سفارش، پیام تأیید از طریق تلگرام ارسال می‌شود."
                : "After placing your order, a Telegram confirmation will be sent to you."}
            </div>

            <p style={{ ...ff, fontSize: 10, color: "var(--ink-3)" }}>
              {isFa ? "* فیلدهای ضروری" : "* Required fields"}
            </p>

            <button onClick={handleSubmit} disabled={!canSubmit}
              className="w-full py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              style={{
                ...ff,
                background: canSubmit ? "linear-gradient(135deg, var(--accent), var(--accent-lt))" : "rgba(180,200,224,0.35)",
                color: canSubmit ? "#fff" : "var(--ink-3)",
                cursor: canSubmit ? "pointer" : "not-allowed",
                boxShadow: canSubmit ? "0 8px 24px rgba(26,108,186,0.28)" : "none",
              }}>
              <Send size={15} />
              {isFa ? "ثبت سفارش" : "Submit Order"}
            </button>
          </div>
        )}

        {step === "sending" && (
          <div className="px-6 py-20 text-center">
            <Loader2 size={36} className="mx-auto mb-5 animate-spin" style={{ color: "var(--accent)" }} />
            <p style={{ ...ff, fontSize: 14, color: "var(--ink-2)" }}>
              {isFa ? "در حال ارسال سفارش..." : "Submitting your order..."}
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="px-6 py-14 text-center">
            {/* Success icon */}
            <div style={{ width: 72, height: 72, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", background: "linear-gradient(135deg, rgba(26,143,106,0.12), rgba(26,108,186,0.10))", border: "2px solid rgba(26,143,106,0.28)" }}>
              <Check size={30} style={{ color: "var(--green)" }} />
            </div>
            <h3 className="serif text-xl font-bold mb-3" style={{ color: "var(--ink)" }}>
              {isFa ? "سفارش با موفقیت ثبت شد ✓" : "Order Successfully Placed ✓"}
            </h3>
            <p style={{ ...ff, fontSize: 13, lineHeight: "1.85", color: "var(--ink-2)", maxWidth: 320, margin: "0 auto 1rem" }}>
              {isFa
                ? "سفارش شما ثبت شد و پیام تأیید از طریق ربات تلگرام ارسال گردید. به زودی با شما تماس خواهیم گرفت."
                : "Your order has been placed and a confirmation has been sent via Telegram bot. We'll contact you soon."}
            </p>

            {/* Confirmation note */}
            <div style={{ padding: "10px 16px", borderRadius: 12, background: "rgba(26,143,106,0.08)", border: "1px solid rgba(26,143,106,0.20)", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, ...ff, fontSize: 12, color: "var(--green)" }}>
              <Send size={13} />
              {isFa ? "پیام تأیید ارسال شد" : "Confirmation message sent"}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", maxWidth: 280, margin: "0 auto" }}>
              <a href={`https://t.me/${TELEGRAM_USERNAME}`} target="_blank" rel="noopener noreferrer"
                className="btn-accent w-full justify-center py-3.5" style={ff}>
                <Send size={14} />
                {isFa ? "پیگیری در تلگرام" : "Follow up on Telegram"}
              </a>
              <button onClick={onClose}
                className="w-full py-3 rounded-2xl text-sm font-medium transition-all hover:bg-black/5"
                style={{ color: "var(--ink-2)", ...ff }}>
                {isFa ? "بستن" : "Close"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
