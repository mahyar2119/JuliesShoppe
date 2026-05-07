"use client";
import { useStore } from "@/lib/context";
import { useLang } from "@/lib/lang";
import { Play } from "lucide-react";
import { useState } from "react";

export default function VideoSection() {
  const { videos } = useStore();
  const { t, lang } = useLang();
  const [active, setActive] = useState<string|null>(null);
  const ff = { fontFamily: lang==="fa"?"Vazirmatn,sans-serif":"DM Sans,sans-serif" };
  if (!videos.length) return null;

  return (
    <section id="videos" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <p className="text-[10px] tracking-[0.5em] uppercase font-bold mb-3 gradient-text">{t.videos_label}</p>
        <h2 className="section-title text-3xl md:text-4xl font-bold" style={{ ...ff, color:"var(--text)" }}>{t.videos_title}</h2>
        <div className="w-16 h-0.5 mx-auto mt-4 rounded" style={{ background:"linear-gradient(90deg,var(--blue),var(--purple))" }}/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map(v=>(
          <div key={v.id} className="relative aspect-video overflow-hidden rounded-2xl shimmer-border glass-card">
            {active===v.id ? (
              v.mp4Url ? (
                <video src={v.mp4Url} autoPlay controls className="w-full h-full object-cover"/>
              ) : (
                <iframe src={`${v.embedUrl}?autoplay=1`} title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen className="w-full h-full"/>
              )
            ) : (
              <div className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={()=>setActive(v.id)}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110 glow-blue"
                    style={{ background:"linear-gradient(135deg,var(--blue),var(--purple))" }}>
                    <Play size={22} fill="white" className="text-white ml-1"/>
                  </div>
                  <p className="text-sm font-medium" style={{ ...ff, color:"var(--text)" }}>{v.title}</p>
                  {v.mp4Url && <p className="text-[10px] mt-1" style={{ color:"var(--text3)" }}>MP4</p>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
