import { deliveryPhoneUrl, instagramUrl, tiktokUrl } from "./contact-links";
import { localizedSeo, siteUrl } from "./seo";
import type { Locale } from "./i18n/translations";

const areaServed = ["Agadir", "Taghazout", "Tamraght"];
const businessId = `${siteUrl}/#business`;

// Facts from the existing contact section, delivery zones, and service copy.
function structuredData(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: "Toslo",
        url: siteUrl,
        description: localizedSeo[locale].description,
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
        serviceType: localizedSeo[locale].serviceType,
        url: `${siteUrl}/${locale}#services`,
        provider: { "@id": businessId },
        areaServed,
      },
    ],
  };
}

export default function BusinessJsonLd({ locale }: { locale: Locale }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)).replace(/</g, "\\u003c") }}
    />
  );
}
