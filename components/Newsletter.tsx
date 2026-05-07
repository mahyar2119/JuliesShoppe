"use client";
import { useState } from "react";
import { Send, Check } from "lucide-react";
import { useLang } from "@/lib/lang";
import { TELEGRAM_USERNAME } from "@/lib/store";

export default function Newsletter() {
  const { lang, dir } = useLang();
  const ff = { fontFamily: lang === "fa" ? "Vazirmatn,sans-serif" : "Sora,sans-serif" };
  const isFa = lang === "fa";
  const [done, setDone] = useState(false);
  const [val, setVal] = useState("");

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <div className="glass-card rounded-3xl px-8 py-12 md:p-14 text-center relative overflow-hidden" dir={dir}>
        <div className="absolute top-0 inset-x-0" style={{ height: 2, background: "linear-gradient(90deg, transparent, var(--accent), var(--green), transparent)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(26,108,186,0.04) 0%, rgba(26,143,106,0.03) 100%)" }} />

        <div className="relative z-10">
          <p className="section-label" style={ff}>Newsletter</p>
          <h3 className="serif mt-3 mb-2" style={{ fontSize: "clamp(1.5rem,3vw,2rem)", color: "var(--ink)", fontWeight: 700 }}>
            {isFa ? "اولین باش" : "Be the First to Know"}
          </h3>
          <p style={{ ...ff, fontSize: 13, marginBottom: "2.5rem", maxWidth: 360, margin: "0.5rem auto 2rem", color: "var(--ink-2)", lineHeight: "1.8" }}>
            {isFa ? "با عضویت از تخفیف‌ها و محصولات جدید اول از همه باخبر شو" : "Subscribe to get exclusive deals and new arrivals first"}
          </p>

          {done ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl"
              style={{ background: "rgba(26,143,106,0.10)", border: "1px solid rgba(26,143,106,0.30)" }}>
              <Check size={16} style={{ color: "var(--green)" }} />
              <span style={{ color: "var(--green)", fontWeight: 600, fontSize: 14, ...ff }}>{isFa ? "ثبت شد 🎉" : "Subscribed 🎉"}</span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <div className="search-wrap flex-1 flex items-center px-4">
                <input value={val} onChange={e => setVal(e.target.value)}
                  placeholder={isFa ? "ایمیل یا شماره تلگرام" : "Email or Telegram"}
                  onKeyDown={e => e.key === "Enter" && val.trim() && setDone(true)}
                  dir={dir} className="search-input text-sm" style={ff} />
              </div>
              <button onClick={() => val.trim() && setDone(true)} className="btn-accent shrink-0" style={ff}>
                <Send size={13} />{isFa ? "عضویت" : "Subscribe"}
              </button>
            </div>
          )}

          <p style={{ ...ff, fontSize: 12, marginTop: "1.25rem", color: "var(--ink-3)" }}>
            {isFa ? "یا مستقیم در تلگرام: " : "Or message us on Telegram: "}
            <a href={`https://t.me/${TELEGRAM_USERNAME}`} target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>
              @{TELEGRAM_USERNAME}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
