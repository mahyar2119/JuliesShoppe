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

/* NavLink — handles its own hover so inline style doesn't block it */
function NavLink({
  href, label, active, ff,
}: {
  href: string; label: string; active: boolean; ff: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...ff,
        color:       hovered ? "var(--accent)" : active ? "var(--ink)" : "var(--ink-3)",
        fontWeight:  hovered ? 700 : active ? 600 : 400,
        fontSize:    "13px",
        textDecoration: "none",
        paddingBottom: "2px",
        borderBottom: hovered
          ? "2px solid var(--accent)"
          : active
          ? "2px solid var(--ink)"
          : "2px solid transparent",
        transition: "color 0.15s, border-color 0.15s, font-weight 0.10s",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Link>
  );
}

export default function Navbar({ searchValue = "", onSearch, activePage }: Props) {
  const [open,       setOpen]       = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [showMSearch, setShowMS]    = useState(false);
  const [showOrder,  setShowOrder]  = useState(false);
  const [langHover,  setLangHover]  = useState(false);
  const [orderHover, setOrderHover] = useState(false);

  const { lang, toggleLang, dir } = useLang();
  const ff   = { fontFamily: lang === "fa" ? "Vazirmatn,sans-serif" : "Sora,sans-serif" };
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

  return (
    <>
      {showOrder && <OrderModal onClose={() => setShowOrder(false)} />}

      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background:         scrolled ? "rgba(247,245,242,0.96)" : "rgba(247,245,242,0.82)",
          borderBottom:       "1px solid rgba(0,0,0,0.08)",
          backdropFilter:     "blur(12px) saturate(110%)",
          WebkitBackdropFilter: "blur(12px) saturate(110%)",
          boxShadow:          scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
        }}
      >
        {/* Accent top line */}
        <div style={{ height: "1.5px", background: "linear-gradient(90deg,transparent,rgba(31,60,136,0.40),transparent)" }} />

        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4" style={{ height: "62px" }} dir={dir}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <Image
              src="/logo.png"
              alt="Julie's Shoppe"
              width={110}
              height={28}
              style={{ filter: "invert(1) brightness(0.06)", objectFit: "contain" }}
              priority
            />
          </Link>

          {/* Desktop Search */}
          {onSearch && (
            <div className="hidden lg:block flex-1 max-w-xs mx-2">
              <div className="search-wrap px-3 gap-2">
                <Search size={13} style={{ color: "var(--ink-3)", flexShrink: 0 }} />
                <input
                  value={searchValue}
                  onChange={e => onSearch(e.target.value)}
                  placeholder={isFa ? "جستجو..." : "Search brands & products..."}
                  dir={dir}
                  className="search-input"
                  style={{ ...ff, fontSize: "13px" }}
                />
                {searchValue && (
                  <button onClick={() => onSearch("")} style={{ color: "var(--ink-3)", flexShrink: 0 }}>
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 shrink-0 ml-auto">
            {links.map(l => (
              <NavLink
                key={l.key}
                href={l.href}
                label={l.label}
                active={activePage === l.key}
                ff={ff}
              />
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              onMouseEnter={() => setLangHover(true)}
              onMouseLeave={() => setLangHover(false)}
              style={{
                ...ff,
                fontSize:    "11px",
                fontWeight:  langHover ? 700 : 500,
                letterSpacing: "0.06em",
                padding:     "6px 12px",
                background:  langHover ? "rgba(31,60,136,0.07)" : "rgba(255,255,255,0.55)",
                border:      `1px solid ${langHover ? "var(--accent)" : "rgba(0,0,0,0.10)"}`,
                color:       langHover ? "var(--accent)" : "var(--ink-2)",
                cursor:      "pointer",
                transition:  "all 0.16s",
              }}
            >
              {lang === "fa" ? "EN" : "FA"}
            </button>

            {/* Order button */}
            <button
              onClick={() => setShowOrder(true)}
              onMouseEnter={() => setOrderHover(true)}
              onMouseLeave={() => setOrderHover(false)}
              style={{
                ...ff,
                display:      "inline-flex",
                alignItems:   "center",
                gap:          7,
                padding:      "8px 18px",
                fontSize:     "12px",
                fontWeight:   orderHover ? 700 : 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background:   orderHover ? "var(--navy)" : "var(--accent)",
                color:        "#fff",
                border:       "none",
                cursor:       "pointer",
                transition:   "background 0.16s, font-weight 0.10s",
              }}
            >
              <ShoppingBag size={13} />
              {isFa ? "ثبت سفارش" : "Place Order"}
            </button>
          </div>

          {/* Mobile icons */}
          <div className="lg:hidden flex items-center gap-3 mr-auto">
            {onSearch && (
              <button onClick={() => setShowMS(s => !s)} style={{ color: "var(--ink-2)" }}>
                <Search size={18} />
              </button>
            )}
            <button onClick={() => setShowOrder(true)} style={{ color: "var(--accent)" }}>
              <ShoppingBag size={18} />
            </button>
            <button onClick={() => setOpen(!open)} style={{ color: "var(--ink)" }}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {showMSearch && onSearch && (
          <div className="lg:hidden px-5 pb-3">
            <div className="search-wrap px-3 gap-2">
              <Search size={13} style={{ color: "var(--ink-3)" }} />
              <input
                value={searchValue}
                onChange={e => onSearch(e.target.value)}
                placeholder={isFa ? "جستجو..." : "Search..."}
                dir={dir}
                autoFocus
                className="search-input"
                style={{ ...ff, fontSize: "13px" }}
              />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {open && (
          <div style={{
            background:     "rgba(247,245,242,0.98)",
            backdropFilter: "blur(12px)",
            borderTop:      "1px solid rgba(0,0,0,0.07)",
          }}>
            <div className="px-5 py-4 space-y-0.5" dir={dir}>
              {links.map(l => (
                <MobileNavLink
                  key={l.key}
                  href={l.href}
                  label={l.label}
                  active={activePage === l.key}
                  ff={ff}
                  onClick={() => setOpen(false)}
                />
              ))}
              <div className="pt-3 flex gap-2" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                <button
                  onClick={toggleLang}
                  className="flex-1 py-2.5 text-xs font-semibold transition-all"
                  style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.10)", color: "var(--ink-2)", ...ff }}
                >
                  {lang === "fa" ? "English" : "فارسی"}
                </button>
                <button
                  onClick={() => { setOpen(false); setShowOrder(true); }}
                  className="btn-accent flex-1 justify-center py-2.5 text-xs"
                  style={ff}
                >
                  <ShoppingBag size={12} />
                  {isFa ? "ثبت سفارش" : "Order"}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

/* Mobile nav link with hover state */
function MobileNavLink({
  href, label, active, ff, onClick,
}: {
  href: string; label: string; active: boolean; ff: React.CSSProperties; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...ff,
        display:    "flex",
        padding:    "12px 16px",
        fontSize:   "14px",
        color:      hovered ? "var(--accent)" : active ? "var(--accent)" : "var(--ink-2)",
        fontWeight: hovered || active ? 700 : 400,
        background: hovered ? "rgba(31,60,136,0.05)" : "transparent",
        textDecoration: "none",
        transition: "background 0.15s, color 0.15s, font-weight 0.10s",
        borderRadius: 4,
      }}
    >
      {label}
    </Link>
  );
}