import type { Metadata } from "next";
import type { Locale } from "./i18n/translations";

export const siteUrl = "https://www.delivery-agadir.com";
export const homeDescription = "Toslo, service de livraison rapide à Agadir. Livraison de repas, colis, courses et commandes à Agadir et alentours.";

const sharingImage = {
  url: `${siteUrl}/images/img3.png`,
  alt: "Livreur Toslo à une porte avec un sac de livraison vert Toslo",
};

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates },
    openGraph: {
      type: "website",
      siteName: "Toslo",
      title,
      description,
      url,
      images: [sharingImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [sharingImage],
    },
  };
}

export const languageAlternates = {
  ar: `${siteUrl}/ar`,
  fr: `${siteUrl}/fr`,
  en: `${siteUrl}/en`,
  "x-default": `${siteUrl}/`,
};

export const localizedSeo: Record<Locale, { title: string; description: string; serviceType: string }> = {
  ar: {
    title: "توسلو – توصيل في أكادير",
    description: "توسلو خدمة التوصيل في أكادير لتوصيل الطرود والطعام والمشتريات. خدمة سريعة مع سائقين محليين للأفراد والشركات، وطلب سهل عبر واتساب.",
    serviceType: "توصيل الطرود والطعام والوثائق والمشتريات والطلبات المحلية",
  },
  fr: {
    title: "Toslo | Livreur & Service de Livraison à Agadir",
    description: homeDescription,
    serviceType: "Livraison de colis, repas, documents, courses et commandes locales",
  },
  en: {
    title: "Toslo | Fast Local Delivery in Agadir",
    description: "Toslo delivers food, parcels, documents and shopping in Agadir, Taghazout and Tamraght. Local drivers for personal and business orders. Request via WhatsApp.",
    serviceType: "Delivery of parcels, food, documents, shopping and local orders",
  },
};

export function localizedMetadata(locale: Locale): Metadata {
  const { title, description } = localizedSeo[locale];
  const metadata = pageMetadata(title, description, `/${locale}`);
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      locale: { ar: "ar_MA", fr: "fr_MA", en: "en_GB" }[locale],
      alternateLocale: (["ar", "fr", "en"] as const)
        .filter(language => language !== locale)
        .map(language => ({ ar: "ar_MA", fr: "fr_MA", en: "en_GB" }[language])),
    },
  };
}
