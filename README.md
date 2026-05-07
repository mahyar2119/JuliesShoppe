<<<<<<< HEAD
# JuliesShoppe
=======
# Julie's Shoppe — فروشگاه مد لوکس

A luxury Persian-market fashion e-commerce platform built with Next.js 16, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Configuration

### Telegram Bot (Order System)

Create a `.env.local` file:

```env
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_bot_token_here
NEXT_PUBLIC_TELEGRAM_CHAT_ID=your_chat_id_here
```

**How to get these:**
1. Message [@BotFather](https://t.me/BotFather) → `/newbot` → copy the token
2. Add your bot to a group → send a message → visit `https://api.telegram.org/bot<TOKEN>/getUpdates` → copy `chat.id`

Also update `TELEGRAM_USERNAME` in `lib/store.ts` to your bot's username.

---

## 📁 Project Structure

```
fashion-store/
├── app/
│   ├── page.tsx          ← Homepage with sidebar, sections, newsletter
│   ├── layout.tsx        ← Root layout with SEO metadata
│   ├── globals.css       ← Luxury dark gold theme
│   └── admin/page.tsx    ← Admin panel (products, videos, brands)
├── components/
│   ├── Navbar.tsx        ← Sticky navbar with integrated search
│   ├── Hero.tsx          ← Fullscreen hero with background video
│   ├── ProductCard.tsx   ← Card with "استعلام قیمت روز" modal CTA
│   ├── OrderModal.tsx    ← Luxury order inquiry modal ← NEW
│   ├── Sidebar.tsx       ← Collapsible category sidebar ← NEW
│   ├── PromoBanner.tsx   ← Gold promotional banner ← NEW
│   ├── Newsletter.tsx    ← Newsletter signup section ← NEW
│   ├── CategoryFilter.tsx← Gender/age filter tabs
│   ├── VideoSection.tsx  ← Lookbook video grid
│   ├── Footer.tsx        ← Footer with Telegram CTA
│   └── InstagramCard.tsx ← Instagram story generator
├── lib/
│   ├── store.ts          ← Data types, products, brands
│   ├── context.tsx       ← Global store with order persistence
│   ├── lang.tsx          ← FA/EN translations
│   ├── theme.tsx         ← Dark/light theme provider
│   ├── currency.ts       ← Price formatting (TRY + 15% markup)
│   └── telegram.ts       ← Telegram bot integration ← NEW
└── public/
    └── logo.png
```

---

## 🛍 Order Flow

1. Customer clicks **"استعلام قیمت روز"** on any product card
2. Luxury modal opens with form: نام، شماره تماس، سایز، توضیحات
3. On submit → sends to Telegram bot → order saved to localStorage
4. Success screen with direct Telegram chat link

---

## 🎨 Design System

- **Theme:** Dark luxury — black (#05050f), gold (#d4af37), purple (#9b5cff)
- **Fonts:** Playfair Display (headings) + DM Sans (English) + Vazirmatn (Persian)
- **Animations:** CSS shimmer borders, float, marquee ticker, fade-up

---

## 📊 Customer Storage

Orders are saved to `localStorage` under key `js_orders`. Each entry:

```json
{
  "id": "1234567890",
  "name": "علی محمدی",
  "phone": "09123456789",
  "product": "Floral Midi Dress",
  "productId": "1",
  "size": "M",
  "note": "رنگ آبی",
  "date": 1234567890000
}
```

Access orders in the admin panel at `/admin`.

---

## 🔧 Extending

- **Add products:** Admin panel at `/admin` → Products tab
- **Add sidebar categories:** Edit `SIDEBAR_CATEGORIES` in `lib/store.ts`, add `sidebarCategory` to products
- **Change markup %:** Edit `withMarkup` call in `lib/currency.ts`
>>>>>>> 9654e93 (initial commit)
