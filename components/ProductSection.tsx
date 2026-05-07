"use client";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/store";
import { useLang } from "@/lib/lang";

interface Props { id: string; label: string; title: string; products: Product[]; }

export default function ProductSection({ id, label, title, products }: Props) {
  const { lang } = useLang();
  const ff = { fontFamily: lang === "fa" ? "Vazirmatn, sans-serif" : "DM Sans, sans-serif" };
  if (!products.length) return null;
  return (
    <section id={id} className="py-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <p className="text-[10px] tracking-[0.5em] uppercase font-bold mb-3 gradient-text">{label}</p>
        <h2 className="section-title text-3xl md:text-4xl font-bold" style={{ color: "var(--text)", ...ff }}>{title}</h2>
        <div className="w-16 h-0.5 mx-auto mt-4 rounded" style={{ background: "linear-gradient(90deg, var(--blue), var(--purple))" }} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
