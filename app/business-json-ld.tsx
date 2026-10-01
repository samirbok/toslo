import { deliveryPhoneUrl, instagramUrl, tiktokUrl } from "./contact-links";
import { homeDescription, siteUrl } from "./seo";

const areaServed = ["Agadir", "Taghazout", "Tamraght"];
const businessId = `${siteUrl}/#business`;

// Facts from the existing contact section, delivery zones, and service copy.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": businessId,
      name: "Toslo",
      url: siteUrl,
      description: homeDescription,
      logo: `${siteUrl}/logo.svg`,
      image: `${siteUrl}/images/img3.png`,
      telephone: deliveryPhoneUrl.replace("tel:", ""),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Agadir",
        addressCountry: "MA",
      },
      areaServed,
      openingHours: "Mo-Su 00:00-23:59",
      sameAs: [instagramUrl, tiktokUrl],
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#delivery-service`,
      name: "Toslo Delivery",
      serviceType: "Livraison de colis, repas, documents, courses et commandes locales",
      url: `${siteUrl}/services`,
      provider: { "@id": businessId },
      areaServed,
    },
  ],
};

export default function BusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
    />
  );
}
