"use client";
import { useState } from "react";
import { Product } from "@/lib/store";
import { useStore } from "@/lib/context";
import { useLang } from "@/lib/lang";
import { formatTRY, withMarkup } from "@/lib/currency";
import { Send, ExternalLink } from "lucide-react";
import InstagramCard from "./InstagramCard";

export default function ProductCard({ product }: { product: Product }) {
  const { brands, telegramUsername } = useStore();
  const { t, lang, dir } = useLang();
  const [showIG, setShowIG] = useState(false);
  const ff = { fontFamily: lang==="fa"?"Vazirmatn,sans-serif":"DM Sans,sans-serif" };

  const brandInfo   = brands.find(b => b.name === product.brand);
  const brandColor  = brandInfo?.color || "#0a0a2e";
  const originalTRY = formatTRY(product.originalPrice);
  const myPrice     = formatTRY(withMarkup(product.originalPrice));

  const tgMsg = encodeURIComponent(
    `${t.tg_greeting}\n\n` +
    `🛍 ${product.name} — ${product.brand}\n` +
    `🏷 ${lang==="fa"?"قیمت اصلی":"Original"}: ${originalTRY}\n` +
    `💰 ${lang==="fa"?"قیمت شما":"Your price"}: ${myPrice}\n` +
    `🔗 ${product.productUrl}`
  );
  const tgUrl = `https://t.me/${telegramUsername}?text=${tgMsg}`;

  return (
    <>
      {showIG && <InstagramCard product={product} onClose={() => setShowIG(false)} telegramUsername={telegramUsername}/>}

      <div className="product-card group relative flex flex-col overflow-hidden rounded-2xl shimmer-border glass-card">
        {product.tag && (
          <span className="absolute top-3 right-3 z-20 text-white text-[9px] font-bold px-2 py-1 rounded-full"
            style={{ background:"linear-gradient(135deg,var(--blue),var(--purple))", ...ff }}>
            {product.tag}
          </span>
        )}
        <div className="absolute top-3 left-3 z-20">
          <span className="text-[9px] font-black tracking-widest px-2 py-1 rounded-lg text-white uppercase"
            style={{ background:brandColor, border:"1px solid rgba(255,255,255,0.15)" }}>
            {product.brand}
          </span>
        </div>
        {/* Instagram share on hover */}
        <button onClick={() => setShowIG(true)}
          className="absolute top-10 left-3 z-20 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
          </svg>
        </button>

        <div className="relative overflow-hidden aspect-[3/4]">
          <div className="absolute inset-0" style={{ background:brandColor }}/>
          <img src={product.image} alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-[1]"/>
          <div className="absolute bottom-0 inset-x-0 z-10 p-4"
            style={{ background:"linear-gradient(to top,var(--card-bg) 0%,transparent 60%)" }} dir={dir}>
            <h3 className="font-semibold text-sm leading-tight mb-3" style={{ ...ff, color:"var(--text)" }}>
              {product.name}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider mb-0.5" style={{ ...ff, color:"var(--text3)" }}>
                  {lang==="fa"?"قیمت اصلی":"Original"}
                </span>
                <span className="text-sm line-through" style={{ color:"var(--text3)" }}>{originalTRY}</span>
              </div>
              <span className="text-xs opacity-40">→</span>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider mb-0.5" style={{ ...ff, color:"var(--blue)" }}>
                  {lang==="fa"?"قیمت شما":"Your price"}
                </span>
                <span className="text-base font-bold" style={{ color:"var(--text)" }}>{myPrice}</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded ml-auto"
                style={{ background:"var(--shine2)", color:"var(--purple)", border:"1px solid var(--purple)" }}>+15%</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 p-3">
          <a href={tgUrl} target="_blank" rel="noopener noreferrer"
            className="tg-btn gradient-btn flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-3 rounded-xl text-white"
            style={ff}>
            <Send size={13}/>{t.card_order}
          </a>
          <a href={product.productUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center rounded-xl px-3 transition-all hover:scale-110 glass"
            title={t.card_view}>
            <ExternalLink size={13} style={{ color:"var(--text2)" }}/>
          </a>
        </div>
      </div>
    </>
  );
}
