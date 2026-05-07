"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, VideoItem, Brand, OrderRequest, defaultProducts, defaultVideos, defaultBrands } from "./store";

interface StoreContext {
  products: Product[]; videos: VideoItem[]; brands: Brand[];
  orders: OrderRequest[];
  heroVideoUrl: string; setHeroVideoUrl: (u: string) => void;
  addProduct: (p: Product) => void; updateProduct: (p: Product) => void; deleteProduct: (id: string) => void;
  addVideo: (v: VideoItem) => void; deleteVideo: (id: string) => void;
  addBrand: (b: Brand) => void; updateBrand: (b: Brand) => void; deleteBrand: (id: string) => void;
  saveOrder: (o: OrderRequest) => void;
}
const Ctx = createContext<StoreContext | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [videos,   setVideos]   = useState<VideoItem[]>(defaultVideos);
  const [brands,   setBrands]   = useState<Brand[]>(defaultBrands);
  const [orders,   setOrders]   = useState<OrderRequest[]>([]);
  const [heroVideoUrl, setHeroVideoUrlState] = useState("https://cdn.coverr.co/videos/coverr-a-model-walking-on-a-runway-1591/1080p.mp4");

  useEffect(() => {
    try {
      const p = localStorage.getItem("js_products"); if (p) setProducts(JSON.parse(p));
      const v = localStorage.getItem("js_videos");   if (v) setVideos(JSON.parse(v));
      const b = localStorage.getItem("js_brands");   if (b) setBrands(JSON.parse(b));
      const h = localStorage.getItem("js_hero");     if (h) setHeroVideoUrlState(h);
      const o = localStorage.getItem("js_orders");   if (o) setOrders(JSON.parse(o));
    } catch {}
  }, []);

  const persist = (p: Product[], v: VideoItem[], b: Brand[]) => {
    localStorage.setItem("js_products", JSON.stringify(p));
    localStorage.setItem("js_videos",   JSON.stringify(v));
    localStorage.setItem("js_brands",   JSON.stringify(b));
  };

  const setHeroVideoUrl = (u: string) => { setHeroVideoUrlState(u); localStorage.setItem("js_hero", u); };
  const addProduct    = (p: Product)   => { const u = [...products, p];                 setProducts(u); persist(u, videos, brands); };
  const updateProduct = (p: Product)   => { const u = products.map(x => x.id===p.id?p:x); setProducts(u); persist(u, videos, brands); };
  const deleteProduct = (id: string)   => { const u = products.filter(x => x.id!==id); setProducts(u); persist(u, videos, brands); };
  const addVideo      = (v: VideoItem) => { const u = [...videos, v];                  setVideos(u);   persist(products, u, brands); };
  const deleteVideo   = (id: string)   => { const u = videos.filter(x => x.id!==id);  setVideos(u);   persist(products, u, brands); };
  const addBrand      = (b: Brand)     => { const u = [...brands, b];                  setBrands(u);   persist(products, videos, u); };
  const updateBrand   = (b: Brand)     => { const u = brands.map(x => x.id===b.id?b:x); setBrands(u); persist(products, videos, u); };
  const deleteBrand   = (id: string)   => { const u = brands.filter(x => x.id!==id);  setBrands(u);   persist(products, videos, u); };
  const saveOrder = (o: OrderRequest)  => {
    const u = [o, ...orders]; setOrders(u);
    try { localStorage.setItem("js_orders", JSON.stringify(u)); } catch {}
  };

  return (
    <Ctx.Provider value={{ products, videos, brands, orders, heroVideoUrl, setHeroVideoUrl, addProduct, updateProduct, deleteProduct, addVideo, deleteVideo, addBrand, updateBrand, deleteBrand, saveOrder }}>
      {children}
    </Ctx.Provider>
  );
}
export const useStore = () => { const c = useContext(Ctx); if (!c) throw new Error("no StoreProvider"); return c; };
