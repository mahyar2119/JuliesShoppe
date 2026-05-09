"use client";
import { useState, useEffect } from "react";
import { Menu, X, Search, ShoppingBag } from "lucide-react";
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
    const fn = () => setScrolled(window.scrollY > 20);
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
    fontWeight: activePage === key ? 500 : 400,
    fontSize: "12px",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    textDecoration: "none",
    paddingBottom: "3px",
    borderBottom: activePage === key ? "1px solid var(--ink)" : "1px solid transparent",
    transition: "color 0.18s, border-color 0.18s",
    whiteSpace: "nowrap",
  });

  return (
    <>
      {showOrder && <OrderModal onClose={() => setShowOrder(false)} />}

      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-400"
        style={{
          background: scrolled ? "rgba(247,245,242,0.96)" : "rgba(247,245,242,0.80)",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
          backdropFilter: "blur(12px) saturate(110%)",
          WebkitBackdropFilter: "blur(12px) saturate(110%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-6" style={{ height: "64px" }} dir={dir}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <Image
              src="/logo.png"
              alt="Julie's Shoppe"
              width={110}
              height={28}
              style={{ filter: "invert(1) brightness(0.05)", objectFit: "contain" }}
              priority
            />
          </Link>

          {/* Desktop Search */}
          {onSearch && (
            <div className="hidden lg:block flex-1 max-w-xs mx-4">
              <div className="search-wrap px-3 gap-2">
                <Search size={12} style={{ color: "var(--ink-3)", flexShrink: 0 }} />
                <input
                  value={searchValue}
                  onChange={e => onSearch(e.target.value)}
                  placeholder={isFa ? "جستجو..." : "Search..."}
                  dir={dir}
                  className="search-input"
                  style={{ ...ff, fontSize: "12px" }}
                />
                {searchValue && (
                  <button onClick={() => onSearch("")} style={{ color: "var(--ink-3)", flexShrink: 0 }}>
                    <X size={11} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 shrink-0 ml-auto">
            {links.map(l => (
              <Link key={l.key} href={l.href} style={lStyle(l.key)}
                className="hover:!text-[var(--ink)]">{l.label}</Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={toggleLang}
              style={{
                ...ff,
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "6px 12px",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--ink-2)",
                cursor: "pointer",
                transition: "border-color 0.18s, color 0.18s",
              }}
            >
              {lang === "fa" ? "EN" : "FA"}
            </button>
            <button
              onClick={() => setShowOrder(true)}
              className="btn-accent"
              style={{ ...ff, fontSize: "11px", padding: "8px 18px" }}
            >
              <ShoppingBag size={12} />
              {isFa ? "ثبت سفارش" : "Order"}
            </button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-3 mr-auto">
            {onSearch && (
              <button onClick={() => setShowMS(s => !s)} style={{ color: "var(--ink-2)" }}>
                <Search size={17} />
              </button>
            )}
            <button onClick={() => setShowOrder(true)} style={{ color: "var(--ink)" }}>
              <ShoppingBag size={17} />
            </button>
            <button onClick={() => setOpen(!open)} style={{ color: "var(--ink)" }}>
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {showMSearch && onSearch && (
          <div className="lg:hidden px-6 pb-4">
            <div className="search-wrap px-3 gap-2">
              <Search size={12} style={{ color: "var(--ink-3)" }} />
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
            background: "rgba(247,245,242,0.98)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid var(--border)",
          }}>
            <div className="px-6 py-5 space-y-1" dir={dir}>
              {links.map(l => (
                <Link
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    ...ff,
                    display: "flex",
                    padding: "12px 0",
                    fontSize: "13px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: activePage === l.key ? "var(--accent)" : "var(--ink-2)",
                    fontWeight: activePage === l.key ? 500 : 400,
                    textDecoration: "none",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {l.label}
                </Link>
              ))}
              <div className="pt-4 flex gap-2">
                <button
                  onClick={toggleLang}
                  style={{
                    flex: 1, padding: "11px",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    fontSize: "11px", fontWeight: 500,
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    color: "var(--ink-2)", cursor: "pointer",
                  }}
                >
                  {lang === "fa" ? "English" : "فارسی"}
                </button>
                <button
                  onClick={() => { setOpen(false); setShowOrder(true); }}
                  className="btn-accent flex-1 justify-center"
                  style={{ ...ff, fontSize: "11px", padding: "11px" }}
                >
                  <ShoppingBag size={12} />
                  {isFa ? "سفارش" : "Order"}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}