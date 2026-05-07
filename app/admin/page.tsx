"use client";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/context";
import { useTheme } from "@/lib/theme";
import { Product, VideoItem, Brand, Gender, AgeGroup, GENDER_LABELS, AGE_LABELS } from "@/lib/store";
import { formatTRY, withMarkup } from "@/lib/currency";
import { Plus, Trash2, Edit2, Save, X, Video, Package, ArrowRight, AlertTriangle, ExternalLink, Sun, Moon, Tag, Film } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ff: React.CSSProperties = { fontFamily:"Vazirmatn,sans-serif" };
const STALE = 7;
const isStale = (p: Product) => !p.lastUpdated||(Date.now()-p.lastUpdated)>STALE*86400000;
const ago = (ts?:number) => !ts?"—":Math.floor((Date.now()-ts)/86400000)===0?"Today":`${Math.floor((Date.now()-ts)/86400000)}d ago`;

const GENDERS: Gender[] = ["female","male","children","unisex"];
const AGE_GROUPS: AgeGroup[] = ["all","baby","kids","teen","adult"];

const EMPTY_P: Product = { id:"",name:"",brand:"",originalPrice:0,image:"",productUrl:"",category:"featured",gender:"female",ageGroup:"adult",tag:"",lastUpdated:Date.now() };
const EMPTY_V: VideoItem = { id:"",title:"",embedUrl:"",mp4Url:"" };
const EMPTY_B: Brand = { id:"",name:"",color:"#1a1a2e",domain:"" };

type Tab = "products"|"videos"|"brands"|"settings";

export default function AdminPage() {
  const { products,videos,brands,heroVideoUrl,setHeroVideoUrl,addProduct,updateProduct,deleteProduct,addVideo,deleteVideo,addBrand,updateBrand,deleteBrand } = useStore();
  const { theme, toggle } = useTheme();
  const [tab,setTab]       = useState<Tab>("products");
  const [pForm,setPForm]   = useState<Product>(EMPTY_P);
  const [vForm,setVForm]   = useState<VideoItem>(EMPTY_V);
  const [bForm,setBForm]   = useState<Brand>(EMPTY_B);
  const [heroInput,setHeroInput] = useState(heroVideoUrl);
  const [vType,setVType]   = useState<"youtube"|"mp4">("youtube");
  const [editP,setEditP]   = useState<string|null>(null);
  const [editB,setEditB]   = useState<string|null>(null);
  const [showP,setShowP]   = useState(false);
  const [showV,setShowV]   = useState(false);
  const [showB,setShowB]   = useState(false);
  const [saved,setSaved]   = useState(false);

  useEffect(()=>{ document.documentElement.setAttribute("data-theme",theme); },[theme]);

  const stale = products.filter(isStale);

  const saveP = () => {
    if(!pForm.name||!pForm.brand||!pForm.image||!pForm.productUrl||!pForm.originalPrice) return;
    const p={...pForm,lastUpdated:Date.now()};
    editP?updateProduct({...p,id:editP}):addProduct({...p,id:Date.now().toString()});
    setPForm(EMPTY_P);setEditP(null);setShowP(false);
  };
  const startEditP = (p:Product)=>{ setPForm(p);setEditP(p.id);setShowP(true);setTab("products"); };

  const saveV = () => {
    if(!vForm.title) return;
    if(vType==="youtube"&&!vForm.embedUrl) return;
    if(vType==="mp4"&&!vForm.mp4Url) return;
    addVideo({...vForm,id:Date.now().toString()});
    setVForm(EMPTY_V);setShowV(false);
  };

  const saveB = () => {
    if(!bForm.name) return;
    editB?updateBrand({...bForm,id:editB}):addBrand({...bForm,id:Date.now().toString()});
    setBForm(EMPTY_B);setEditB(null);setShowB(false);
  };
  const startEditB = (b:Brand)=>{ setBForm(b);setEditB(b.id);setShowB(true); };

  const saveHero = ()=>{ setHeroVideoUrl(heroInput); setSaved(true); setTimeout(()=>setSaved(false),2000); };

  const cs = { background:"var(--bg2)", borderColor:"var(--border)" };
  const fs = { background:"var(--bg2)", borderColor:"var(--border2)" };
  const inp = "w-full text-sm px-3 py-2.5 rounded-xl outline-none border";
  const inpStyle = { background:"var(--bg)", borderColor:"var(--border2)", color:"var(--text)" };

  const TABS: { key:Tab; icon:React.ReactNode; label:string }[] = [
    { key:"products", icon:<Package size={14}/>, label:`محصولات (${products.length})` },
    { key:"videos",   icon:<Video size={14}/>,   label:`ویدیوها (${videos.length})` },
    { key:"brands",   icon:<Tag size={14}/>,     label:`برندها (${brands.length})` },
    { key:"settings", icon:<Film size={14}/>,    label:"تنظیمات" },
  ];

  return (
  <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
    
    <header
      className="border-b px-4 py-4 flex items-center justify-between glass"
      style={{ borderColor: "var(--border)" }}
    >
      
      <div className="flex items-center gap-3">
        <Link href="/" style={{ color: "var(--text2)" }}>
          <ArrowRight size={18} />
        </Link>

        <Image
  src="/logo.png"
  alt="Julie's Shoppe"
  width={1}
  height={1}
  className="object-contain"
  style={{
    width: "300px",
    height: "auto"
  }}
  priority
/>
      </div>

      <div className="flex items-center gap-2">
        <span
          className="text-xs px-2 py-1 rounded-lg"
          style={{ background: "var(--shine)", color: "var(--blue)" }}
        >
          Admin
        </span>

        <button
          onClick={toggle}
          className="w-8 h-8 flex items-center justify-center rounded-full border"
          style={{ borderColor: "var(--border2)", color: "var(--text2)" }}
        >
          {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
        </button>
      </div>

    </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Stale alert */}
        {stale.length>0&&(
          <div className="mb-6 p-4 rounded-2xl border" style={{ background:"var(--shine2)",borderColor:"var(--purple)" }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={14} style={{ color:"var(--purple)" }}/>
              <span className="text-xs font-bold fa" style={{ ...ff,color:"var(--purple)" }}>
                {stale.length} محصول نیاز به بروزرسانی قیمت دارد
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {stale.map(p=>(
                <button key={p.id} onClick={()=>startEditP(p)}
                  className="text-[11px] px-2 py-1 rounded-lg border fa" style={{ ...ff,color:"var(--purple)",borderColor:"var(--purple)" }}>
                  {p.brand} — {p.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-2xl w-fit glass" style={{ border:"1px solid var(--border)" }}>
          {TABS.map(tb=>(
            <button key={tb.key} onClick={()=>setTab(tb.key)}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl transition-all fa"
              style={tab===tb.key?{ background:"var(--blue)",color:"#fff",fontWeight:700,...ff }:{ color:"var(--text2)",...ff }}>
              {tb.icon}<span>{tb.label}</span>
            </button>
          ))}
        </div>

        {/* ── PRODUCTS ── */}
        {tab==="products"&&(
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base fa" style={{ ...ff,color:"var(--text2)" }}>مدیریت محصولات</h2>
              <button onClick={()=>{setPForm({...EMPTY_P,brand:brands[0]?.name||""});setEditP(null);setShowP(true);}}
                className="gradient-btn flex items-center gap-2 text-white text-sm font-bold px-4 py-2 rounded-xl fa" style={ff}>
                <Plus size={14}/>افزودن محصول
              </button>
            </div>

            {showP&&(
              <div className="p-5 mb-6 rounded-2xl border" style={fs}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-bold fa" style={{ ...ff,color:"var(--text)" }}>{editP?"ویرایش محصول":"محصول جدید"}</h3>
                  <button onClick={()=>setShowP(false)} style={{ color:"var(--text3)" }}><X size={16}/></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] mb-1.5 fa" style={{ ...ff,color:"var(--text3)" }}>نام محصول</label>
                    <input value={pForm.name} onChange={e=>setPForm({...pForm,name:e.target.value})} placeholder="Floral Dress"
                      className={inp} style={inpStyle}/>
                  </div>
                  {/* Brand */}
                  <div>
                    <label className="block text-[10px] mb-1.5 fa" style={{ ...ff,color:"var(--text3)" }}>برند</label>
                    <select value={pForm.brand} onChange={e=>setPForm({...pForm,brand:e.target.value})}
                      className={inp} style={inpStyle}>
                      {brands.map(b=><option key={b.id} value={b.name}>{b.name}</option>)}
                    </select>
                  </div>
                  {/* Gender */}
                  <div>
                    <label className="block text-[10px] mb-1.5 fa" style={{ ...ff,color:"var(--text3)" }}>جنسیت</label>
                    <select value={pForm.gender} onChange={e=>setPForm({...pForm,gender:e.target.value as Gender})}
                      className={inp+" fa"} style={{ ...inpStyle,...ff }}>
                      {GENDERS.map(g=><option key={g} value={g}>{GENDER_LABELS[g].icon} {GENDER_LABELS[g].fa}</option>)}
                    </select>
                  </div>
                  {/* Age group */}
                  <div>
                    <label className="block text-[10px] mb-1.5 fa" style={{ ...ff,color:"var(--text3)" }}>گروه سنی</label>
                    <select value={pForm.ageGroup} onChange={e=>setPForm({...pForm,ageGroup:e.target.value as AgeGroup})}
                      className={inp+" fa"} style={{ ...inpStyle,...ff }}>
                      {AGE_GROUPS.map(a=>{
                        const l=AGE_LABELS[a];
                        return <option key={a} value={a}>{l.fa}{l.range?` (${l.range})`:""}</option>;
                      })}
                    </select>
                  </div>
                  {/* URL */}
                  <div className="md:col-span-2">
                    <label className="block text-[10px] mb-1.5 fa" style={{ ...ff,color:"var(--text3)" }}>🔗 لینک محصول از سایت ترکیه</label>
                    <div className="flex gap-2">
                      <input value={pForm.productUrl} onChange={e=>setPForm({...pForm,productUrl:e.target.value})}
                        placeholder="https://www.zara.com/tr/..." dir="ltr"
                        className={`flex-1 ${inp}`} style={inpStyle}/>
                      {pForm.productUrl&&(
                        <a href={pForm.productUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center px-3 rounded-xl border"
                          style={{ borderColor:"var(--blue)",color:"var(--blue)" }}>
                          <ExternalLink size={14}/>
                        </a>
                      )}
                    </div>
                  </div>
                  {/* Price */}
                  <div>
                    <label className="block text-[10px] mb-1.5 fa" style={{ ...ff,color:"var(--text3)" }}>💰 قیمت اصلی از سایت (₺)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold" style={{ color:"var(--text3)" }}>₺</span>
                      <input type="number" value={pForm.originalPrice||""} onChange={e=>setPForm({...pForm,originalPrice:Number(e.target.value)})}
                        placeholder="1299" dir="ltr" className={`pl-8 pr-3 py-2.5 rounded-xl outline-none border w-full text-sm`} style={inpStyle}/>
                    </div>
                    {pForm.originalPrice>0&&(
                      <div className="mt-2 flex gap-3 text-[11px] p-2 rounded-xl" style={{ background:"var(--shine)" }}>
                        <span style={{ color:"var(--text2)" }}>اصلی: <b style={{ color:"var(--text)" }}>{formatTRY(pForm.originalPrice)}</b></span>
                        <span style={{ color:"var(--blue)" }}>→</span>
                        <span style={{ color:"var(--purple)" }}>+15%: <b>{formatTRY(withMarkup(pForm.originalPrice))}</b></span>
                      </div>
                    )}
                  </div>
                  {/* Tag */}
                  <div>
                    <label className="block text-[10px] mb-1.5 fa" style={{ ...ff,color:"var(--text3)" }}>برچسب (اختیاری)</label>
                    <input value={pForm.tag||""} onChange={e=>setPForm({...pForm,tag:e.target.value})} placeholder="پرفروش"
                      className={inp+" fa"} style={{ ...inpStyle,...ff }}/>
                  </div>
                  {/* Image */}
                  <div className="md:col-span-2">
                    <label className="block text-[10px] mb-1.5 fa" style={{ ...ff,color:"var(--text3)" }}>لینک تصویر</label>
                    <input value={pForm.image} onChange={e=>setPForm({...pForm,image:e.target.value})}
                      placeholder="https://images.unsplash.com/..." dir="ltr"
                      className={inp} style={inpStyle}/>
                    {pForm.image&&<img src={pForm.image} alt="preview" className="mt-2 h-24 w-20 object-cover rounded-xl border" style={{ borderColor:"var(--border)" }}/>}
                  </div>
                  {/* Category */}
                  <div>
                    <label className="block text-[10px] mb-1.5 fa" style={{ ...ff,color:"var(--text3)" }}>دسته‌بندی</label>
                    <select value={pForm.category} onChange={e=>setPForm({...pForm,category:e.target.value as Product["category"]})}
                      className={inp+" fa"} style={{ ...inpStyle,...ff }}>
                      <option value="featured">پیشنهاد ویژه</option>
                      <option value="new">جدیدترین‌ها</option>
                      <option value="suggested">محصولات ویژه</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 mt-5">
                  <button onClick={saveP} className="gradient-btn flex items-center gap-2 text-white text-sm font-bold px-5 py-2.5 rounded-xl fa" style={ff}>
                    <Save size={13}/>ذخیره
                  </button>
                  <button onClick={()=>setShowP(false)} className="text-sm px-5 py-2.5 rounded-xl border fa"
                    style={{ ...ff,borderColor:"var(--border)",color:"var(--text2)" }}>انصراف</button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {products.map(p=>{
                const b=brands.find(x=>x.name===p.brand);
                return (
                  <div key={p.id} className="flex gap-3 p-3 rounded-2xl border transition-all hover:scale-[1.01]"
                    style={{ ...cs,borderColor:isStale(p)?"var(--purple)":"var(--border)" }}>
                    <img src={p.image} alt={p.name} className="w-16 h-20 object-cover flex-shrink-0 rounded-xl"/>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded-lg text-white uppercase"
                          style={{ background:b?.color||"#1a1a2e" }}>{p.brand}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-lg"
                          style={{ background:"var(--shine)",color:"var(--blue)" }}>
                          {p.gender==="female"?"👩":p.gender==="male"?"👨":p.gender==="children"?"👶":"🧢"}
                        </span>
                        {isStale(p)&&<AlertTriangle size={10} style={{ color:"var(--purple)" }}/>}
                      </div>
                      <p className="text-sm truncate fa" style={{ ...ff,color:"var(--text)" }}>{p.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] line-through" style={{ color:"var(--text3)" }}>{formatTRY(p.originalPrice)}</span>
                        <span className="text-[11px] font-bold" style={{ color:"var(--purple)" }}>{formatTRY(withMarkup(p.originalPrice))}</span>
                      </div>
                      <p className="text-[10px] mt-0.5" style={{ color:"var(--text3)" }}>{ago(p.lastUpdated)}</p>
                      <div className="flex gap-2 mt-2">
                        <button onClick={()=>startEditP(p)}
                          className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg border fa"
                          style={{ ...ff,borderColor:"var(--border2)",color:"var(--text2)" }}>
                          <Edit2 size={10}/>ویرایش
                        </button>
                        <button onClick={()=>deleteProduct(p.id)}
                          className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg border fa"
                          style={{ ...ff,borderColor:"#330000",color:"#ff4444" }}>
                          <Trash2 size={10}/>حذف
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── VIDEOS ── */}
        {tab==="videos"&&(
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base fa" style={{ ...ff,color:"var(--text2)" }}>مدیریت ویدیوها</h2>
              <button onClick={()=>setShowV(true)} className="gradient-btn flex items-center gap-2 text-white text-sm font-bold px-4 py-2 rounded-xl fa" style={ff}>
                <Plus size={14}/>افزودن ویدیو
              </button>
            </div>
            {showV&&(
              <div className="p-5 mb-6 rounded-2xl border" style={fs}>
                <h3 className="text-sm font-bold mb-4 fa" style={{ ...ff,color:"var(--text)" }}>ویدیو جدید</h3>
                {/* Video type toggle */}
                <div className="flex gap-2 mb-4">
                  {(["youtube","mp4"] as const).map(type=>(
                    <button key={type} onClick={()=>setVType(type)}
                      className="px-4 py-2 rounded-xl text-xs font-bold"
                      style={vType===type?{ background:"var(--blue)",color:"#fff" }:{ background:"var(--shine)",color:"var(--text2)",border:"1px solid var(--border)" }}>
                      {type==="youtube"?"📺 YouTube":"🎬 MP4 URL"}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] mb-1.5 fa" style={{ ...ff,color:"var(--text3)" }}>عنوان ویدیو</label>
                    <input value={vForm.title} onChange={e=>setVForm({...vForm,title:e.target.value})} placeholder="کلکسیون تابستان"
                      className={inp+" fa"} style={{ ...inpStyle,...ff }}/>
                  </div>
                  <div>
                    <label className="block text-[10px] mb-1.5" style={{ color:"var(--text3)" }}>
                      {vType==="youtube"?"YouTube Embed URL":"MP4 Direct URL"}
                    </label>
                    <input
                      value={vType==="youtube"?vForm.embedUrl:vForm.mp4Url||""}
                      onChange={e=>vType==="youtube"?setVForm({...vForm,embedUrl:e.target.value}):setVForm({...vForm,mp4Url:e.target.value})}
                      placeholder={vType==="youtube"?"https://www.youtube.com/embed/...":"https://example.com/video.mp4"}
                      dir="ltr" className={inp} style={inpStyle}/>
                  </div>
                </div>
                {vType==="youtube"&&(
                  <p className="text-[10px] mt-2 fa" style={{ ...ff,color:"var(--text3)" }}>
                    💡 برای YouTube: روی ویدیو کلیک راست کن → Copy embed code → لینک بین src=" " را کپی کن
                  </p>
                )}
                <div className="flex gap-2 mt-4">
                  <button onClick={saveV} className="gradient-btn flex items-center gap-2 text-white text-sm font-bold px-5 py-2.5 rounded-xl fa" style={ff}>
                    <Save size={13}/>ذخیره
                  </button>
                  <button onClick={()=>setShowV(false)} className="text-sm px-5 py-2.5 rounded-xl border fa"
                    style={{ ...ff,borderColor:"var(--border)",color:"var(--text2)" }}>انصراف</button>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {videos.map(v=>(
                <div key={v.id} className="p-4 rounded-2xl border flex items-center justify-between gap-3" style={cs}>
                  <div className="min-w-0">
                    <p className="text-sm fa truncate" style={{ ...ff,color:"var(--text)" }}>{v.title}</p>
                    <p className="text-[10px] mt-0.5 px-2 py-0.5 rounded inline-block"
                      style={{ background:v.mp4Url?"var(--shine2)":"var(--shine)", color:v.mp4Url?"var(--purple)":"var(--blue)" }}>
                      {v.mp4Url?"🎬 MP4":"📺 YouTube"}
                    </p>
                    <p className="text-[11px] truncate mt-1" style={{ color:"var(--text3)" }} dir="ltr">
                      {v.mp4Url||v.embedUrl}
                    </p>
                  </div>
                  <button onClick={()=>deleteVideo(v.id)} style={{ color:"#ff4444",flexShrink:0 }}><Trash2 size={15}/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BRANDS ── */}
        {tab==="brands"&&(
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base fa" style={{ ...ff,color:"var(--text2)" }}>مدیریت برندها</h2>
              <button onClick={()=>{setBForm(EMPTY_B);setEditB(null);setShowB(true);}}
                className="gradient-btn flex items-center gap-2 text-white text-sm font-bold px-4 py-2 rounded-xl fa" style={ff}>
                <Plus size={14}/>برند جدید
              </button>
            </div>
            {showB&&(
              <div className="p-5 mb-6 rounded-2xl border" style={fs}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-bold fa" style={{ ...ff,color:"var(--text)" }}>{editB?"ویرایش برند":"برند جدید"}</h3>
                  <button onClick={()=>setShowB(false)} style={{ color:"var(--text3)" }}><X size={16}/></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] mb-1.5 fa" style={{ ...ff,color:"var(--text3)" }}>نام برند</label>
                    <input value={bForm.name} onChange={e=>setBForm({...bForm,name:e.target.value})} placeholder="Koton"
                      className={inp} style={inpStyle}/>
                  </div>
                  <div>
                    <label className="block text-[10px] mb-1.5" style={{ color:"var(--text3)" }}>Website Domain</label>
                    <input value={bForm.domain} onChange={e=>setBForm({...bForm,domain:e.target.value})} placeholder="koton.com" dir="ltr"
                      className={inp} style={inpStyle}/>
                  </div>
                  <div>
                    <label className="block text-[10px] mb-1.5 fa" style={{ ...ff,color:"var(--text3)" }}>رنگ بج برند</label>
                    <div className="flex items-center gap-3">
                      <input type="color" value={bForm.color} onChange={e=>setBForm({...bForm,color:e.target.value})}
                        className="w-12 h-10 rounded-xl border cursor-pointer" style={{ borderColor:"var(--border2)" }}/>
                      <span className="text-xs font-mono" style={{ color:"var(--text3)" }}>{bForm.color}</span>
                      <span className="text-xs px-3 py-1.5 rounded-lg text-white font-bold uppercase"
                        style={{ background:bForm.color }}>{bForm.name||"Preview"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-5">
                  <button onClick={saveB} className="gradient-btn flex items-center gap-2 text-white text-sm font-bold px-5 py-2.5 rounded-xl fa" style={ff}>
                    <Save size={13}/>ذخیره
                  </button>
                  <button onClick={()=>setShowB(false)} className="text-sm px-5 py-2.5 rounded-xl border fa"
                    style={{ ...ff,borderColor:"var(--border)",color:"var(--text2)" }}>انصراف</button>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {brands.map(b=>(
                <div key={b.id} className="p-4 rounded-2xl border flex flex-col gap-3" style={cs}>
                  <span className="text-xs font-black px-3 py-1.5 rounded-lg text-white uppercase tracking-widest self-start"
                    style={{ background:b.color }}>{b.name}</span>
                  {b.domain&&<p className="text-[11px]" style={{ color:"var(--text3)" }} dir="ltr">{b.domain}</p>}
                  <p className="text-[10px] fa" style={{ ...ff,color:"var(--text3)" }}>
                    {products.filter(p=>p.brand===b.name).length} محصول
                  </p>
                  <div className="flex gap-2">
                    <button onClick={()=>startEditB(b)} className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg border fa"
                      style={{ ...ff,borderColor:"var(--border2)",color:"var(--text2)" }}><Edit2 size={10}/>ویرایش</button>
                    <button onClick={()=>deleteBrand(b.id)} className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg border fa"
                      style={{ ...ff,borderColor:"#330000",color:"#ff4444" }}><Trash2 size={10}/>حذف</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {tab==="settings"&&(
          <div>
            <h2 className="text-base fa mb-6" style={{ ...ff,color:"var(--text2)" }}>تنظیمات سایت</h2>
            <div className="p-5 rounded-2xl border" style={fs}>
              <div className="flex items-center gap-2 mb-4">
                <Film size={16} style={{ color:"var(--blue)" }}/>
                <h3 className="text-sm font-bold fa" style={{ ...ff,color:"var(--text)" }}>ویدیوی پس‌زمینه هیرو</h3>
              </div>
              <p className="text-[11px] mb-3 fa" style={{ ...ff,color:"var(--text3)" }}>
                لینک مستقیم MP4 یا هر ویدیوی فشن را اینجا وارد کن تا در پس‌زمینه صفحه اصلی پخش شود.
              </p>
              <input value={heroInput} onChange={e=>setHeroInput(e.target.value)}
                placeholder="https://cdn.example.com/fashion.mp4" dir="ltr"
                className={inp+" mb-3"} style={inpStyle}/>
              <div className="flex gap-2">
                <button onClick={saveHero} className="gradient-btn flex items-center gap-2 text-white text-sm font-bold px-5 py-2.5 rounded-xl fa" style={ff}>
                  <Save size={13}/>{saved?"ذخیره شد! ✓":"ذخیره"}
                </button>
              </div>
              <p className="text-[10px] mt-3 fa" style={{ ...ff,color:"var(--text3)" }}>
                💡 پیشنهاد: از Coverr.co یا Pexels.com ویدیوی رایگان فشن دانلود کن، آپلود کن روی Cloudinary یا Dropbox، لینک مستقیم را اینجا وارد کن.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
