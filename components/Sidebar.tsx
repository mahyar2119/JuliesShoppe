"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { SIDEBAR_CATEGORIES, SidebarCategory } from "@/lib/store";
import { useLang } from "@/lib/lang";

interface Props {
  active: SidebarCategory;
  onChange: (c: SidebarCategory) => void;
}

export default function Sidebar({ active, onChange }: Props) {
  const { lang, dir } = useLang();
  const [open, setOpen] = useState(true);
  const ff = { fontFamily: lang === "fa" ? "Vazirmatn,sans-serif" : "Sora,sans-serif" };
  const isRtl = dir === "rtl";

  return (
    <aside
      className="hidden lg:flex flex-col transition-all duration-300 ease-in-out shrink-0"
      style={{ width: open ? "220px" : "60px" }}
    >
      <div
        className="sticky top-24 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(10,10,30,0.7)",
          border: "1px solid rgba(79,124,255,0.15)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          {open && (
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)", ...ff }}>
              {lang === "fa" ? "دسته‌بندی" : "Categories"}
            </span>
          )}
          {!open && <SlidersHorizontal size={14} style={{ color: "rgba(255,255,255,0.4)", margin: "0 auto" }} />}
          <button
            onClick={() => setOpen(o => !o)}
            className="w-6 h-6 rounded-lg flex items-center justify-center transition-all hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.4)", marginRight: open ? "0" : "auto", marginLeft: open ? "0" : "auto" }}
          >
            {open
              ? (isRtl ? <ChevronRight size={14} /> : <ChevronLeft size={14} />)
              : (isRtl ? <ChevronLeft size={14} /> : <ChevronRight size={14} />)
            }
          </button>
        </div>

        {/* Categories */}
        <div className="p-2 space-y-1">
          {SIDEBAR_CATEGORIES.map(cat => {
            const isActive = active === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => onChange(cat.key)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                style={{
                  background: isActive ? "linear-gradient(135deg, rgba(79,124,255,0.2), rgba(155,92,255,0.2))" : "transparent",
                  border: isActive ? "1px solid rgba(155,92,255,0.3)" : "1px solid transparent",
                  color: isActive ? "#c4a0ff" : "rgba(255,255,255,0.45)",
                  justifyContent: open ? (isRtl ? "flex-end" : "flex-start") : "center",
                  flexDirection: isRtl && open ? "row-reverse" : "row",
                }}
                title={lang === "fa" ? cat.labelFa : cat.labelEn}
              >
                <span className="text-base shrink-0">{cat.icon}</span>
                {open && (
                  <span className="text-xs font-semibold" style={ff}>
                    {lang === "fa" ? cat.labelFa : cat.labelEn}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
