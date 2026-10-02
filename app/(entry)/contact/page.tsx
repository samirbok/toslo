import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "../../seo";

// Contact currently redirects to the homepage; keep its canonical on that destination.
export const metadata: Metadata = pageMetadata(
  "Contact Toslo | Livraison à Agadir par WhatsApp",
  "Contactez Toslo par WhatsApp ou téléphone pour vos livraisons à Agadir, Taghazout et Tamraght : colis, repas, documents et courses.",
  "",
);

export default function ContactPage() {
  redirect("/#contact");
}
