import { getLocale } from "./i18n/server";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toslo | Local delivery in Agadir",
  description: "Local delivery in Agadir with Toslo. Parcels, meals, shopping and business deliveries.",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
