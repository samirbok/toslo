import type { Metadata } from "next";
import { pageMetadata } from "../seo";
import ServicesContent from "./services-content";

export const metadata: Metadata = pageMetadata(
  "Services de livraison à Agadir | Toslo",
  "Livraison de repas, colis, documents et courses à Agadir, Taghazout et Tamraght. Découvrez les services Toslo et commandez par WhatsApp.",
  "/services",
);

export default function ServicesPage() {
  return <ServicesContent />;
}
