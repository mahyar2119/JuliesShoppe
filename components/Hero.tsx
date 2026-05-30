"use client";
import { Send, ChevronDown, Sparkles } from "lucide-react";
import { TELEGRAM_USERNAME } from "@/lib/store";
import { useLang } from "@/lib/lang";
import { useStore } from "@/lib/context";
import Image from "next/image";

const TICKER = ["ZARA","MANGO","NIKE","ADIDAS","TRENDYOL","H&M","LC WAİKİKİ","SEPHORA","MAVİ","STRADIVARIUS","BERSHKA","PULL&BEAR","KOTON","DeFACTO"];

export default function Hero() {
  const { t, lang, dir } = useLang();
  const { heroVideoUrl } = useStore();
  const ff = { fontFamily: lang==="fa"?"Vazirmatn,sans-serif":"DM Sans,sans-serif" };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">

      {/* ── BACKGROUND VIDEO ── */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-25"
          src={heroVideoUrl} />
        <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom, var(--bg)/70 0%, transparent 40%, var(--bg)/90 80%, var(--bg) 100%)" }} />
        {/* Colour blobs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-[100px] opacity-20"
          style={{ background:"var(--blue)", animation:"float 7s ease-in-out infinite" }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[80px] opacity-15"
          style={{ background:"var(--purple)", animation:"float 9s ease-in-out infinite reverse" }} />
      </div>

      {/* ── TICKER ── */}
      <div className="absolute top-16 inset-x-0 overflow-hidden z-10 py-2.5 glass"
        style={{ borderLeft:"none", borderRight:"none", borderRadius:0 }}>
        <div className="marquee-inner flex gap-10 whitespace-nowrap w-max">
          {[...TICKER,...TICKER].map((b,i)=>(
            <span key={i} className="text-[10px] tracking-[0.35em] font-bold"
              style={{ color: i%3===0?"var(--blue)":i%3===1?"var(--purple)":"var(--text3)" }}>{b}</span>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto fade-up" dir={dir}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 glass"
          style={{ color:"var(--blue)" }}>
          <Sparkles size={12}/>
          <span className="text-[10px] font-bold tracking-widest uppercase" style={ff}>{t.hero_badge}</span>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-8 float">
          <Image src="/logo.png" alt="Julie's Shoppe" width={280} height={70} className="object-contain"
            style={{ filter:"drop-shadow(0 0 40px rgba(79,124,255,0.5)) drop-shadow(0 0 80px rgba(155,92,255,0.3))" }}/>
        </div>

        <p className="text-base md:text-lg mb-10 leading-relaxed" style={{ ...ff, color:"var(--text2)" }}>
          {t.hero_sub}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#products" className="gradient-btn px-8 py-3.5 rounded-xl font-bold text-sm text-white glow-blue" style={ff}>
            {t.hero_browse}
          </a>
          <a href={`https://t.me/${TELEGRAM_USERNAME}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105 glass"
            style={{ ...ff, color:"var(--purple)", border:"1px solid var(--purple)" }}>
            <Send size={14}/>{t.hero_contact}
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 md:gap-10 max-w-lg mx-auto">
          {[
            { n:"15+",  l: lang==="fa"?"برند ترکیه":"Turkish Brands" },
            { n:"+15%", l: lang==="fa"?"سود شفاف":"Transparent Markup" },
            { n:"24/7", l: lang==="fa"?"پشتیبانی":"Support" },
          ].map((s,i)=>(
            <div key={i} className="glass rounded-xl p-3 text-center">
              <p className="text-2xl font-bold gradient-text">{s.n}</p>
              <p className="text-[11px] mt-1 opacity-50" style={ff}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-40">
        <ChevronDown size={22} style={{ color:"var(--text2)" }}/>
      </div>
    </section>
  );
}
