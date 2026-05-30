export type Gender = "female" | "male" | "children" | "unisex";
export type AgeGroup = "all" | "baby" | "kids" | "teen" | "adult";
export type ProductCategory = "featured" | "new" | "suggested";

export interface Product {
  id: string;
  name: string;
  brand: string;
  originalPrice: number;
  image: string;
  productUrl: string;
  category: ProductCategory;
  gender: Gender;
  ageGroup: AgeGroup;
  tag?: string;
  lastUpdated?: number;
}

export interface VideoItem {
  id: string;
  title: string;
  embedUrl: string;
  mp4Url?: string;
}

export interface Brand {
  id: string;
  name: string;
  color: string;
  domain: string;
}

// ⚠️ مهم: username تلگرام خودت رو اینجا بذار (بدون @)
export const TELEGRAM_USERNAME = "julies_shoppe"; // <-- عوض کن

export const GENDER_LABELS: Record<Gender, { fa: string; en: string; icon: string }> = {
  female:   { fa: "زنانه",   en: "Women",    icon: "👩" },
  male:     { fa: "مردانه",  en: "Men",      icon: "👨" },
  children: { fa: "بچگانه",  en: "Children", icon: "👶" },
  unisex:   { fa: "یونیسکس", en: "Unisex",   icon: "🧢" },
};

export const AGE_LABELS: Record<AgeGroup, { fa: string; en: string; range?: string }> = {
  all:   { fa: "همه سنین",  en: "All Ages"              },
  baby:  { fa: "نوزاد",     en: "Baby",   range: "0–2"  },
  kids:  { fa: "کودک",      en: "Kids",   range: "3–12" },
  teen:  { fa: "نوجوان",    en: "Teen",   range: "13–18"},
  adult: { fa: "بزرگسال",  en: "Adult"                  },
};

export const IRAN_HASHTAGS = [
  "#مد", "#فشن", "#استایل", "#خرید_آنلاین", "#مد_ترکیه",
  "#زارا", "#منگو", "#لباس_زنانه", "#لباس_مردانه",
  "#پوشاک", "#ترند", "#جدیدترین_مد", "#فشن_ایران", "#خرید_از_ترکیه",
  "#استایل_روز", "#لباس_بچگانه", "#برند", "#شیک", "#اینستاگرام_مد",
];

export const defaultBrands: Brand[] = [
  { id:"1",  name:"Zara",          color:"#0d0d2e", domain:"zara.com" },
  { id:"2",  name:"Mango",         color:"#2d1b69", domain:"mango.com" },
  { id:"3",  name:"H&M",           color:"#1a0a2e", domain:"hm.com" },
  { id:"4",  name:"LC Waikiki",    color:"#0a1a3e", domain:"lcw.com" },
  { id:"5",  name:"Sephora",       color:"#1a0020", domain:"sephora.com.tr" },
  { id:"6",  name:"Adidas",        color:"#0a0a0a", domain:"adidas.com.tr" },
  { id:"7",  name:"Nike",          color:"#0a1800", domain:"nike.com" },
  { id:"8",  name:"Mavi",          color:"#001a3e", domain:"mavi.com" },
  { id:"9",  name:"Stradivarius",  color:"#1a1a2e", domain:"stradivarius.com" },
  { id:"10", name:"Bershka",       color:"#1a002e", domain:"bershka.com" },
  { id:"11", name:"Pull&Bear",     color:"#001a2e", domain:"pullandbear.com" },
  { id:"12", name:"Koton",         color:"#1a0a00", domain:"koton.com" },
  { id:"13", name:"DeFacto",       color:"#0a001a", domain:"defacto.com.tr" },
  { id:"14", name:"Trendyol",      color:"#2e1a00", domain:"trendyol.com" },
  { id:"15", name:"Massimo Dutti", color:"#1a1a1a", domain:"massimodutti.com" },
  { id:"16", name:"Other",         color:"#1a1a2e", domain:"" },
];

// ✅ محصولات خالی — از admin اضافه کن
export const defaultProducts: Product[] = [];

export const defaultVideos: VideoItem[] = [];
