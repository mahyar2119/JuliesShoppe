"use client";
import { Send } from "lucide-react";
import { TELEGRAM_USERNAME } from "@/lib/store";
import { useLang } from "@/lib/lang";
import Image from "next/image";
import { useTheme } from "@/lib/theme";

export default function Footer() {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const ff = { fontFamily: lang === "fa" ? "Vazirmatn, sans-serif" : "DM Sans, sans-serif" };

  return (
    <footer className="border-t py-14 px-4" style={{ borderColor: "var(--border)", background: "var(--bg2)" }}>
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="Julie's Shoppe" width={150} height={38} className="object-contain opacity-70"
            style={{ filter: theme === "light" ? "invert(1) brightness(0.3)" : "brightness(1) drop-shadow(0 0 20px rgba(79,124,255,0.3))" }} />
        </div>
        <p className="text-xs mb-6" style={{ ...ff, color: "var(--text3)" }}>{t.footer_sub}</p>
        <a href={`https://t.me/${TELEGRAM_USERNAME}`} target="_blank" rel="noopener noreferrer"
          className="gradient-btn inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded text-white transition-all glow-purple"
          style={ff}>
          <Send size={14} />{t.footer_cta}
        </a>
        <div className="mt-10 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ ...ff, color: "var(--text3)" }}>{t.footer_rights}</p>
        </div>
      </div>
    </footer>
  );
}
