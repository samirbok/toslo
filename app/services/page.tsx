import BrandLogo from "../brand-logo";
import { getLocale } from "../i18n/server";
import { translator } from "../i18n/translations";
import { LanguageWelcome } from "../language-picker";
import Link from "next/link";
import MobileNavigation from "../mobile-navigation";
import { createWhatsAppUrl } from "../contact-links";
import type { Metadata } from "next";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata(
  "Services de livraison à Agadir | Toslo",
  "Livraison de repas, colis, documents et courses à Agadir, Taghazout et Tamraght. Découvrez les services Toslo et commandez par WhatsApp.",
  "/services",
);

const container = "mx-auto w-full max-w-[1200px] px-6";
const primary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800";
const eyebrow = "text-xs font-bold uppercase tracking-[0.18em] text-emerald-700";
const heading = "mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl";
const serviceCategories = [
  "Restaurants", "Groceries", "Shops", "Documents", "Parcels", "Flowers & Gifts", "Custom delivery",
];
const restaurantListings = [
  { name: "Restaurant Partner", category: "Restaurant", description: "Example listing for everyday meals and local dishes.", icon: "🍽", background: "from-emerald-100 to-stone-100" },
  { name: "Local Burger Spot", category: "Burgers", description: "Example listing for burgers, sides and casual bites.", icon: "🍔", background: "from-stone-200 to-emerald-50" },
  { name: "Sushi Partner", category: "Sushi", description: "Example listing for sushi rolls and Japanese-style meals.", icon: "🍣", background: "from-emerald-50 to-stone-200" },
  { name: "Italian Restaurant", category: "Italian", description: "Example listing for pasta, pizza and Italian-style dishes.", icon: "🍝", background: "from-stone-100 to-emerald-100" },
];
const serviceGroups = [
  { icon: "🛒", title: "Groceries & supermarkets", description: "Request pickup of your groceries and everyday essentials." },
  { icon: "✿", title: "Flowers & gifts", description: "Send a thoughtful gift or flowers to someone nearby." },
  { icon: "📦", title: "Documents & parcels", description: "Get paperwork and packages from pickup to destination." },
  { icon: "🛍", title: "Shopping pickup", description: "Have your purchases collected from a local shop." },
  { icon: "▦", title: "Business deliveries", description: "Arrange delivery of customer orders from your business." },
  { icon: "↗", title: "Custom requests", description: "Tell Toslo what you need and ask about a suitable delivery." },
];

export default async function ServicesPage() {
  const locale = await getLocale();
  if (!locale) return <LanguageWelcome destination="/services" />;
  const t = translator(locale);
  const deliveryWhatsAppUrl = createWhatsAppUrl("I'd like to request a delivery.", locale);
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-emerald-700">
      <header className="relative z-50 border-b border-stone-200 bg-white">
        <nav aria-label={t("Main navigation")} className={`${container} flex h-20 items-center justify-between gap-2 sm:gap-4`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <MobileNavigation locale={locale} />
            <Link href="/" dir="ltr" className="inline-flex shrink-0 items-center"><BrandLogo /></Link>
          </div>
          <div className="hidden items-center gap-6 text-sm font-medium text-stone-600 lg:flex">
            {[["Services", "services"], ["How it works", "how-it-works"], ["Pricing", "pricing"], ["Zones", "zones"], ["Reviews", "reviews"], ["Contact", "contact"]].map(([label, id]) => (
              <Link key={id} href={id === "services" ? "/services" : `/#${id}`} className="transition-colors hover:text-emerald-700">{t(label)}</Link>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <a href={deliveryWhatsAppUrl} className={primary.replace("px-6", "px-3 sm:px-6")}>{t("Order now")}</a>
          </div>
        </nav>
      </header>

      <main>
        <section id="services" aria-labelledby="services-heading" className="bg-stone-50 py-20 sm:py-24">
          <div className={container}>
            <div className="max-w-2xl">
              <p className={eyebrow}>{t("Our services")}</p>
              <h1 id="services-heading" className={heading}>{t("What can Toslo deliver?")}</h1>
              <p className="mt-4 leading-7 text-stone-600">{t("Choose a category and request delivery from shops, restaurants and local businesses around Agadir.")}</p>
            </div>

            <div role="group" aria-label={t("Delivery categories")} className="mt-8 flex flex-wrap gap-2.5">
              {serviceCategories.map(category => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={category === "Restaurants"}
                  className={`min-h-12 rounded-full border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 ${category === "Restaurants" ? "border-emerald-700 bg-emerald-700 text-white shadow-sm hover:bg-emerald-800" : "border-stone-200 bg-white text-stone-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"}`}
                >
                  {t(category)}
                </button>
              ))}
            </div>

            <section aria-labelledby="restaurants-heading" className="mt-12">
              <h2 id="restaurants-heading" className="text-2xl font-bold tracking-tight text-stone-900">{t("Restaurants")}</h2>
              <p className="mt-3 leading-7 text-stone-600">{t("Order from your preferred restaurant and let Toslo handle the delivery.")}</p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <span className="w-fit rounded-md border border-stone-200 bg-white px-2.5 py-1 text-xs font-semibold text-stone-600">{t("Example listings")}</span>
                <p className="text-xs leading-5 text-stone-500">{t("Design placeholders only. These are not confirmed Toslo partners.")}</p>
              </div>
              <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {restaurantListings.map(listing => (
                  <article key={listing.name} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                    <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-linear-to-br ${listing.background}`}>
                      <div aria-hidden="true" className="absolute size-40 rounded-full border border-white/70 bg-white/30" />
                      <span aria-hidden="true" className="relative text-6xl drop-shadow-sm">{listing.icon}</span>
                      <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold tracking-wide text-stone-600 uppercase">{t("Demo listing")}</span>
                      <span className="absolute right-3 bottom-3 text-[10px] font-medium text-stone-600">{t("Image placeholder")}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="w-fit rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">{t(listing.category)}</span>
                      <h3 className="mt-4 text-lg font-semibold tracking-tight text-stone-900">{t(listing.name)}</h3>
                      <p className="mt-2 flex-1 text-sm leading-6 text-stone-500">{t(listing.description)}</p>
                      <a href={createWhatsAppUrl(`I saw the demo listing for ${t(listing.name)} on your services page. Can you confirm whether pickup is available?`)} aria-label={t("Request delivery — {service}").replace("{service}", t(listing.name))} className={`${primary} mt-6 w-full px-3`}>{t("Request delivery")}</a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="other-services-heading" className="mt-14 border-t border-stone-200 pt-10">
              <h2 id="other-services-heading" className="text-2xl font-bold tracking-tight text-stone-900">{t("More ways to deliver")}</h2>
              <p className="mt-3 leading-7 text-stone-600">{t("From everyday essentials to something a little different.")}</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {serviceGroups.map(service => (
                  <article key={service.title} className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                    <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-2xl text-emerald-700">{service.icon}</span>
                    <h3 className="mt-4 font-semibold text-stone-900">{t(service.title)}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-stone-600">{t(service.description)}</p>
                    <a href={createWhatsAppUrl(t("I’m interested in {service} from your services page.").replace("{service}", t(service.title)), locale)} aria-label={t("Request delivery — {service}").replace("{service}", t(service.title))} className="mt-4 inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900">{t("Request delivery")}</a>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>

      </main>
      <footer className="border-t border-stone-200 bg-white py-8">
        <div className={`${container} flex flex-wrap items-center justify-between gap-4 text-sm text-stone-500`}>
          <p>{t("© Toslo Delivery")}</p>
          <Link href="/" className="inline-flex min-h-11 items-center font-semibold text-emerald-700">{t("← Back to home")}</Link>
        </div>
      </footer>
    </div>
  );
}
