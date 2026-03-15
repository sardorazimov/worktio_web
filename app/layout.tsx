/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; // Plus Jakarta yerine endüstri standardı Inter
import "./globals.css";

import ComingSoonModal from "../components/shared/ComingSoonModal";
import { ThemeProvider } from "../components/provider/theme-provider";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

// SaaS dünyasının en temiz fontu
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Kod blokları ve teknik detaylar için
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://worktio.com"),
  title: {
    default: "Worktio — Advanced AI Automation Platform",
    template: "%s | Worktio",
  },
  description: "Automate all your business workflows with our Visual Flow Builder and AI Agents. Featuring GPT-4o powered agents and real-time execution.",
  keywords: ["automation", "flow builder", "AI agent", "n8n alternative", "GPT-4o", "gmail automation", "webhook", "worktio", "saas"],
  authors: [{ name: "Worktio" }],
  creator: "Worktio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://worktio.com",
    siteName: "Worktio",
    title: "Worktio — Advanced AI Automation Platform",
    description: "Automate all your business workflows with our Visual Flow Builder and AI Agents.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Worktio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Worktio — Advanced AI Automation Platform",
    description: "Automate all your business workflows with our Visual Flow Builder and AI Agents.",
    images: ["/og-image.png"],
    creator: "@worktio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSiteLocked = true;
  
  // Dil ayarlarını sunucudan çekiyoruz
  const locale = await getLocale();
  const messages = await getMessages();

  // Arapça için sağdan sola (RTL) zırhı
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    // ZIRH 1: lang özelliği dinamik oldu, virgüllü katliam bitti
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head />
      <body
        className={`
          ${inter.variable} ${jetBrainsMono.variable} 
          font-sans antialiased 
          selection:bg-purple-500 selection:text-white
        `}
      >
        {/* ZIRH 2: i18n çevirileri için sarmalayıcı (Bunu unutmuştun) */}
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* {isSiteLocked && <ComingSoonModal />} */}
            {children}
            {/* <Footer /> */}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}