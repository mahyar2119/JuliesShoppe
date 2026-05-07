"use client";
import { ChevronDown, ShoppingBag } from "lucide-react";
import { useLang } from "@/lib/lang";
import Image from "next/image";
import Link from "next/link";

const BRANDS = ["ZARA","MANGO","NIKE","ADIDAS","H&M","TRENDYOL","LC WAİKİKİ","SEPHORA","MAVİ","BERSHKA","PULL&BEAR","KOTON","DeFACTO","MASSIMO DUTTI","DECATHLON","MEDIA MARKT","IKEA","PUMA","REEBOK","SKECHERS"];

const GRID = [
  { name:"Zara",       color:"#1a1a1a", emoji:"👗" },
  { name:"Nike",       color:"#111",    emoji:"👟" },
  { name:"IKEA",       color:"#0051ba", emoji:"🛋️" },
  { name:"Sephora",    color:"#1a001a", emoji:"💄" },
  { name:"Adidas",     color:"#000",    emoji:"⚽" },
  { name:"MediaMarkt", color:"#cc0000", emoji:"📱" },
  { name:"Trendyol",   color:"#f27a1a", emoji:"🛍️" },
  { name:"Decathlon",  color:"#007dbc", emoji:"🏋️" },
  { name:"Mango",      color:"#5c2d0a", emoji:"👜" },
];

interface Props { onOrder?: () => void; }

export default function Hero({ onOrder }: Props) {
  const { lang, dir } = useLang();
  const ff   = { fontFamily: lang === "fa" ? "Vazirmatn,sans-serif" : "DM Sans,sans-serif" };
  const isFa = lang === "fa";

  return (
    <section className="relative overflow-hidden pt-16" style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>

      {/* Blobs */}
      <div className="blob" style={{ width:650, height:650, background:"rgba(255,230,120,0.42)", top:"-15%", left:"-18%", animation:"floatY 12s ease-in-out infinite" }} />
      <div className="blob" style={{ width:500, height:500, background:"rgba(200,218,255,0.38)", top:"8%", right:"-12%", animation:"floatY 14s ease-in-out infinite reverse" }} />
      <div className="blob" style={{ width:380, height:380, background:"rgba(255,210,140,0.28)", bottom:"8%", left:"28%", animation:"floatY 16s ease-in-out infinite" }} />

      {/* Ticker */}
      <div className="overflow-hidden py-2.5 shrink-0 relative z-10"
        style={{ background:"rgba(255,255,255,0.38)", backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)", borderBottom:"1px solid rgba(255,255,255,0.72)", borderTop:"1px solid rgba(255,255,255,0.72)" }}>
        <div className="marquee-inner">
          {[...BRANDS,...BRANDS].map((b,i) => (
            <span key={i} className="mx-8 text-[9px] font-black tracking-[0.45em] shrink-0"
              style={{ color: i%3===0 ? "var(--gold)" : i%3===1 ? "rgba(27,29,56,0.38)" : "rgba(150,138,120,0.45)" }}>
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 w-full grid md:grid-cols-2 gap-12 xl:gap-20 items-center" dir={dir}>

          {/* Left */}
          <div className="fade-up">
            <div className="mb-8">
              <Image src="/logo.png" alt="Julie's Shoppe" width={360} height={90}
                style={{ filter:"invert(1) brightness(0.08)", objectFit:"contain" }} priority />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background:"rgba(255,255,255,0.68)", border:"1px solid rgba(197,144,10,0.32)", backdropFilter:"blur(14px)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background:"var(--gold)" }} />
              <span className="text-[10px] font-bold tracking-[0.32em] uppercase" style={{ color:"var(--gold)", ...ff }}>
                {isFa ? "خرید مستقیم از ترکیه" : "Direct from Turkey"}
              </span>
            </div>

            <h1 className="serif leading-tight mb-6" style={{ fontSize:"clamp(2.4rem,5vw,3.6rem)", color:"var(--ink)", fontWeight:700, letterSpacing:"-0.02em" }}>
              {isFa
                ? <>{"بهترین برندهای جهان"}<br /><span style={{ color:"var(--gold)" }}>{"از ترکیه، به ایران"}</span></>
                : <>{"World's Best Brands"}<br /><span style={{ color:"var(--gold)" }}>{"Turkey to Iran"}</span></>
              }
            </h1>

            <p className="text-sm leading-relaxed mb-10" style={{ ...ff, color:"var(--ink-2)", maxWidth:"420px", lineHeight:"1.9" }}>
              {isFa
                ? "پوشاک، کفش، الکترونیک، لوازم خانگی، ورزش، آرایشی، عینک، لوازم خودرو — هر آنچه در ترکیه است با ارسال سریع به سراسر ایران"
                : "Fashion, shoes, electronics, home, sports, beauty, eyewear, auto accessories — everything Turkey has, delivered fast to Iran"}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/brands" className="btn-gold" style={ff}>
                {isFa ? "مشاهده همه برندها" : "Browse All Brands"}
              </Link>
              <button onClick={onOrder} className="btn-glass" style={ff}>
                <ShoppingBag size={14} />
                {isFa ? "ثبت سفارش" : "Place an Order"}
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex gap-10 flex-wrap">
              {[
                { n:"45+",  l: isFa ? "برند ترکی"     : "Turkish Brands"    },
                { n:"24/7", l: isFa ? "پشتیبانی"       : "Support"           },
                { n:"15%",  l: isFa ? "کارمزد شفاف"   : "Transparent Fee"   },
              ].map((s,i) => (
                <div key={i}>
                  <p className="text-2xl font-black serif" style={{ color:"var(--ink)" }}>{s.n}</p>
                  <p className="text-xs mt-1" style={{ ...ff, color:"var(--ink-3)" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: brand grid */}
          <div className="hidden md:grid grid-cols-3 gap-3 fade-up" style={{ animationDelay:"0.15s" }}>
            {GRID.map((b,i) => (
              <div key={i}
                className="glass-card rounded-2xl aspect-square flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-2 hover:bg-[rgba(16,14,10,0.85)] group cursor-default"
                style={{ animationDelay:`${0.05*i}s`, position:"relative", overflow:"hidden" }}>
                <div className="shine-top" />
                <span style={{ fontSize:"26px" }}>{b.emoji}</span>
                <span className="text-[9px] font-black tracking-widest uppercase transition-colors duration-300"
                  style={{ color: b.color }}>{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll */}
      <div className="text-center pb-8 relative z-10 opacity-25 animate-bounce">
        <ChevronDown size={20} style={{ color:"var(--ink-3)", margin:"0 auto" }} />
      </div>

      <div className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
        style={{ background:"linear-gradient(to bottom, transparent, rgba(244,242,238,0.55))" }} />
    </section>
  );
}
