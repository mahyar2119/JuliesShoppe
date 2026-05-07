"use client";
import { useState, useEffect } from "react";
import { Send, Menu, X, Search, ShoppingBag } from "lucide-react";
import { TELEGRAM_USERNAME } from "@/lib/store";
import { useLang } from "@/lib/lang";
import Image from "next/image";
import Link from "next/link";
import OrderModal from "./OrderModal";

interface Props {
  searchValue?: string;
  onSearch?: (v: string) => void;
  activePage?: string;
}

export default function Navbar({ searchValue = "", onSearch, activePage }: Props) {
  const [open, setOpen]           = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [showMSearch, setShowMS]  = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const { lang, toggleLang, dir } = useLang();
  const ff  = { fontFamily: lang === "fa" ? "Vazirmatn,sans-serif" : "Sora,sans-serif" };
  const isFa = lang === "fa";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: isFa ? "خانه"      : "Home",     href: "/",         key: "home"     },
    { label: isFa ? "برندها"    : "Brands",   href: "/brands",   key: "brands"   },
    { label: isFa ? "محصولات"   : "Products", href: "/products", key: "products" },
    { label: isFa ? "درباره ما" : "About",    href: "/about",    key: "about"    },
  ];

  const lStyle = (key: string): React.CSSProperties => ({
    ...ff,
    color: activePage === key ? "var(--ink)" : "var(--ink-3)",
    fontWeight: activePage === key ? 600 : 400,
    fontSize: "13px",
    textDecoration: "none",
    paddingBottom: "2px",
    borderBottom: activePage === key ? "2px solid var(--accent)" : "2px solid transparent",
    transition: "color 0.16s, border-color 0.16s",
    whiteSpace: "nowrap",
  });

  return (
    <>
      {showOrder && <OrderModal onClose={() => setShowOrder(false)} />}

      <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(248,249,251,0.94)" : "rgba(248,249,251,0.80)",
          borderBottom: "1px solid rgba(220,228,240,0.70)",
          backdropFilter: "blur(28px) saturate(160%)",
          WebkitBackdropFilter: "blur(28px) saturate(160%)",
          boxShadow: scrolled ? "0 2px 20px rgba(13,35,64,0.06)" : "none",
        }}>

        {/* Accent top line */}
        <div style={{ height: "1.5px", background: "linear-gradient(90deg,transparent,rgba(26,108,186,0.40),rgba(26,143,106,0.30),transparent)" }} />

        <div className="max-w-7xl mx-auto px-5 flex items-center gap-4" style={{ height: "60px" }} dir={dir}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <Image src="/logo.png" alt="Julie's Shoppe" width={140} height={36}
              style={{filter: "none", background: "white" }} priority />
          </Link>
 
          {/* Desktop Search */}
          {onSearch && (
            <div className="hidden lg:block flex-1 max-w-xs mx-2">
              <div className="search-wrap px-3 gap-2">
                <Search size={13} style={{ color: "var(--ink-3)", flexShrink: 0 }} />
                <input value={searchValue} onChange={e => onSearch(e.target.value)}
                  placeholder={isFa ? "جستجو..." : "Search brands & products..."}
                  dir={dir} className="search-input" style={{ ...ff, fontSize: "13px" }} />
                {searchValue && <button onClick={() => onSearch("")} style={{ color: "var(--ink-3)", flexShrink: 0 }}><X size={12} /></button>}
              </div>
            </div>
          )}

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 shrink-0 ml-auto">
            {links.map(l => (
              <Link key={l.key} href={l.href} style={lStyle(l.key)}
                className="hover:!text-[var(--ink)]">{l.label}</Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button onClick={toggleLang}
              className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-all hover:bg-white/80"
              style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(180,200,224,0.40)", color: "var(--ink-2)" }}>
              {lang === "fa" ? "EN" : "FA"}
            </button>
            <button onClick={() => setShowOrder(true)} className="btn-accent text-xs" style={ff}>
              <ShoppingBag size={13} />
              {isFa ? "ثبت سفارش" : "Place Order"}
            </button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-2.5 mr-auto">
            {onSearch && <button onClick={() => setShowMS(s => !s)} style={{ color: "var(--ink-2)" }}><Search size={18} /></button>}
            <button onClick={() => setShowOrder(true)} style={{ color: "var(--accent)" }}><ShoppingBag size={18} /></button>
            <button onClick={() => setOpen(!open)} style={{ color: "var(--ink)" }}>{open ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>

        {/* Mobile search */}
        {showMSearch && onSearch && (
          <div className="lg:hidden px-5 pb-3">
            <div className="search-wrap px-3 gap-2">
              <Search size={13} style={{ color: "var(--ink-3)" }} />
              <input value={searchValue} onChange={e => onSearch(e.target.value)}
                placeholder={isFa ? "جستجو..." : "Search..."} dir={dir} autoFocus
                className="search-input" style={{ ...ff, fontSize: "13px" }} />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {open && (
          <div style={{ background: "rgba(248,249,251,0.97)", backdropFilter: "blur(28px)", borderTop: "1px solid rgba(220,228,240,0.60)" }}>
            <div className="px-5 py-4 space-y-0.5" dir={dir}>
              {links.map(l => (
                <Link key={l.key} href={l.href} onClick={() => setOpen(false)}
                  className="flex px-4 py-3 rounded-xl text-sm transition-all hover:bg-white/70"
                  style={{ ...ff, color: activePage === l.key ? "var(--accent)" : "var(--ink-2)", fontWeight: activePage === l.key ? 600 : 400, textDecoration: "none" }}>
                  {l.label}
                </Link>
              ))}
              <div className="pt-3 flex gap-2" style={{ borderTop: "1px solid rgba(180,200,224,0.30)" }}>
                <button onClick={toggleLang} className="flex-1 py-2.5 rounded-xl text-xs font-semibold"
                  style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(180,200,224,0.4)", color: "var(--ink-2)" }}>
                  {lang === "fa" ? "English" : "فارسی"}
                </button>
                <button onClick={() => { setOpen(false); setShowOrder(true); }}
                  className="btn-accent flex-1 justify-center py-2.5 text-xs" style={ff}>
                  <ShoppingBag size={12} />{isFa ? "ثبت سفارش" : "Order"}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
