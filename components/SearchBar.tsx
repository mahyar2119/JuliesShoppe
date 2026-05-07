"use client";
import { Search, X } from "lucide-react";
import { useLang } from "@/lib/lang";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  const { lang } = useLang();
  const ff = { fontFamily: lang==="fa"?"Vazirmatn,sans-serif":"DM Sans,sans-serif" };
  const placeholder = lang==="fa" ? "جستجوی محصول، برند..." : "Search product, brand...";

  return (
    <div className="relative max-w-xl mx-auto">
      <div className="glass rounded-2xl flex items-center px-4 py-3 gap-3 glow-blue transition-all focus-within:glow-blue"
        style={{ border:"1px solid var(--glass-border)" }}>
        <Search size={16} style={{ color:"var(--blue)", flexShrink:0 }}/>
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          dir={lang==="fa"?"rtl":"ltr"}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ ...ff, color:"var(--text)" }}
        />
        {value && (
          <button onClick={() => onChange("")} className="opacity-50 hover:opacity-100 transition-opacity">
            <X size={14} style={{ color:"var(--text2)" }}/>
          </button>
        )}
      </div>
    </div>
  );
}
