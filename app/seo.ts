import type { Metadata } from "next";

export const siteUrl = "https://www.delivery-agadir.com";
export const homeTitle = "Toslo | Delivery & Livraison à Agadir";
export const homeDescription = "Service de livraison rapide à Agadir, Taghazout et Tamraght. Livraison de colis, repas, documents et courses avec commande rapide par WhatsApp.";

const sharingImage = {
  url: `${siteUrl}/images/img3.png`,
  alt: "Livreur Toslo à une porte avec un sac de livraison vert Toslo",
};

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
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
