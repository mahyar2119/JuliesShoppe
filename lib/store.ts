export type Gender = "female" | "male" | "children" | "unisex";
export type AgeGroup = "all" | "baby" | "kids" | "teen" | "adult";
export type ProductCategory = "featured" | "new" | "suggested";

// ── BRAND CATEGORIES (all items sold in Turkey) ──
export type BrandCategory =
  | "all"
  | "fashion"
  | "shoes"
  | "bags"
  | "electronics"
  | "sports"
  | "beauty"
  | "home"
  | "kids"
  | "accessories"
  | "eyewear"
  | "auto"
  | "food";

export const BRAND_CATEGORIES: { key: BrandCategory; labelFa: string; labelEn: string; icon: string }[] = [
  { key: "all",         labelFa: "همه",           labelEn: "All",          icon: "✦" },
  { key: "fashion",     labelFa: "پوشاک",         labelEn: "Fashion",      icon: "👗" },
  { key: "shoes",       labelFa: "کفش",           labelEn: "Shoes",        icon: "👟" },
  { key: "bags",        labelFa: "کیف",           labelEn: "Bags",         icon: "👜" },
  { key: "electronics", labelFa: "الکترونیک",     labelEn: "Electronics",  icon: "📱" },
  { key: "sports",      labelFa: "ورزش",          labelEn: "Sports",       icon: "🏋️" },
  { key: "beauty",      labelFa: "آرایشی",        labelEn: "Beauty",       icon: "💄" },
  { key: "home",        labelFa: "خانه",          labelEn: "Home",         icon: "🏠" },
  { key: "kids",        labelFa: "کودک",          labelEn: "Kids",         icon: "🧸" },
  { key: "accessories", labelFa: "اکسسوری",       labelEn: "Accessories",  icon: "💍" },
  { key: "eyewear",     labelFa: "عینک",          labelEn: "Eyewear",      icon: "🕶️" },
  { key: "auto",        labelFa: "خودرو",         labelEn: "Auto",         icon: "🚗" },
  { key: "food",        labelFa: "غذا",           labelEn: "Food",         icon: "🍫" },
];

export type SidebarCategory = "dresses" | "shoes" | "bags" | "accessories" | "all";

export const SIDEBAR_CATEGORIES: { key: SidebarCategory; labelFa: string; labelEn: string; icon: string }[] = [
  { key: "all",         labelFa: "همه محصولات",  labelEn: "All Products",  icon: "✦" },
  { key: "dresses",     labelFa: "لباس",          labelEn: "Dresses",       icon: "👗" },
  { key: "shoes",       labelFa: "کفش",           labelEn: "Shoes",         icon: "👠" },
  { key: "bags",        labelFa: "کیف",           labelEn: "Bags",          icon: "👜" },
  { key: "accessories", labelFa: "اکسسوری",       labelEn: "Accessories",   icon: "💍" },
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

export const TELEGRAM_USERNAME = "JuliesShoppe";

export interface OrderRequest {
  id: string;
  name: string;
  phone: string;
  product: string;
  productId: string;
  size: string;
  note: string;
  date: number;
}

export interface TurkishBrand {
  id: string;
  name: string;
  nameFa: string;          // Persian brand description
  descFa: string;          // Short Persian description
  descEn: string;
  logo: string;            // emoji or first letter
  url: string;             // affiliate / direct URL
  categories: BrandCategory[];
  featured: boolean;
  color: string;           // brand accent color
  badge?: string;          // e.g. "محبوب", "جدید"
}

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
  sidebarCategory?: SidebarCategory;
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

export const GENDER_LABELS: Record<Gender, { fa: string; en: string; icon: string }> = {
  female:   { fa: "زنانه",   en: "Women",    icon: "👩" },
  male:     { fa: "مردانه",  en: "Men",      icon: "👨" },
  children: { fa: "بچگانه",  en: "Children", icon: "👶" },
  unisex:   { fa: "یونیسکس", en: "Unisex",   icon: "🧢" },
};

export const AGE_LABELS: Record<AgeGroup, { fa: string; en: string; range?: string }> = {
  all:   { fa: "همه سنین",  en: "All Ages"          },
  baby:  { fa: "نوزاد",     en: "Baby",  range: "0–2"   },
  kids:  { fa: "کودک",      en: "Kids",  range: "3–12"  },
  teen:  { fa: "نوجوان",    en: "Teen",  range: "13–18" },
  adult: { fa: "بزرگسال",  en: "Adult"              },
};

export const IRAN_HASHTAGS = [
  "#مد", "#فشن", "#استایل", "#خرید_آنلاین", "#مد_ترکیه",
  "#زارا", "#منگو", "#تایم_فروشگاه", "#لباس_زنانه", "#لباس_مردانه",
  "#پوشاک", "#ترند", "#جدیدترین_مد", "#فشن_ایران", "#خرید_از_ترکیه",
];

// ── ALL TURKISH BRANDS ──
export const turkishBrands: TurkishBrand[] = [
  // FASHION
  { id:"1",  name:"Zara",           nameFa:"زارا",           descFa:"پوشاک مد روز زنانه، مردانه و بچگانه",      descEn:"Trendy fashion for women, men & kids",       logo:"Z",  url:"https://www.zara.com/tr/",           categories:["fashion","bags","accessories"],       featured:true,  color:"#1a1a1a", badge:"پرفروش" },
  { id:"2",  name:"Mango",          nameFa:"منگو",           descFa:"مد زنانه با طراحی اروپایی",               descEn:"European-style women's fashion",             logo:"M",  url:"https://shop.mango.com/tr",          categories:["fashion","bags","accessories"],       featured:true,  color:"#2c1810", badge:"محبوب"  },
  { id:"3",  name:"H&M",            nameFa:"اچ‌اند‌ام",     descFa:"مد مقرون‌به‌صرفه برای همه",               descEn:"Affordable fashion for everyone",            logo:"H",  url:"https://www2.hm.com/tr_tr/",         categories:["fashion","kids","accessories"],       featured:true,  color:"#cc0000"                },
  { id:"4",  name:"LC Waikiki",     nameFa:"ال‌سی وایکیکی", descFa:"برند ترکی با قیمت مناسب",                 descEn:"Turkish brand with great value",             logo:"L",  url:"https://www.lcwaikiki.com/tr-TR/TR", categories:["fashion","kids","sports"],            featured:true,  color:"#e8001a", badge:"ارزان"  },
  { id:"5",  name:"Koton",          nameFa:"کوتون",          descFa:"پوشاک روزانه با کیفیت بالا",              descEn:"Quality everyday clothing",                  logo:"K",  url:"https://www.koton.com/tr/",          categories:["fashion","accessories"],             featured:false, color:"#ff6b00"                },
  { id:"6",  name:"DeFacto",        nameFa:"دفاکتو",         descFa:"مد جوانانه با قیمت عالی",                 descEn:"Youth fashion at great prices",              logo:"D",  url:"https://www.defacto.com.tr/",        categories:["fashion","kids","sports"],           featured:false, color:"#000066", badge:"جدید"   },
  { id:"7",  name:"Stradivarius",   nameFa:"استرادیواریوس",  descFa:"پوشاک ترند زنانه",                       descEn:"Trendy women's fashion",                     logo:"S",  url:"https://www.stradivarius.com/tr/",  categories:["fashion","accessories"],             featured:false, color:"#3d1a3d"                },
  { id:"8",  name:"Bershka",        nameFa:"برشکا",          descFa:"مد خیابانی جوانانه",                      descEn:"Streetwear for the young",                   logo:"B",  url:"https://www.bershka.com/tr/",       categories:["fashion","accessories"],             featured:false, color:"#1a0a2e"                },
  { id:"9",  name:"Pull&Bear",      nameFa:"پول‌اند‌بیر",   descFa:"مد کژوال و اسپرت",                       descEn:"Casual and sporty fashion",                  logo:"P",  url:"https://www.pullandbear.com/tr/",   categories:["fashion","accessories"],             featured:false, color:"#004d40"                },
  { id:"10", name:"Massimo Dutti",  nameFa:"ماسیمو دوتی",   descFa:"مد لوکس ایتالیایی",                      descEn:"Luxury Italian-style fashion",               logo:"M",  url:"https://www.massimodutti.com/tr/",  categories:["fashion","bags","accessories"],       featured:true,  color:"#2c2c2c", badge:"لوکس"   },
  { id:"11", name:"Mavi",           nameFa:"ماوی",           descFa:"جین و پوشاک دنیم ترکی",                  descEn:"Turkish denim & casual wear",                logo:"M",  url:"https://www.mavi.com/",             categories:["fashion"],                           featured:false, color:"#003580"                },
  { id:"12", name:"Trendyol",       nameFa:"ترندیول",        descFa:"بزرگ‌ترین فروشگاه آنلاین ترکیه",         descEn:"Turkey's largest online marketplace",        logo:"T",  url:"https://www.trendyol.com/",         categories:["fashion","shoes","bags","electronics","home","kids","beauty","sports","accessories"], featured:true, color:"#f27a1a", badge:"محبوب" },
  { id:"13", name:"Hepsiburada",    nameFa:"هپسی‌بوراد",    descFa:"فروشگاه آنلاین همه‌چیز ترکیه",           descEn:"Turkey's all-in-one online store",            logo:"H",  url:"https://www.hepsiburada.com/",      categories:["electronics","home","fashion","sports","auto","beauty","food"],                    featured:true, color:"#ff6000", badge:"جدید"  },
  { id:"14", name:"n11",            nameFa:"ان‌یازده",       descFa:"مارکت‌پلیس بزرگ ترکیه",                 descEn:"Major Turkish marketplace",                  logo:"N",  url:"https://www.n11.com/",              categories:["electronics","home","fashion","auto","kids"],                                    featured:false, color:"#7b0099"                },
  { id:"15", name:"GittiGidiyor",   nameFa:"گیتی‌گیدیور",   descFa:"حراجی آنلاین ترکیه",                     descEn:"Turkish online auction & marketplace",       logo:"G",  url:"https://www.gittigidiyor.com/",     categories:["electronics","auto","home","fashion"],                                           featured:false, color:"#0058a0"                },
  // SHOES
  { id:"16", name:"Nike TR",        nameFa:"نایک",           descFa:"کفش و پوشاک ورزشی نایک",                descEn:"Nike sportswear & shoes",                    logo:"N",  url:"https://www.nike.com/tr/",          categories:["shoes","sports","fashion"],          featured:true,  color:"#111111", badge:"محبوب" },
  { id:"17", name:"Adidas TR",      nameFa:"آدیداس",         descFa:"کفش و پوشاک آدیداس",                    descEn:"Adidas shoes & sportswear",                  logo:"A",  url:"https://www.adidas.com.tr/",        categories:["shoes","sports","fashion"],          featured:true,  color:"#000000"               },
  { id:"18", name:"Puma TR",        nameFa:"پوما",           descFa:"کفش و پوشاک ورزشی پوما",               descEn:"Puma sports shoes & clothing",               logo:"P",  url:"https://tr.puma.com/",              categories:["shoes","sports"],                    featured:false, color:"#e31c1c"               },
  { id:"19", name:"Reebok TR",      nameFa:"ریباک",          descFa:"کفش‌های ورزشی ریباک",                   descEn:"Reebok athletic footwear",                   logo:"R",  url:"https://www.reebok.com.tr/",        categories:["shoes","sports"],                    featured:false, color:"#cc0000"               },
  { id:"20", name:"Skechers TR",    nameFa:"اسکچرز",         descFa:"کفش راحتی و ورزشی",                     descEn:"Comfort & sport footwear",                   logo:"S",  url:"https://www.skechers.com.tr/",      categories:["shoes"],                             featured:false, color:"#002f5f"               },
  { id:"21", name:"Kinetix",        nameFa:"کینتیکس",        descFa:"کفش ورزشی ترکی",                        descEn:"Turkish athletic footwear",                  logo:"K",  url:"https://www.kinetix.com.tr/",       categories:["shoes","sports"],                    featured:false, color:"#005baa"               },
  // ELECTRONICS
  { id:"22", name:"Media Markt TR", nameFa:"مدیا مارکت",    descFa:"بزرگ‌ترین فروشگاه الکترونیک",           descEn:"Largest electronics retailer",               logo:"M",  url:"https://www.mediamarkt.com.tr/",   categories:["electronics"],                       featured:true,  color:"#cc0000", badge:"تخفیف" },
  { id:"23", name:"Teknosa",        nameFa:"تکنوسا",         descFa:"الکترونیک و لوازم دیجیتال",             descEn:"Electronics & digital products",             logo:"T",  url:"https://www.teknosa.com/",          categories:["electronics"],                       featured:false, color:"#0066cc"               },
  { id:"24", name:"Vatanbilgisayar",nameFa:"وطن‌بیلگی",      descFa:"کامپیوتر و لوازم جانبی",               descEn:"Computers & accessories",                    logo:"V",  url:"https://www.vatanbilgisayar.com/",  categories:["electronics"],                       featured:false, color:"#003d82"               },
  { id:"25", name:"Apple TR",       nameFa:"اپل ترکیه",      descFa:"محصولات اپل در ترکیه",                  descEn:"Apple products in Turkey",                   logo:"🍎", url:"https://www.apple.com/tr/",         categories:["electronics"],                       featured:true,  color:"#1d1d1f", badge:"لوکس"  },
  { id:"26", name:"Samsung TR",     nameFa:"سامسونگ",        descFa:"گوشی و لوازم الکترونیک سامسونگ",        descEn:"Samsung phones & electronics",               logo:"S",  url:"https://www.samsung.com/tr/",       categories:["electronics"],                       featured:false, color:"#1428a0"               },
  // BEAUTY
  { id:"27", name:"Sephora TR",     nameFa:"سفورا",          descFa:"آرایش و مراقبت پوست لوکس",             descEn:"Luxury beauty & skincare",                   logo:"S",  url:"https://www.sephora.com.tr/",       categories:["beauty","accessories"],              featured:true,  color:"#1a001a", badge:"محبوب" },
  { id:"28", name:"MAC Cosmetics",  nameFa:"مک کازمتیکس",   descFa:"لوازم آرایشی حرفه‌ای مک",              descEn:"Professional MAC cosmetics",                 logo:"M",  url:"https://www.maccosmetics.com.tr/", categories:["beauty"],                            featured:false, color:"#000000"               },
  { id:"29", name:"Flormar",        nameFa:"فلورمار",        descFa:"برند آرایشی ترکی",                      descEn:"Turkish cosmetics brand",                    logo:"F",  url:"https://www.flormar.com.tr/",       categories:["beauty"],                            featured:false, color:"#ff69b4"               },
  { id:"30", name:"Watsons TR",     nameFa:"واتسونز",        descFa:"داروخانه و بهداشت زیبایی",             descEn:"Pharmacy & health/beauty",                   logo:"W",  url:"https://www.watsons.com.tr/",       categories:["beauty","accessories"],              featured:false, color:"#00a651"               },
  // HOME
  { id:"31", name:"IKEA TR",        nameFa:"ایکیا",          descFa:"مبلمان و لوازم خانگی",                  descEn:"Furniture & home accessories",               logo:"I",  url:"https://www.ikea.com/tr/tr/",       categories:["home"],                              featured:true,  color:"#0051ba", badge:"محبوب" },
  { id:"32", name:"Karaca",         nameFa:"کاراجا",         descFa:"ظروف و لوازم آشپزخانه",                descEn:"Kitchen & tableware",                        logo:"K",  url:"https://www.karaca.com/",           categories:["home"],                              featured:false, color:"#8b4513"               },
  { id:"33", name:"English Home",   nameFa:"انگلیش هوم",    descFa:"دکوراسیون خانه به سبک انگلیسی",         descEn:"English-style home decoration",              logo:"E",  url:"https://www.englishhome.com/",      categories:["home"],                              featured:false, color:"#2e5090"               },
  { id:"34", name:"Vivense",        nameFa:"ویونس",          descFa:"مبل و دکوراسیون مدرن",                  descEn:"Modern furniture & decor",                   logo:"V",  url:"https://www.vivense.com/",          categories:["home"],                              featured:false, color:"#333333"               },
  { id:"35", name:"Kelebek",        nameFa:"کلبک",           descFa:"مبلمان ترکی با کیفیت",                 descEn:"Quality Turkish furniture",                  logo:"K",  url:"https://www.kelebekmobelya.com/",  categories:["home"],                              featured:false, color:"#8b0000"               },
  // SPORTS
  { id:"36", name:"Decathlon TR",   nameFa:"دکاتلون",        descFa:"تجهیزات همه ورزش‌ها",                  descEn:"All-sports equipment & clothing",             logo:"D",  url:"https://www.decathlon.com.tr/",    categories:["sports","shoes"],                    featured:true,  color:"#007dbc", badge:"جدید"  },
  { id:"37", name:"Sports Direct",  nameFa:"اسپرتس دایرکت", descFa:"پوشاک و کفش ورزشی",                    descEn:"Sports clothing & footwear",                 logo:"S",  url:"https://www.sportsdirect.com.tr/", categories:["sports","shoes"],                    featured:false, color:"#d40000"               },
  // EYEWEAR
  { id:"38", name:"Optic 2000 TR",  nameFa:"اپتیک ۲۰۰۰",   descFa:"عینک طبی و آفتابی",                     descEn:"Prescription & sunglasses",                  logo:"O",  url:"https://www.optic2000.com.tr/",    categories:["eyewear","accessories"],             featured:false, color:"#000080"               },
  { id:"39", name:"Rayban TR",      nameFa:"ری‌بن",          descFa:"عینک آفتابی لوکس ری‌بن",               descEn:"Luxury Ray-Ban sunglasses",                  logo:"R",  url:"https://www.ray-ban.com/turkey",   categories:["eyewear","accessories"],             featured:true,  color:"#cc0000", badge:"لوکس"  },
  // AUTO
  { id:"40", name:"AutoCar TR",     nameFa:"اتوکار",         descFa:"لوازم یدکی و اکسسوری خودرو",           descEn:"Car parts & accessories",                    logo:"A",  url:"https://www.autocar.com.tr/",      categories:["auto"],                              featured:false, color:"#1a3a5c"               },
  { id:"41", name:"Otokoç",         nameFa:"اتوکوچ",         descFa:"فروشگاه لوازم خودرو",                  descEn:"Car accessories & supplies",                 logo:"O",  url:"https://www.otokoc.com.tr/",       categories:["auto"],                              featured:false, color:"#cc3300"               },
  // KIDS
  { id:"42", name:"Toys R Us TR",   nameFa:"تویز آر آس",    descFa:"اسباب‌بازی و محصولات کودک",            descEn:"Toys & children's products",                 logo:"T",  url:"https://www.toysrus.com.tr/",      categories:["kids"],                              featured:false, color:"#e40075"               },
  { id:"43", name:"Babyshop",       nameFa:"بیبی‌شاپ",       descFa:"محصولات نوزاد و کودک",                 descEn:"Baby & toddler products",                    logo:"B",  url:"https://www.babyshop.com.tr/",     categories:["kids"],                              featured:false, color:"#f7941d"               },
  // FOOD / GOURMET
  { id:"44", name:"Migros TR",      nameFa:"میگروس",         descFa:"فروشگاه زنجیره‌ای مواد غذایی",         descEn:"Grocery & food supermarket",                 logo:"M",  url:"https://www.migros.com.tr/",       categories:["food","home"],                       featured:false, color:"#f47920"               },
  { id:"45", name:"Rosense",        nameFa:"روزنس",          descFa:"گلاب و محصولات طبیعی",                 descEn:"Rose water & natural products",              logo:"R",  url:"https://www.rosense.com/",         categories:["food","beauty"],                     featured:false, color:"#cc3366"               },
];

export const defaultBrands: Brand[] = [
  { id:"1",  name:"Zara",          color:"#1a1a1a", domain:"zara.com" },
  { id:"2",  name:"Mango",         color:"#2c1810", domain:"mango.com" },
  { id:"3",  name:"H&M",           color:"#cc0000", domain:"hm.com" },
  { id:"4",  name:"LC Waikiki",    color:"#e8001a", domain:"lcw.com" },
  { id:"5",  name:"Sephora",       color:"#1a001a", domain:"sephora.com.tr" },
  { id:"6",  name:"Adidas",        color:"#000000", domain:"adidas.com.tr" },
  { id:"7",  name:"Nike",          color:"#111111", domain:"nike.com" },
  { id:"8",  name:"Mavi",          color:"#003580", domain:"mavi.com" },
  { id:"9",  name:"Stradivarius",  color:"#3d1a3d", domain:"stradivarius.com" },
  { id:"10", name:"Bershka",       color:"#1a0a2e", domain:"bershka.com" },
  { id:"11", name:"Trendyol",      color:"#f27a1a", domain:"trendyol.com" },
  { id:"12", name:"DeFacto",       color:"#000066", domain:"defacto.com.tr" },
];

export const defaultProducts: Product[] = [
  { id:"1",  name:"Floral Midi Dress",  brand:"Zara",      originalPrice:1299, image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",  productUrl:"https://www.zara.com/tr/",      category:"featured",  gender:"female",   ageGroup:"adult", sidebarCategory:"dresses",     tag:"پرفروش", lastUpdated:Date.now() },
  { id:"2",  name:"Linen Blazer",       brand:"Mango",     originalPrice:899,  image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",  productUrl:"https://shop.mango.com/tr",     category:"featured",  gender:"female",   ageGroup:"adult", sidebarCategory:"dresses",     tag:"جدید",   lastUpdated:Date.now() },
  { id:"3",  name:"Air Max 270",        brand:"Nike TR",   originalPrice:3499, image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",     productUrl:"https://www.nike.com/tr/",      category:"featured",  gender:"male",     ageGroup:"adult", sidebarCategory:"shoes",       tag:"محبوب",  lastUpdated:Date.now() },
  { id:"4",  name:"Ultraboost 22",      brand:"Adidas TR", originalPrice:4299, image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",  productUrl:"https://www.adidas.com.tr/",    category:"new",       gender:"male",     ageGroup:"adult", sidebarCategory:"shoes",       tag:"تازه",   lastUpdated:Date.now() },
  { id:"5",  name:"Knit Cardigan",      brand:"H&M",       originalPrice:549,  image:"https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=600&q=80",  productUrl:"https://www2.hm.com/tr_tr/",    category:"new",       gender:"female",   ageGroup:"teen",  sidebarCategory:"dresses",     tag:"تازه",   lastUpdated:Date.now() },
  { id:"6",  name:"Wide Leg Trousers",  brand:"Zara",      originalPrice:799,  image:"https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",  productUrl:"https://www.zara.com/tr/",      category:"new",       gender:"female",   ageGroup:"adult", sidebarCategory:"dresses",                   lastUpdated:Date.now() },
  { id:"7",  name:"Leather Tote Bag",   brand:"Mango",     originalPrice:1599, image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",     productUrl:"https://shop.mango.com/tr",     category:"suggested", gender:"female",   ageGroup:"adult", sidebarCategory:"bags",        tag:"پیشنهاد",lastUpdated:Date.now() },
  { id:"8",  name:"Stan Smith",         brand:"Adidas TR", originalPrice:2199, image:"https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",     productUrl:"https://www.adidas.com.tr/",    category:"suggested", gender:"unisex",   ageGroup:"adult", sidebarCategory:"shoes",       tag:"پیشنهاد",lastUpdated:Date.now() },
  { id:"9",  name:"Kids Sneakers",      brand:"Nike TR",   originalPrice:899,  image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",     productUrl:"https://www.nike.com/tr/",      category:"featured",  gender:"children", ageGroup:"kids",  sidebarCategory:"shoes",       tag:"کودک",   lastUpdated:Date.now() },
  { id:"10", name:"Baby Romper Set",    brand:"LC Waikiki", originalPrice:349, image:"https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80",     productUrl:"https://www.lcwaikiki.com/tr-TR/TR", category:"new", gender:"children", ageGroup:"baby", sidebarCategory:"dresses",    tag:"نوزاد",  lastUpdated:Date.now() },
  { id:"11", name:"Gold Hoop Earrings", brand:"Mango",     originalPrice:299,  image:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",  productUrl:"https://shop.mango.com/tr",     category:"suggested", gender:"female",   ageGroup:"adult", sidebarCategory:"accessories", tag:"جدید",   lastUpdated:Date.now() },
  { id:"12", name:"Crossbody Mini Bag", brand:"Zara",      originalPrice:849,  image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",  productUrl:"https://www.zara.com/tr/",      category:"featured",  gender:"female",   ageGroup:"adult", sidebarCategory:"bags",        tag:"پرفروش", lastUpdated:Date.now() },
];

export const defaultVideos: VideoItem[] = [
  { id:"v1", title:"کلکسیون تابستان ۲۰۲۵", embedUrl:"https://www.youtube.com/embed/SS1tDCCMqAQ" },
  { id:"v2", title:"ست‌های روزانه",          embedUrl:"https://www.youtube.com/embed/OB8signalE8" },
  { id:"v3", title:"استایل اداری",           embedUrl:"https://www.youtube.com/embed/9No-FiEInLA" },
];
