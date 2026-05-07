"use client";
import { useState } from "react";
import { Product } from "@/lib/store";
import { useStore } from "@/lib/context";
import { useLang } from "@/lib/lang";
import { formatTRY, withMarkup } from "@/lib/currency";
import { ShoppingBag, ExternalLink } from "lucide-react";
import OrderModal from "./OrderModal";

export default function ProductCard({ product }: { product: Product }) {
  const { brands } = useStore();
  const { lang, dir } = useLang();
  const [showOrder, setShowOrder] = useState(false);
  const ff = { fontFamily: lang === "fa" ? "Vazirmatn,sans-serif" : "Sora,sans-serif" };
  const brandInfo  = brands.find(b => b.name === product.brand);
  const brandColor = brandInfo?.color || "var(--navy)";
  const myPrice    = formatTRY(withMarkup(product.originalPrice));

  return (
    <>
      {showOrder && (
        <OrderModal
          productName={product.name}
          productBrand={product.brand}
          productUrl={product.productUrl}
          productId={product.id}
          onClose={() => setShowOrder(false)}
        />
      )}

      <div className="product-card flex flex-col group">

        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio:"3/4", background:"#f4f2ee" }}>
          <img src={product.image} alt={product.name}
            className="w-full h-full object-cover"
            style={{ transition:"transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          />
          {product.tag && (
            <span className="absolute top-3 right-3 badge badge-accent z-10" style={ff}>{product.tag}</span>
          )}
          <span className="absolute top-3 left-3 text-[9px] font-black tracking-wider px-2 py-1 rounded-lg text-white z-10"
            style={{ background: brandColor }}>
            {product.brand}
          </span>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-3 flex-1" dir={dir}>
          <div>
            <h3 className="font-semibold text-sm leading-snug mb-1" style={{ ...ff, color:"var(--ink)" }}>{product.name}</h3>
            <p className="text-base font-black" style={{ color:"var(--ink)" }}>{myPrice}</p>
            <p className="text-[10px] mt-0.5" style={{ ...ff, color:"var(--ink-3)" }}>
              {lang === "fa" ? "شامل ۱۵٪ کارمزد" : "Incl. 15% fee"}
            </p>
          </div>
          <div className="flex gap-2 mt-auto">
            <button onClick={() => setShowOrder(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-85 active:scale-95"
              style={{ background:"var(--navy)", ...ff }}>
              <ShoppingBag size={12} />
              {lang === "fa" ? "ثبت سفارش" : "Order"}
            </button>
            <a href={product.productUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center px-3 rounded-xl transition-all hover:bg-gray-100 active:scale-95"
              style={{ border:"1px solid rgba(210,205,195,0.5)", color:"var(--ink-3)" }}>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
