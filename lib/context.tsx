"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, VideoItem, Brand, defaultProducts, defaultVideos, defaultBrands, TELEGRAM_USERNAME as DEFAULT_TG } from "./store";

interface StoreContext {
  products: Product[]; videos: VideoItem[]; brands: Brand[];
  heroVideoUrl: string; setHeroVideoUrl: (u: string) => void;
  telegramUsername: string; setTelegramUsername: (u: string) => void;
  addProduct: (p: Product) => void; updateProduct: (p: Product) => void; deleteProduct: (id: string) => void;
  addVideo: (v: VideoItem) => void; deleteVideo: (id: string) => void;
  addBrand: (b: Brand) => void; updateBrand: (b: Brand) => void; deleteBrand: (id: string) => void;
}
const Ctx = createContext<StoreContext | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts]           = useState<Product[]>(defaultProducts);
  const [videos, setVideos]               = useState<VideoItem[]>(defaultVideos);
  const [brands, setBrands]               = useState<Brand[]>(defaultBrands);
  const [heroVideoUrl, setHeroUrlState]   = useState("https://cdn.coverr.co/videos/coverr-a-model-walking-on-a-runway-1591/1080p.mp4");
  const [telegramUsername, setTgState]    = useState(DEFAULT_TG);

  useEffect(() => {
    try {
      const p = localStorage.getItem("js_products"); if (p) setProducts(JSON.parse(p));
      const v = localStorage.getItem("js_videos");   if (v) setVideos(JSON.parse(v));
      const b = localStorage.getItem("js_brands");   if (b) setBrands(JSON.parse(b));
      const h = localStorage.getItem("js_hero");     if (h) setHeroUrlState(h);
      const t = localStorage.getItem("js_telegram"); if (t) setTgState(t);
    } catch {}
  }, []);

  const persist = (p: Product[], v: VideoItem[], b: Brand[]) => {
    localStorage.setItem("js_products", JSON.stringify(p));
    localStorage.setItem("js_videos",   JSON.stringify(v));
    localStorage.setItem("js_brands",   JSON.stringify(b));
  };

  const setHeroVideoUrl      = (u: string) => { setHeroUrlState(u); localStorage.setItem("js_hero", u); };
  const setTelegramUsername  = (u: string) => { setTgState(u);      localStorage.setItem("js_telegram", u); };

  const addProduct    = (p: Product)   => { const u=[...products,p];                  setProducts(u); persist(u,videos,brands); };
  const updateProduct = (p: Product)   => { const u=products.map(x=>x.id===p.id?p:x); setProducts(u); persist(u,videos,brands); };
  const deleteProduct = (id: string)   => { const u=products.filter(x=>x.id!==id);    setProducts(u); persist(u,videos,brands); };
  const addVideo      = (v: VideoItem) => { const u=[...videos,v];                     setVideos(u);   persist(products,u,brands); };
  const deleteVideo   = (id: string)   => { const u=videos.filter(x=>x.id!==id);       setVideos(u);   persist(products,u,brands); };
  const addBrand      = (b: Brand)     => { const u=[...brands,b];                     setBrands(u);   persist(products,videos,u); };
  const updateBrand   = (b: Brand)     => { const u=brands.map(x=>x.id===b.id?b:x);   setBrands(u);   persist(products,videos,u); };
  const deleteBrand   = (id: string)   => { const u=brands.filter(x=>x.id!==id);       setBrands(u);   persist(products,videos,u); };

  return (
    <Ctx.Provider value={{ products, videos, brands, heroVideoUrl, setHeroVideoUrl, telegramUsername, setTelegramUsername, addProduct, updateProduct, deleteProduct, addVideo, deleteVideo, addBrand, updateBrand, deleteBrand }}>
      {children}
    </Ctx.Provider>
  );
}
export const useStore = () => { const c = useContext(Ctx); if (!c) throw new Error("no StoreProvider"); return c; };
