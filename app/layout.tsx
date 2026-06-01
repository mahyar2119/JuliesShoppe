import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/context";
import { LangProvider } from "@/lib/lang";
import { ThemeProvider } from "@/lib/theme";


export const metadata: Metadata = {
  title: "Julie's Shoppe | خرید از ترکیه",
  description: "خرید آنلاین از بهترین برندهای ترکیه با ارسال سریع به ایران",
  keywords: "خرید از ترکیه, برند ترکی, زارا, منگو, آدیداس, نایک, ترندیول, مد ایران",
  openGraph: { title: "Julie's Shoppe", description: "بهترین برندهای ترکیه با ارسال به ایران", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Vazirmatn:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#f7f5f2" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Julie's Shoppe" />
      </head>
      <body>
        <ThemeProvider><LangProvider><StoreProvider>{children}</StoreProvider></LangProvider></ThemeProvider>
      </body>
    </html>
  );
}