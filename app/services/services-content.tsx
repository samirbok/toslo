"use client";

import "./services.css";


import { translator } from "../i18n/translations";
import { useVisitLocale } from "../language-picker";
import Image from "next/image";
import { createWhatsAppUrl } from "../contact-links";


const container = "mx-auto w-full max-w-[1200px] px-6";
const primary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800";
const eyebrow = "text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-[#69D5A3]";
const heading = "mt-4 text-3xl font-bold tracking-tight text-stone-900 dark:text-[#F2F5F3] sm:text-4xl";
const restaurantListings = [
  { name: "Restaurant example", category: "Restaurant", description: "Example listing for everyday meals and local dishes.", image: "/images/restaurant-example.jpeg", icon: "🍽", background: "from-emerald-100 dark:from-[#294735] to-stone-100 dark:to-[#28322B]" },
  { name: "Local Burger Spot", category: "Burgers", description: "Example listing for burgers, sides and casual bites.", image: "/images/local-burger-spot.jpeg", icon: "🍔", background: "from-stone-200 dark:from-[#313F34] to-emerald-50 dark:to-[#203C2E]" },
  { name: "Sushi example", category: "Sushi", description: "Example listing for sushi rolls and Japanese-style meals.", image: "/images/sushi-example.jpeg", icon: "🍣", background: "from-emerald-50 dark:from-[#203C2E] to-stone-200 dark:to-[#313F34]" },
  { name: "Italian Restaurant", category: "Italian", description: "Example listing for pasta, pizza and Italian-style dishes.", image: "/images/italian-restaurant.jpeg", icon: "🍝", background: "from-stone-100 dark:from-[#28322B] to-emerald-100" },
];
const serviceGroups = [
  { icon: "🛒", title: "Groceries & supermarkets", description: "Request pickup of your groceries and everyday essentials." },
  { icon: "✿", title: "Flowers & gifts", description: "Send a thoughtful gift or flowers to someone nearby." },
  { icon: "📦", title: "Documents & parcels", description: "Get paperwork and packages from pickup to destination." },
  { icon: "🛍", title: "Shopping pickup", description: "Have your purchases collected from a local shop." },
  { icon: "▦", title: "Business deliveries", description: "Arrange delivery of customer orders from your business." },
  { icon: "↗", title: "Custom requests", description: "Tell Toslo what you need and ask about a suitable delivery." },
];

export default function ServicesContent() {
  const locale = useVisitLocale();
  const t = translator(locale);
  return (
        <section id="services" aria-labelledby="services-heading" className="services-page services-section scroll-mt-[81px] bg-stone-50 dark:bg-[#101A15] py-20 sm:py-24">
          <div className={container}>
            <div className="services-hero max-w-2xl">
              <p className={eyebrow}>{t("Our services")}</p>
              <h2 id="services-heading" className={heading}>{t("Whatever you need, Toslo delivers.")}</h2>
              <p className="mt-4 leading-7 text-stone-600 dark:text-[#B9C6BD]">{t("Food, groceries, shopping, documents and more — delivered across Agadir.")}</p>
            </div>

            <section aria-labelledby="restaurants-heading" className="services-restaurants mt-12">
              <h3 id="restaurants-heading" className="text-2xl font-bold tracking-tight text-stone-900 dark:text-[#F2F5F3]">{t("Restaurants")}</h3>
              <p className="mt-3 leading-7 text-stone-600 dark:text-[#B9C6BD]">{t("Order from your preferred restaurant and let Toslo handle the delivery.")}</p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <span className="w-fit rounded-md border border-stone-200 dark:border-[#34483B] bg-white dark:bg-[#1B2822] px-2.5 py-1 text-xs font-semibold text-stone-600 dark:text-[#B9C6BD]">{t("Example listings")}</span>
                <p className="text-xs leading-5 text-stone-500 dark:text-[#A4B4A9]">{t("Design placeholders only. These are not confirmed Toslo partners.")}</p>
              </div>
              <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {restaurantListings.map(listing => (
                  <article key={listing.name} className="restaurant-card flex min-w-0 flex-col overflow-hidden rounded-2xl border border-stone-200 dark:border-[#34483B] bg-white dark:bg-[#1B2822] shadow-sm">
                    <div className={`restaurant-visual relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-linear-to-br ${listing.background}`}>
                      {listing.image ? (
                        <Image src={listing.image} alt={t(listing.name)} fill sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1279px) calc((100vw - 72px) / 2), 270px" className={`object-cover ${listing.category === "Burgers" ? "object-[center_35%]" : listing.category === "Italian" ? "object-[center_30%]" : listing.category === "Sushi" ? "object-center" : "object-[center_65%]"}`} />
                      ) : (
                        <>
                          <div aria-hidden="true" className="food-halo absolute size-40 rounded-full border border-white/70 bg-white/30 dark:bg-[#1B2822]/30" />
                          <span aria-hidden="true" className="food-icon relative text-6xl drop-shadow-sm">{listing.icon}</span>
                        </>
                      )}
                      <span className="absolute top-3 left-3 rounded-full bg-white/90 dark:bg-[#1B2822]/90 px-3 py-1 text-[10px] font-semibold tracking-wide text-stone-600 dark:text-[#B9C6BD] uppercase">{t("Demo listing")}</span>
                      {!listing.image && <span className="absolute right-3 bottom-3 text-[10px] font-medium text-stone-600 dark:text-[#B9C6BD]">{t("Image placeholder")}</span>}
                    </div>
                    <div className="restaurant-details flex flex-1 flex-col p-5">
                      <span className="w-fit rounded-full bg-emerald-50 dark:bg-[#203C2E] px-2.5 py-1 text-xs font-medium text-emerald-800 dark:text-[#91E5BA]">{t(listing.category)}</span>
                      <h4 className="mt-4 text-lg font-semibold tracking-tight text-stone-900 dark:text-[#F2F5F3]">{t(listing.name)}</h4>
                      <p className="mt-2 flex-1 text-sm leading-6 text-stone-500 dark:text-[#A4B4A9]">{t(listing.description)}</p>
                      <a href={createWhatsAppUrl(`I saw the demo listing for ${t(listing.name)} on your services page. Can you confirm whether pickup is available?`)} aria-label={t("Request delivery — {service}").replace("{service}", t(listing.name))} className={`${primary} services-button mt-6 w-full px-3`}>{t("Request delivery")}</a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="other-services-heading" className="services-more mt-14 border-t border-stone-200 dark:border-[#34483B] pt-10">
              <h3 id="other-services-heading" className="text-2xl font-bold tracking-tight text-stone-900 dark:text-[#F2F5F3]">{t("More ways to deliver")}</h3>
              <p className="mt-3 leading-7 text-stone-600 dark:text-[#B9C6BD]">{t("From everyday essentials to something a little different.")}</p>
              <div className="service-grid mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {serviceGroups.map(service => (
                  <article key={service.title} className="service-card flex flex-col rounded-2xl border border-stone-200 dark:border-[#34483B] bg-white dark:bg-[#1B2822] p-6 shadow-sm">
                    <span aria-hidden="true" className="service-icon flex size-11 items-center justify-center rounded-xl bg-emerald-50 dark:bg-[#203C2E] text-2xl text-emerald-700 dark:text-[#69D5A3]">{service.icon}</span>
                    <h4 className="mt-4 font-semibold text-stone-900 dark:text-[#F2F5F3]">{t(service.title)}</h4>
                    <p className="mt-2 flex-1 text-sm leading-6 text-stone-600 dark:text-[#B9C6BD]">{t(service.description)}</p>
                    <a href={createWhatsAppUrl(t("I’m interested in {service} from your services page.").replace("{service}", t(service.title)), locale)} aria-label={t("Request delivery — {service}").replace("{service}", t(service.title))} className="service-link mt-4 inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-[#69D5A3] hover:text-emerald-900 dark:hover:text-[#B6F0D2]">{t("Request delivery")}<span aria-hidden="true" className="service-arrow">→</span></a>
                  </article>
                ))}
              </div>
            </section>

            <section className="services-custom" aria-labelledby="custom-delivery-heading">
              <span aria-hidden="true" className="custom-accent" />
              <h3 id="custom-delivery-heading">{t("Can’t find what you need?")}</h3>
              <p>{t("Tell us what you want delivered and we’ll handle the rest.")}</p>
              <a className={`${primary} services-button`} href={createWhatsAppUrl(t("I’m interested in {service} from your services page.").replace("{service}", t("Custom requests")), locale)}>{t("Create a custom delivery")}<span aria-hidden="true">↗</span></a>
            </section>
          </div>
        </section>
  );
}
