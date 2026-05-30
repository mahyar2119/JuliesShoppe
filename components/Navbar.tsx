"use client";
import { useState } from "react";
import { Send, Menu, X, Sun, Moon } from "lucide-react";
import { TELEGRAM_USERNAME } from "@/lib/store";
import { useLang } from "@/lib/lang";
import { useTheme } from "@/lib/theme";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, lang, toggleLang, dir } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const fa = { fontFamily: "Vazirmatn, sans-serif" };
  const en = { fontFamily: "DM Sans, sans-serif" };
  const ff = lang === "fa" ? fa : en;

  const links = [
    { label: t.nav_featured, href: "#featured" },
    { label: t.nav_videos, href: "#videos" },
    { label: t.nav_new, href: "#new" },
    { label: t.nav_suggested, href: "#suggested" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 theme-transition"
      style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", backdropFilter: "blur(20px)" }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between" dir={dir}>
        
        {/* Logo */}
        <Image src="/logo.png" alt="Julie's Shoppe" width={120} height={32} className="object-contain" priority
          style={{ filter: theme === "light" ? "invert(1) brightness(0.3)" : "brightness(1)" }} />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm transition-colors hover:opacity-100 opacity-60"
              style={{ ...ff, color: "var(--text)" }}>{l.label}</a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme toggle */}
          <button onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full border transition-all hover:scale-110"
            style={{ borderColor: "var(--border2)", color: "var(--text2)", background: "var(--bg2)" }}>
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          {/* Lang toggle */}
          <button onClick={toggleLang}
            className="text-[11px] font-bold px-3 py-1.5 rounded border transition-all"
            style={{ borderColor: "var(--border2)", color: "var(--text2)", background: "var(--bg2)" }}>
            {lang === "fa" ? "EN" : "FA"}
          </button>
          {/* Telegram CTA */}
          <a href={`https://t.me/${TELEGRAM_USERNAME}`} target="_blank" rel="noopener noreferrer"
            className="gradient-btn flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded text-white transition-all"
            style={ff}>
            <Send size={12} />{t.nav_order}
          </a>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleTheme} className="w-8 h-8 flex items-center justify-center rounded-full border"
            style={{ borderColor: "var(--border)", color: "var(--text2)" }}>
            {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
          </button>
          <button onClick={toggleLang} className="text-[10px] font-bold border px-2 py-1.5"
            style={{ borderColor: "var(--border2)", color: "var(--text2)" }}>
            {lang === "fa" ? "EN" : "FA"}
          </button>
          <button className="p-1" style={{ color: "var(--text)" }} onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 py-4 flex flex-col gap-4 border-t"
          style={{ background: "var(--bg2)", borderColor: "var(--border)" }} dir={dir}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm opacity-80" style={{ ...ff, color: "var(--text)" }}
              onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href={`https://t.me/${TELEGRAM_USERNAME}`} target="_blank" rel="noopener noreferrer"
            className="gradient-btn flex items-center justify-center gap-2 text-sm font-bold py-3 rounded text-white" style={ff}>
            <Send size={14} />{t.nav_order}
          </a>
        </div>
      )}
    </header>
  );
}
