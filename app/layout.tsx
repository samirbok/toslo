import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { homeTitle, homeDescription, pageMetadata, siteUrl } from "./seo";
import BusinessJsonLd from "./business-json-ld";
import { LanguageVisit } from "./language-picker";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth motion-reduce:scroll-auto antialiased`}
    >
      <body className="min-h-full flex flex-col"><BusinessJsonLd /><LanguageVisit>{children}</LanguageVisit></body>
    </html>
  );
}
