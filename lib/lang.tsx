"use client";
import React, { createContext, useContext, useState } from "react";

type Lang = "fa" | "en";

interface Translations {
  nav_featured: string; nav_videos: string; nav_new: string; nav_suggested: string; nav_order: string;
  hero_badge: string; hero_sub: string; hero_browse: string; hero_contact: string;
  section_featured_label: string; section_featured_title: string;
  section_new_label: string; section_new_title: string;
  section_suggested_label: string; section_suggested_title: string;
  videos_label: string; videos_title: string;
  card_order: string; card_view: string;
  footer_sub: string; footer_cta: string; footer_rights: string;
  tg_greeting: string; tg_product_label: string; tg_price_label: string; tg_link_label: string;
  price_original: string; price_service_fee: string; price_final: string; price_includes_fee: string;
  // Order modal
  modal_title: string; modal_name: string; modal_phone: string; modal_size: string;
  modal_note: string; modal_submit: string; modal_sending: string;
  modal_success_title: string; modal_success_msg: string;
  modal_name_ph: string; modal_phone_ph: string; modal_note_ph: string;
  modal_size_select: string; modal_close: string;
  sidebar_filter: string;
  newsletter_title: string; newsletter_sub: string; newsletter_ph: string; newsletter_btn: string;
  promo_badge: string; promo_title: string; promo_sub: string; promo_cta: string;
}

const translations: Record<Lang, Translations> = {
  fa: {
    nav_featured: "پیشنهادها", nav_videos: "ویدیوها", nav_new: "جدیدترین‌ها",
    nav_suggested: "محصولات ویژه", nav_order: "سفارش در تلگرام",
    hero_badge: "جدیدترین مد از برندهای معتبر",
    hero_sub: "برترین برندهای جهانی با ارسال سریع به سراسر ایران",
    hero_browse: "مشاهده محصولات", hero_contact: "تماس در تلگرام",
    section_featured_label: "Bestsellers", section_featured_title: "پیشنهاد ویژه",
    section_new_label: "New Arrivals",     section_new_title: "جدیدترین‌ها",
    section_suggested_label: "Curated",   section_suggested_title: "محصولات ویژه",
    videos_label: "Lookbook",             videos_title: "ویدیوهای مد",
    card_order: "استعلام قیمت روز",       card_view: "مشاهده محصول",
    footer_sub: "فروشگاه مد لوکس",
    footer_cta: "سفارش و پشتیبانی در تلگرام",
    footer_rights: "تمام حقوق محفوظ است © Julie's Shoppe 2025",
    tg_greeting: "سلام، می‌خوام این محصول رو سفارش بدم:",
    tg_product_label: "🛍 محصول", tg_price_label: "💰 قیمت نهایی", tg_link_label: "🔗 لینک",
    price_original: "قیمت اصلی", price_service_fee: "کارمزد خدمات (۱۵٪)",
    price_final: "قیمت نهایی",   price_includes_fee: "شامل ۱۵٪ کارمزد خدمات",
    modal_title: "استعلام قیمت روز",
    modal_name: "نام", modal_phone: "شماره تماس", modal_size: "سایز",
    modal_note: "توضیحات (اختیاری)", modal_submit: "ارسال درخواست",
    modal_sending: "در حال ارسال...", modal_success_title: "درخواست دریافت شد ✓",
    modal_success_msg: "سفارش شما دریافت شد و در اولین فرصت با شما ارتباط خواهیم گرفت.",
    modal_name_ph: "نام و نام خانوادگی", modal_phone_ph: "09xxxxxxxxx",
    modal_note_ph: "رنگ، توضیحات خاص...", modal_size_select: "انتخاب سایز",
    modal_close: "بستن",
    sidebar_filter: "دسته‌بندی",
    newsletter_title: "عضویت در خبرنامه",
    newsletter_sub: "اولین نفری باش که از تخفیف‌ها و محصولات جدید با خبر می‌شه",
    newsletter_ph: "ایمیل یا شماره تلگرام", newsletter_btn: "عضویت",
    promo_badge: "فرصت استثنایی", promo_title: "کلکسیون تابستان ۲۰۲۵",
    promo_sub: "تا ۳۰٪ تخفیف روی برندهای منتخب — فقط این هفته",
    promo_cta: "مشاهده محصولات تخفیف‌دار",
  },
  en: {
    nav_featured: "Featured", nav_videos: "Videos", nav_new: "New Arrivals",
    nav_suggested: "Suggested", nav_order: "Order on Telegram",
    hero_badge: "Latest fashion from top global brands",
    hero_sub: "World-class brands with fast delivery across Iran",
    hero_browse: "Browse Products", hero_contact: "Contact on Telegram",
    section_featured_label: "Bestsellers", section_featured_title: "Featured Items",
    section_new_label: "New Arrivals",     section_new_title: "Just Arrived",
    section_suggested_label: "Curated",   section_suggested_title: "Suggested Products",
    videos_label: "Lookbook",             videos_title: "Fashion Reels",
    card_order: "Inquire Price",           card_view: "View Product",
    footer_sub: "Luxury Fashion Store",
    footer_cta: "Order & Support on Telegram",
    footer_rights: "All rights reserved © Julie's Shoppe 2025",
    tg_greeting: "Hi, I'd like to order this product:",
    tg_product_label: "🛍 Product", tg_price_label: "💰 Final Price", tg_link_label: "🔗 Link",
    price_original: "Original Price", price_service_fee: "Service Fee (15%)",
    price_final: "Final Price",       price_includes_fee: "Includes 15% service fee",
    modal_title: "Inquire Daily Price",
    modal_name: "Name", modal_phone: "Phone Number", modal_size: "Size",
    modal_note: "Notes (Optional)", modal_submit: "Send Request",
    modal_sending: "Sending...", modal_success_title: "Request Received ✓",
    modal_success_msg: "Your order was received. We will contact you as soon as possible.",
    modal_name_ph: "Full name", modal_phone_ph: "09xxxxxxxxx",
    modal_note_ph: "Color, special notes...", modal_size_select: "Select Size",
    modal_close: "Close",
    sidebar_filter: "Categories",
    newsletter_title: "Join the Newsletter",
    newsletter_sub: "Be the first to know about discounts and new arrivals",
    newsletter_ph: "Email or Telegram handle", newsletter_btn: "Subscribe",
    promo_badge: "Limited Offer", promo_title: "Summer 2025 Collection",
    promo_sub: "Up to 30% off on selected brands — this week only",
    promo_cta: "Shop Discounted Items",
  },
};

interface LangContext { lang: Lang; t: Translations; toggleLang: () => void; dir: "rtl" | "ltr"; }
const LangCtx = createContext<LangContext | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fa");
  const toggleLang = () => setLang(l => l === "fa" ? "en" : "fa");
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
