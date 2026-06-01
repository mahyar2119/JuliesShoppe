"use client";
import { useState } from "react";
import { Product, IRAN_HASHTAGS, TELEGRAM_USERNAME } from "@/lib/store";
import { formatTRY, withMarkup } from "@/lib/currency";
import { X, Copy, Check } from "lucide-react";
import { useLang } from "@/lib/lang";

interface Props { product: Product; onClose: () => void; }

export default function InstagramCard({ product, onClose }: Props) {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);
  const ff = { fontFamily: lang==="fa"?"Vazirmatn,sans-serif":"DM Sans,sans-serif" };

  const originalTRY = formatTRY(product.originalPrice);
  const myPrice     = formatTRY(withMarkup(product.originalPrice));

  // Pick 10 relevant hashtags
  const hashtags = IRAN_HASHTAGS.slice(0, 10).join(" ");
  const caption =
    `✨ ${product.name}\n🏷 ${product.brand}\n\n` +
    `💰 قیمت اصلی: ${originalTRY}\n🛍 قیمت شما: ${myPrice}\n\n` +
    `📲 سفارش در تلگرام: @${TELEGRAM_USERNAME}\n\n${hashtags}`;

  const copyCaption = async () => {
    await navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background:"rgba(0,0,0,0.85)", backdropFilter:"blur(10px)" }}>
      <div className="w-full max-w-md rounded-2xl overflow-hidden glass-card" style={{ maxHeight:"90vh", overflowY:"auto" }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor:"var(--border)" }}>
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            <span className="text-sm font-bold fa" style={{ ...ff, color:"var(--text)" }}>
              {lang==="fa" ? "اشتراک‌گذاری اینستاگرام" : "Share to Instagram"}
            </span>
          </div>
          <button onClick={onClose} style={{ color:"var(--text3)" }}><X size={18}/></button>
        </div>

        {/* Story card preview */}
        <div className="p-4">
          <p className="text-[10px] mb-2 opacity-50 fa" style={{ ...ff, color:"var(--text3)" }}>
            {lang==="fa" ? "پیش‌نمایش کارت استوری" : "Story Card Preview"}
          </p>
          <div className="relative aspect-[9/16] rounded-xl overflow-hidden max-h-64 mx-auto w-36">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
            <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(5,5,20,0.95) 0%, transparent 50%)" }}/>
            <div className="absolute bottom-0 inset-x-0 p-3 text-center">
              <p className="text-white text-[9px] font-bold uppercase tracking-wider">{product.brand}</p>
              <p className="text-white text-[10px] font-semibold mt-0.5">{product.name}</p>
              <p className="text-[9px] line-through mt-1" style={{ color:"rgba(255,255,255,0.5)" }}>{originalTRY}</p>
              <p className="text-white text-sm font-bold">{myPrice}</p>
              <p className="text-[8px] mt-1" style={{ color:"rgba(155,92,255,0.9)" }}>@{TELEGRAM_USERNAME}</p>
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="px-4 pb-2">
          <p className="text-[10px] mb-2 opacity-50 fa" style={{ ...ff, color:"var(--text3)" }}>
            {lang==="fa" ? "کپشن آماده با هشتگ‌های ترند" : "Caption with trending hashtags"}
          </p>
          <div className="p-3 rounded-xl text-xs leading-relaxed whitespace-pre-wrap fa"
            style={{ ...ff, background:"var(--bg2)", color:"var(--text2)", border:"1px solid var(--border)", fontSize:"11px" }}>
            {caption}
          </div>
        </div>

        {/* Hashtags preview */}
        <div className="px-4 pb-3">
          <div className="flex flex-wrap gap-1 mt-2">
            {IRAN_HASHTAGS.slice(0,10).map((h,i)=>(
              <span key={i} className="text-[9px] px-2 py-0.5 rounded-full"
                style={{ background:"var(--shine2)", color:"var(--purple)", border:"1px solid var(--border2)" }}>{h}</span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 flex flex-col gap-2 border-t" style={{ borderColor:"var(--border)" }}>
          <button onClick={copyCaption}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm gradient-btn text-white">
            {copied ? <Check size={15}/> : <Copy size={15}/>}
            <span style={ff}>{lang==="fa" ? (copied?"کپی شد!":"کپی کپشن + هشتگ‌ها") : (copied?"Copied!":"Copy Caption + Hashtags")}</span>
          </button>
          <p className="text-[10px] text-center opacity-50 fa" style={{ ...ff, color:"var(--text3)" }}>
            {lang==="fa"
              ? "تصویر بالا را ذخیره کن، سپس کپشن را در اینستاگرام paste کن"
              : "Save the image above, then paste this caption in Instagram"}
          </p>
        </div>
      </div>
    </div>
  );
}
