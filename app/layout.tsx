import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/context";
import { LangProvider } from "@/lib/lang";
import { ThemeProvider } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Julie's Shoppe | فروشگاه مد",
  description: "برترین برندهای ترکیه با ارسال به ایران",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Julie's Shoppe",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600;700&family=Vazirmatn:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#05050f" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#f0f0ff" media="(prefers-color-scheme: light)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <ThemeProvider>
          <LangProvider>
            <StoreProvider>{children}</StoreProvider>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
