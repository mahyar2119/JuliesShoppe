"use client";
import { ExternalLink } from "lucide-react";
import { TurkishBrand } from "@/lib/store";
import { useLang } from "@/lib/lang";
import Image from "next/image";

// Map brand IDs to Clearbit logo domains
const LOGO_DOMAINS: Record<string, string> = {
  "1":  "zara.com",
  "2":  "mango.com",
  "3":  "hm.com",
  "4":  "lcwaikiki.com",
  "5":  "koton.com",
  "6":  "defacto.com.tr",
  "7":  "stradivarius.com",
  "8":  "bershka.com",
  "9":  "pullandbear.com",
  "10": "massimodutti.com",
  "11": "mavi.com",
  "12": "trendyol.com",
  "13": "hepsiburada.com",
  "14": "n11.com",
  "15": "gittigidiyor.com",
  "16": "nike.com",
  "17": "adidas.com",
  "18": "puma.com",
  "19": "reebok.com",
  "20": "skechers.com",
  "21": "kinetix.com.tr",
  "22": "mediamarkt.de",
  "23": "teknosa.com",
  "24": "vatanbilgisayar.com",
  "25": "apple.com",
  "26": "samsung.com",
  "27": "sephora.com",
  "28": "maccosmetics.com",
  "29": "flormar.com",
  "30": "watsons.com",
  "31": "ikea.com",
  "32": "karaca.com",
  "33": "englishhome.com",
  "34": "vivense.com",
  "35": "kelebekmobelya.com",
  "36": "decathlon.com",
  "37": "sportsdirect.com",
  "38": "optic2000.fr",
  "39": "ray-ban.com",
  "40": "autocar.co.uk",
  "41": "otokoc.com.tr",
  "42": "toysrus.com",
  "43": "babyshop.com",
  "44": "migros.com.tr",
  "45": "rosense.com",
};

function BrandLogo({ brand }: { brand: TurkishBrand }) {
  const domain = LOGO_DOMAINS[brand.id];
  if (!domain) {
    return (
      <div style={{
        width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center",
        justifyContent: "center", background: brand.color, color: "#fff",
        fontWeight: 800, fontSize: 18, fontFamily: "Sora,sans-serif",
        boxShadow: `0 4px 14px ${brand.color}44`,
      }}>
        {brand.name[0]}
      </div>
    );
  }
  return (
    <div style={{
      width: 44, height: 44, borderRadius: 10, background: "#ffffff",
      border: "1px solid rgba(220,228,240,0.8)", display: "flex",
      alignItems: "center", justifyContent: "center", overflow: "hidden",
      boxShadow: "0 2px 10px rgba(13,35,64,0.08)",
    }}>
      <Image
        src={`https://logo.clearbit.com/${domain}`}
        alt={brand.name}
        width={32}
        height={32}
        style={{ objectFit: "contain" }}
        onError={e => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            parent.style.background = brand.color;
            parent.innerHTML = `<span style="color:#fff;font-weight:800;font-size:16px;font-family:Sora,sans-serif">${brand.name[0]}</span>`;
          }
        }}
      />
    </div>
  );
}

// Per-brand design styles
function getBrandStyle(brand: TurkishBrand): React.CSSProperties {
  const c = brand.color;
  return {
    borderTop: `3px solid ${c}`,
    background: `linear-gradient(160deg, ${c}0a 0%, rgba(255,255,255,0.90) 60%)`,
  };
}

export default function BrandCard({ brand }: { brand: TurkishBrand }) {
  const { lang, dir } = useLang();
  const ff = { fontFamily: lang === "fa" ? "Vazirmatn,sans-serif" : "Sora,sans-serif" };
  const isFa = lang === "fa";

  return (
    <a href={brand.url} target="_blank" rel="noopener noreferrer"
      className="brand-card p-4 gap-3" dir={dir}
      style={{ display: "flex", flexDirection: "column", ...getBrandStyle(brand) }}>

      <div style={{ position: "absolute", inset: 0, borderRadius: "18px", background: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, transparent 65%)", pointerEvents: "none" }} />

      {/* Logo + badge row */}
      <div className="relative z-10 flex items-start justify-between">
        <BrandLogo brand={brand} />
        {brand.badge && (
          <span className="badge badge-accent" style={ff}>{brand.badge}</span>
        )}
      </div>

      {/* Text */}
      <div className="relative z-10 flex-1">
        <p className="bc-id text-[9px] font-bold tracking-[0.28em] uppercase mb-0.5">{brand.name}</p>
        <h3 className="bc-name font-semibold text-sm mb-1 leading-snug" style={ff}>
          {isFa ? brand.nameFa : brand.name}
        </h3>
        <p className="bc-sub text-xs leading-relaxed line-clamp-2" style={{ ...ff, fontSize: "11px" }}>
          {isFa ? brand.descFa : brand.descEn}
        </p>
      </div>

      {/* CTA */}
      <div className="relative z-10 bc-divider flex items-center justify-between pt-3 border-t">
        <span className="bc-label text-xs font-semibold" style={ff}>
          {isFa ? "ورود به فروشگاه" : "Visit Store"}
        </span>
        <div className="bc-arrow w-7 h-7 rounded-full flex items-center justify-center">
          <ExternalLink size={11} />
        </div>
      </div>
    </a>
  );
}
