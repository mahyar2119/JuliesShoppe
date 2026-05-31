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

export type BrandCategory = "all" | "fashion" | "shoes" | "bags" | "electronics" | "sports" | "beauty" | "home" | "kids" | "accessories" | "eyewear" | "auto" | "food";

export interface TurkishBrand {
  id: string; name: string; nameFa: string; descFa: string; descEn: string;
  logo: string; url: string; categories: BrandCategory[]; featured: boolean; color?: string;
}

export const BRAND_CATEGORIES = [
  { key: "all" as BrandCategory,         labelFa: "همه",       labelEn: "All",         icon: "🛍" },
  { key: "fashion" as BrandCategory,     labelFa: "پوشاک",     labelEn: "Fashion",     icon: "👗" },
  { key: "shoes" as BrandCategory,       labelFa: "کفش",       labelEn: "Shoes",       icon: "👟" },
  { key: "bags" as BrandCategory,        labelFa: "کیف",       labelEn: "Bags",        icon: "👜" },
  { key: "beauty" as BrandCategory,      labelFa: "زیبایی",    labelEn: "Beauty",      icon: "💄" },
  { key: "sports" as BrandCategory,      labelFa: "ورزش",      labelEn: "Sports",      icon: "⚽" },
  { key: "kids" as BrandCategory,        labelFa: "کودک",      labelEn: "Kids",        icon: "🧒" },
  { key: "electronics" as BrandCategory, labelFa: "الکترونیک", labelEn: "Electronics", icon: "📱" },
  { key: "home" as BrandCategory,        labelFa: "خانه",      labelEn: "Home",        icon: "🏠" },
  { key: "accessories" as BrandCategory, labelFa: "اکسسوری",   labelEn: "Accessories", icon: "💍" },
  { key: "eyewear" as BrandCategory,     labelFa: "عینک",      labelEn: "Eyewear",     icon: "🕶" },
  { key: "auto" as BrandCategory,        labelFa: "خودرو",     labelEn: "Auto",        icon: "🚗" },
  { key: "food" as BrandCategory,        labelFa: "غذا",       labelEn: "Food",        icon: "🍕" },
];

export const turkishBrands: TurkishBrand[] = [
  { id:"1",  name:"Zara",          nameFa:"زارا",          descFa:"مد روز اروپایی",           descEn:"European fashion",        logo:"https://logo.clearbit.com/zara.com",          url:"https://www.zara.com/tr",         categories:["fashion","bags"],  color:"#1a1a2e", featured:true  },
  { id:"2",  name:"Mango",         nameFa:"منگو",          descFa:"استایل مدرن",              descEn:"Modern style",            logo:"https://logo.clearbit.com/mango.com",         url:"https://www.mango.com/tr",        categories:["fashion","bags"],  color:"#2d1b69", featured:true  },
  { id:"3",  name:"H&M",           nameFa:"اچ اند ام",     descFa:"مد مقرون به صرفه",        descEn:"Affordable fashion",      logo:"https://logo.clearbit.com/hm.com",            url:"https://www.hm.com/tr",           categories:["fashion","kids"],  color:"#1a0a2e", featured:true  },
  { id:"4",  name:"LC Waikiki",    nameFa:"ال سی وایکیکی", descFa:"برند ترکیه ای",           descEn:"Turkish brand",           logo:"https://logo.clearbit.com/lcw.com",           url:"https://www.lcw.com",             categories:["fashion","kids"],  color:"#0a1a3e", featured:true  },
  { id:"5",  name:"Nike",          nameFa:"نایک",          descFa:"کفش و پوشاک ورزشی",       descEn:"Sports and footwear",     logo:"https://logo.clearbit.com/nike.com",          url:"https://www.nike.com/tr",         categories:["shoes","sports"],  color:"#0a1800", featured:true  },
  { id:"6",  name:"Adidas",        nameFa:"آدیداس",        descFa:"برند ورزشی جهانی",        descEn:"Global sports brand",     logo:"https://logo.clearbit.com/adidas.com",        url:"https://www.adidas.com.tr",       categories:["shoes","sports"],  color:"#0a0a0a", featured:true  },
  { id:"7",  name:"Sephora",       nameFa:"سفورا",         descFa:"لوازم آرایشی لوکس",       descEn:"Luxury beauty",           logo:"https://logo.clearbit.com/sephora.com",       url:"https://www.sephora.com.tr",      categories:["beauty"],          color:"#1a0020", featured:true  },
  { id:"8",  name:"Mavi",          nameFa:"ماوی",          descFa:"دنیم ترکیه ای",           descEn:"Turkish denim",           logo:"https://logo.clearbit.com/mavi.com",          url:"https://www.mavi.com",            categories:["fashion"],         color:"#001a3e", featured:false },
  { id:"9",  name:"Bershka",       nameFa:"برشکا",         descFa:"مد خیابانی جوان",         descEn:"Youth street fashion",    logo:"https://logo.clearbit.com/bershka.com",       url:"https://www.bershka.com/tr",      categories:["fashion"],         color:"#1a002e", featured:false },
  { id:"10", name:"Stradivarius",  nameFa:"استرادیواریوس", descFa:"مد زنانه ظریف",           descEn:"Feminine fashion",        logo:"https://logo.clearbit.com/stradivarius.com",  url:"https://www.stradivarius.com/tr", categories:["fashion"],         color:"#1a1a2e", featured:false },
  { id:"11", name:"Pull&Bear",     nameFa:"پول اند بر",    descFa:"کژوال و راحت",            descEn:"Casual and comfy",        logo:"https://logo.clearbit.com/pullandbear.com",   url:"https://www.pullandbear.com/tr",  categories:["fashion","shoes"], color:"#001a2e", featured:false },
  { id:"12", name:"Koton",         nameFa:"کوتون",         descFa:"مد روزانه ترکیه ای",      descEn:"Turkish daily fashion",   logo:"https://logo.clearbit.com/koton.com",         url:"https://www.koton.com",           categories:["fashion"],         color:"#1a0a00", featured:false },
  { id:"13", name:"DeFacto",       nameFa:"دفاکتو",        descFa:"مد خانوادگی",             descEn:"Family fashion",          logo:"https://logo.clearbit.com/defacto.com.tr",    url:"https://www.defacto.com.tr",      categories:["fashion","kids"],  color:"#0a001a", featured:false },
  { id:"14", name:"Trendyol",      nameFa:"ترندیول",       descFa:"بزرگترین فروشگاه ترکیه", descEn:"Largest Turkish store",   logo:"https://logo.clearbit.com/trendyol.com",      url:"https://www.trendyol.com",        categories:["fashion","bags"],  color:"#2e1a00", featured:false },
  { id:"15", name:"Massimo Dutti", nameFa:"ماسیمو دوتی",   descFa:"مد لوکس اروپایی",        descEn:"Luxury European fashion", logo:"https://logo.clearbit.com/massimodutti.com",  url:"https://www.massimodutti.com/tr", categories:["fashion"],         color:"#1a1a1a", featured:false },
];
