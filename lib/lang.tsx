"use client";

import React, { createContext, useContext, useState } from "react";

type Lang = "fa" | "en";

interface Translations {
  nav_featured: string;
  nav_videos: string;
  nav_new: string;
  nav_suggested: string;
  nav_order: string;
  hero_badge: string;
  hero_sub: string;
  hero_browse: string;
  hero_contact: string;
  section_featured_label: string;
  section_featured_title: string;
  section_new_label: string;
  section_new_title: string;
  section_suggested_label: string;
  section_suggested_title: string;
  videos_label: string;
  videos_title: string;
  card_order: string;
  card_view: string;
  footer_sub: string;
  footer_cta: string;
  footer_rights: string;
  promo_badge: string;
  promo_title: string;
  promo_sub: string;
  promo_cta: string;
  tg_greeting: string;
  tg_product_label: string;
  tg_price_label: string;
  tg_link_label: string;
  // Price labels
  price_original: string;
  price_service_fee: string;
  price_final: string;
  price_includes_fee: string;
}

const translations: Record<Lang, Translations> = {
  fa: {
    nav_featured: "پیشنهادها",
    nav_videos: "ویدیوها",
    nav_new: "جدیدترین‌ها",
    nav_suggested: "محصولات ویژه",
    nav_order: "سفارش در تلگرام",
    hero_badge: "جدیدترین مد از برندهای معتبر",
    hero_sub: "برترین برندهای جهانی با ارسال سریع به سراسر ایران",
    hero_browse: "مشاهده محصولات",
    hero_contact: "تماس در تلگرام",
    section_featured_label: "Bestsellers",
    section_featured_title: "پیشنهاد ویژه",
    section_new_label: "New Arrivals",
    section_new_title: "جدیدترین‌ها",
    section_suggested_label: "Curated for you",
    section_suggested_title: "محصولات ویژه",
    videos_label: "Lookbook",
    videos_title: "ویدیوهای مد",
    card_order: "سفارش در تلگرام",
    card_view: "مشاهده محصول",
    footer_sub: "فروشگاه مد لوکس",
    footer_cta: "سفارش و پشتیبانی در تلگرام",
    footer_rights: "تمام حقوق محفوظ است © Julie's Shoppe 2025",
    promo_badge: "پیشنهاد ویژه",
    promo_title: "تا ۳۰٪ تخفیف روی برندهای منتخب",
    promo_sub: "همین الان سفارش بده",
    promo_cta: "سفارش در تلگرام",
    tg_greeting: "سلام، می‌خوام این محصول رو سفارش بدم:",
    tg_product_label: "🛍 محصول",
    tg_price_label: "💰 قیمت نهایی",
    tg_link_label: "🔗 لینک",
    price_original: "قیمت اصلی",
    price_service_fee: "کارمزد خدمات (۱۵٪)",
    price_final: "قیمت نهایی",
    price_includes_fee: "شامل ۱۵٪ کارمزد خدمات",
  },
  en: {
    nav_featured: "Featured",
    nav_videos: "Videos",
    nav_new: "New Arrivals",
    nav_suggested: "Suggested",
    nav_order: "Order on Telegram",
    hero_badge: "Latest fashion from top global brands",
    hero_sub: "World-class brands with fast delivery across Iran",
    hero_browse: "Browse Products",
    hero_contact: "Contact on Telegram",
    section_featured_label: "Bestsellers",
    section_featured_title: "Featured Items",
    section_new_label: "New Arrivals",
    section_new_title: "Just Arrived",
    section_suggested_label: "Curated for you",
    section_suggested_title: "Suggested Products",
    videos_label: "Lookbook",
    videos_title: "Fashion Reels",
    card_order: "Order on Telegram",
    card_view: "View Product",
    footer_sub: "Luxury Fashion Store",
    footer_cta: "Order & Support on Telegram",
    footer_rights: "All rights reserved © Julie's Shoppe 2025",
    promo_badge: "Special Offer",
    promo_title: "Up to 30% off selected brands",
    promo_sub: "Order now and save",
    promo_cta: "Order on Telegram",
    tg_greeting: "Hi, I'd like to order this product:",
    tg_product_label: "🛍 Product",
    tg_price_label: "💰 Final Price",
    tg_link_label: "🔗 Link",
    price_original: "Original Price",
    price_service_fee: "Service Fee (15%)",
    price_final: "Final Price",
    price_includes_fee: "Includes 15% service fee",
  },
};

interface LangContext {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
  dir: "rtl" | "ltr";
}

const LangCtx = createContext<LangContext | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fa");
  const toggleLang = () => setLang((l) => (l === "fa" ? "en" : "fa"));
  return (
    <LangCtx.Provider value={{ lang, t: translations[lang], toggleLang, dir: lang === "fa" ? "rtl" : "ltr" }}>
      {children}
    </LangCtx.Provider>
  );
}

export const useLang = () => {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be inside LangProvider");
  return ctx;
};
