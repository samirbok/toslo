import { getLocale } from "./i18n/server";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { homeTitle, homeDescription, pageMetadata, siteUrl } from "./seo";
import BusinessJsonLd from "./business-json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata(homeTitle, homeDescription, ""),
  keywords: [
    "delivery Agadir", "livraison Agadir", "livreur Agadir",
    "service de livraison à Agadir", "delivery Taghazout", "delivery Tamraght",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale() ?? "en";
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth motion-reduce:scroll-auto antialiased`}
    >
      <body className="min-h-full flex flex-col"><BusinessJsonLd />{children}</body>
    </html>
  );
}
