"use client";

import ServicesContent from "./services/services-content";
import ThemeToggle from "./theme-toggle";
import SiteFooter from "./site-footer";

import BrandLogo from "./brand-logo";
import { translator } from "./i18n/translations";
import { useVisitLocale } from "./language-picker";
import Link from "next/link";
import MobileNavigation from "./mobile-navigation";
import { createWhatsAppUrl, deliveryPhoneUrl } from "./contact-links";
import ReviewsWidget from "./reviews-widget";
import HeroSlider from "./hero-slider";
import ContactSection from "./contact-section";
import DeliveryAreas from "./delivery-areas";
import FloatingWhatsApp from "./floating-whatsapp";
import OrderWhatsAppButton from "./order-whatsapp-button";

const container = "mx-auto w-full max-w-[1200px] px-6";
const sectionFrame = "min-h-[calc(100dvh-81px)] scroll-mt-[81px] py-10 lg:py-12";
const action = "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors";
const primary = `${action} bg-[#E5A83B] hover:bg-[#CF922A]`;
const whatsapp = `${action} bg-[#00875A] hover:bg-[#007D53]`;
const callUs = `${action} bg-[#E5A83B] hover:bg-[#CF922A]`;
const secondary = "inline-flex min-h-12 items-center justify-center rounded-xl border border-gray-300 dark:border-[#48624F] bg-white dark:bg-[#1B2822] px-6 py-3 text-sm font-semibold text-[#1A1A1A] dark:text-[#F2F5F3] transition-colors hover:bg-[#FAFAF8] dark:hover:bg-[#101A15]";
const eyebrow = "text-xs font-bold uppercase tracking-[0.18em] text-[#007D53] dark:text-[#69D5A3]";
const heading = "mt-4 text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F2F5F3] sm:text-4xl";
const steps = [
  ["01", "M8 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-3 M16 3l5 5 M10 14l-1 4 4-1 9-9a2 2 0 0 0-5-5Z", "Tell us what you need", "Send us the pickup details, delivery address and what needs to be delivered."],
  ["02", "m22 2-7 20-4-9-9-4 20-7Z M22 2 11 13", "Place your request", "Send your delivery request quickly through Toslo."],
  ["03", "M1 3h14v13H1V3Z M15 8h4l3 4v4h-7 M5 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z", "We pick up your order", "A local Toslo driver handles the pickup and delivery."],
  ["04", "M22 11v1a10 10 0 1 1-5.9-9.1 M22 4 12 14l-3-3", "Delivery completed", "Your order reaches the destination you provided."],
];
const stepColors = [
  { card: "border-[#CFEBDD] dark:border-[#344D3D] bg-[#F0FAF5] dark:bg-[#1B3025]", accent: "bg-[#D9F1E4] dark:bg-[#294735] text-[#006B47] dark:text-[#69D5A3]", number: "text-[#006B47] dark:text-[#69D5A3]" },
  { card: "border-[#D8E6F4] dark:border-[#35485A] bg-[#F2F7FC] dark:bg-[#1C2B36]", accent: "bg-[#DEEBF8] dark:bg-[#283E50] text-[#315E8A] dark:text-[#A2C9ED]", number: "text-[#315E8A] dark:text-[#A2C9ED]" },
  { card: "border-[#F0DFCF] dark:border-[#51412C] bg-[#FFF7EF] dark:bg-[#352B1E]", accent: "bg-[#FBE6D3] dark:bg-[#493722] text-[#915329] dark:text-[#E5BC85]", number: "text-[#915329] dark:text-[#E5BC85]" },
  { card: "border-[#E5DDF1] dark:border-[#49395B] bg-[#F7F4FC] dark:bg-[#2B2436]", accent: "bg-[#EAE1F6] dark:bg-[#3C2F4D] text-[#6B4D91] dark:text-[#CCB4ED]", number: "text-[#6B4D91] dark:text-[#CCB4ED]" },
];
const zones = ["Agadir", "Hay Salam", "Dakhla", "Founty", "Talborjt", "Bensergao", "Dcheira", "Inezgane", "Ait Melloul", "Anza", "Tamraght", "Taghazout"];
const pricing = [
  { title: "Standard delivery", price: 25, popular: false, features: ["Delivery in 15–20 min", "City centre", "0–3 km", "Real-time tracking"] },
  { title: "Express delivery", price: 30, popular: true, features: ["Delivery in 10–15 min", "Across Agadir", "0–5 km", "Priority delivery"] },
  { title: "Night delivery", price: 30, popular: false, features: ["24/7 delivery", "Across Agadir", "0–5 km", "Available at night"] },
  { title: "Outlying areas", price: 50, popular: false, features: ["Delivery in 30–40 min", "Surrounding areas", "5–10 km", "Reliable service"] },
];
const faqs = [
  ["Where does Toslo deliver?", "Toslo serves Agadir, Inzegane, Ait Melloul, Aourir, Tamraght and Taghazout. Share your pickup and destination so we can confirm availability for your route."],
  ["How much does delivery cost?", "Standard delivery starts at 25 MAD, express and night delivery at 30 MAD, and outlying areas at 50 MAD. Distance-based pricing starts at 25 MAD with 5 MAD per additional kilometre. Business deliveries are quoted individually. Contact Toslo to confirm your route and price."],
  ["How do I request a delivery?", "Send Toslo the pickup address, destination and a description of what needs delivering. The team can confirm the next steps."],
  ["Can I schedule a delivery?", "Share your preferred date and time with Toslo. Scheduling is subject to confirmation and driver availability."],
  ["Can businesses use Toslo?", "Yes. Local businesses can contact Toslo to discuss customer deliveries and their regular delivery needs."],
  ["How can I become a Toslo driver?", "Contact Toslo to ask about driver opportunities and the current requirements."],
];

export default function Home() {
  const locale = useVisitLocale();
  const t = translator(locale);
  const businessWhatsAppUrl = createWhatsAppUrl("I'd like to discuss deliveries for my business.", locale);
  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#101A15] text-[#1A1A1A] dark:text-[#F2F5F3] selection:bg-[#ECFDF5] dark:selection:bg-[#203C2E] selection:text-[#111111] dark:selection:text-[#F2F5F3] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[#00875A]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-lg focus:bg-white dark:focus:bg-[#1B2822] focus:p-4">{t("Skip to content")}</a>
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-[#34483B] bg-[#FAFAF8] dark:bg-[#101A15]">
        <nav dir="ltr" aria-label={t("Main navigation")} className={`${container} flex h-20 items-center justify-between gap-2 sm:gap-4`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <MobileNavigation home locale={locale} />
            <Link href={`/${locale}`} dir="ltr" className="inline-flex shrink-0 items-center max-lg:absolute max-lg:top-0 max-lg:left-1/2 max-lg:-translate-x-1/2"><BrandLogo className="size-20 lg:size-16" /></Link>
          </div>
          <div className="hidden items-center gap-6 text-sm font-medium text-gray-600 dark:text-[#B9C6BD] lg:flex">
            {[["Services", "services"], ["How it works", "how-it-works"], ["Pricing", "pricing"], ["Zones", "zones"], ["Reviews", "reviews"], ["Contact", "contact"]].map(([label, id]) => (
              <Link key={id} href={`#${id}`} className="transition-colors hover:text-[#007D53] dark:hover:text-[#69D5A3]">{t(label)}</Link>
            ))}
          </div>
          <ThemeToggle locale={locale} />
        </nav>
      </header>

      <main id="main">
        <section aria-labelledby="hero-heading" className={`${sectionFrame} relative isolate flex items-center overflow-hidden bg-[#FAFAF8] dark:bg-[#101A15]`}>
          <div aria-hidden="true" className="absolute -top-36 -right-32 -z-10 size-[520px] rounded-full border-[60px] border-[#00875A]/5" />
          <div className={`${container} grid items-center gap-6 lg:grid-cols-2 lg:grid-rows-[auto_1fr_auto] lg:gap-x-16 lg:gap-y-8`}>
            <h1 id="hero-heading" className="order-first mx-auto w-full text-center text-5xl leading-[1.08] font-bold tracking-tight sm:text-7xl lg:col-start-1 lg:row-start-1 lg:self-start lg:pt-4 lg:text-start lg:text-7xl lg:leading-[1.08]"><span className="text-[#00875A] dark:text-[#69D5A3] lg:whitespace-nowrap">{t("Fast delivery")}</span><br />{" "}<span className="text-[#E5A83B] lg:whitespace-nowrap">{t("in Agadir")}</span></h1>
            <div className="mx-auto w-full max-w-lg pt-2 text-center lg:col-start-1 lg:row-start-2 lg:mx-0 lg:pt-0 lg:text-start">
              <p className="text-base leading-7 text-gray-700 dark:text-[#CDD6D0] sm:text-lg sm:leading-8 lg:font-medium">{t("Toslo is your local delivery service in Agadir, Taghazout and Tamraght for parcels, food, documents, shopping, local orders and errands.")}</p>
              <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-[#B9C6BD] sm:text-base sm:leading-7 lg:font-medium">{t("Order your delivery on WhatsApp in just a few steps and let a local Toslo driver take care of the rest.")}</p>
              <Link href="#services" className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-gray-600 dark:text-[#B9C6BD] hover:text-[#007D53] dark:hover:text-[#69D5A3]">{t("Our services")}</Link>
            </div>
            <div className="hidden lg:col-start-1 lg:row-start-3 lg:block lg:pb-6">
              <div className="flex gap-3"><OrderWhatsAppButton locale={locale} className={whatsapp} label={t("Order on WhatsApp")} /><a href={deliveryPhoneUrl} className={callUs}>{t("Call us")}</a></div>
              <p className="mt-3 max-w-lg text-xs leading-5 text-gray-600 dark:text-[#B9C6BD]">{t("To help us arrange your delivery, include the pickup address, destination, item and preferred time in your WhatsApp message.")}</p>
            </div>
            <div className="-order-1 min-w-0 lg:order-last lg:col-start-2 lg:row-start-1 lg:row-span-3">
              <HeroSlider locale={locale} />
              <div className="mx-auto mt-5 flex w-full max-w-lg flex-col gap-3 lg:hidden">
                <OrderWhatsAppButton locale={locale} className={whatsapp} label={t("Order on WhatsApp")} />
                <a href={deliveryPhoneUrl} className={callUs}>{t("Call us")}</a>
                <p className="text-center text-xs leading-5 text-gray-600 dark:text-[#B9C6BD]">{t("To help us arrange your delivery, include the pickup address, destination, item and preferred time in your WhatsApp message.")}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="border-y border-gray-200 dark:border-[#34483B] bg-white dark:bg-[#1B2822]">
          <ul className={`${container} grid grid-cols-2 gap-6 py-8 md:grid-cols-4`}>
            {[["↗", "Fast delivery"], ["♡", "Local drivers"], ["◎", "Agadir coverage"], ["✓", "Easy ordering"]].map(([icon, label]) => <li key={label} className="flex items-center gap-3 text-sm font-semibold"><span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#ECFDF5] dark:bg-[#203C2E] text-lg text-[#1A1A1A] dark:text-[#F2F5F3]">{icon}</span>{t(label)}</li>)}
          </ul>
        </div>

        <ServicesContent />

        <section id="how-it-works" aria-labelledby="how-heading" className={`${container} ${sectionFrame} flex flex-col justify-center`}>
          <div className="mx-auto max-w-2xl text-center"><p className={eyebrow}>{t("How it works")}</p><h2 id="how-heading" className={heading}>{t("Delivery made simple")}</h2><p className="mt-4 leading-7 text-gray-600 dark:text-[#B9C6BD]">{t("A few details from you. A local driver for the journey. Toslo makes local delivery quick and straightforward.")}</p></div>
          <div className="mt-7 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {steps.map(([number, icon, title, description], index) => (
              <article key={number} className={`grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-x-3 rounded-2xl border p-4 shadow-sm shadow-black/[0.025] sm:block sm:p-6 ${stepColors[index].card}`}>
                <div className="contents sm:flex sm:items-center sm:justify-between">
                  <span className={`col-start-1 row-start-1 flex size-10 items-center justify-center rounded-xl sm:size-12 sm:rounded-2xl ${stepColors[index].accent}`}>
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5 sm:size-6"><path d={icon} /></svg>
                  </span>
                  <span className={`col-start-3 row-start-1 text-[10px] font-semibold tracking-widest sm:text-xs ${stepColors[index].number}`}>{number}</span>
                </div>
                <h3 className="col-start-2 row-start-1 text-sm leading-5 font-semibold text-[#111111] dark:text-[#F2F5F3] sm:mt-7 sm:text-base sm:leading-6">{t(title)}</h3>
                <p className="col-span-3 mt-3 text-sm leading-6 text-gray-600 dark:text-[#B9C6BD]">{t(description)}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-[#00875A]/10 bg-white dark:bg-[#1B2822] px-6 py-4 text-center text-sm font-medium text-[#007D53] dark:text-[#69D5A3]">{t("Simple, local and designed to make delivery easier.")}</p>
        </section>

        <section id="zones" aria-labelledby="zones-heading" className={`${container} ${sectionFrame} grid content-center items-center gap-10 max-sm:gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16`}>
          <div className="max-sm:mx-auto max-sm:w-full max-sm:max-w-lg max-sm:text-center">
            <p className={eyebrow}>{t("Delivery zones")}</p>
            <h2 id="zones-heading" className={heading}>{t("Across Agadir.")}<br />{t("Closer to you.")}</h2>
            <p className="mt-5 leading-7 text-gray-600 dark:text-[#B9C6BD] max-sm:text-pretty">{t("From your neighborhood to nearby towns, Toslo makes local delivery simple.")}</p>
            <a href={createWhatsAppUrl("Can you confirm delivery availability between my pickup and destination?", locale)} className={`${primary} mt-7 max-sm:max-w-full`}><span className="sm:hidden">{t("Check delivery availability")}</span><span className="hidden sm:inline">{t("Confirm delivery on WhatsApp")}</span></a>
            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-[#A4B4A9]">{t("Send your pickup and destination to check availability.")}</p>
          </div>
          <DeliveryAreas zones={zones} locale={locale} />
        </section>

        <section id="pricing" aria-labelledby="pricing-heading" className={`${sectionFrame} flex items-center justify-center border-y border-gray-100 dark:border-[#2D4035] bg-[#FAFAF8] dark:bg-[#101A15]`}>
          <div className={container}>
            <div className="mx-auto max-w-2xl text-center">
              <p className={eyebrow}>{t("Pricing")}</p>
              <h2 id="pricing-heading" className={heading}>{t("Simple delivery pricing")}</h2>
              <p className="mt-4 leading-7 text-gray-600 dark:text-[#B9C6BD]">{t("Choose the delivery that fits your day. All prices in Moroccan dirhams.")}</p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pricing.map(({ title, price, popular, features }) => (
                <article key={title} className={`relative flex flex-col rounded-2xl border bg-white dark:bg-[#1B2822] p-6 shadow-sm shadow-black/5 ${popular ? "border-[#00875A] ring-1 ring-[#00875A]" : "border-gray-200 dark:border-[#34483B]"}`}>
                  {popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#00875A] px-4 py-1 text-xs font-semibold text-white">{t("Popular")}</span>}
                  <h3 className="text-base font-semibold text-[#111111] dark:text-[#F2F5F3]">{t(title)}</h3>
                  <p className="mt-5 text-xs text-gray-500 dark:text-[#A4B4A9]">{t("From")}</p>
                  <p className="mt-1 flex items-baseline gap-2"><span className="text-4xl font-bold tracking-tight text-[#111111] dark:text-[#F2F5F3]">{price}</span><span className="text-sm font-semibold text-gray-500 dark:text-[#A4B4A9]">{t("MAD")}</span></p>
                  <ul className="my-6 space-y-3">
                    {features.map(feature => <li key={feature} className="flex gap-2 text-sm leading-5 text-gray-600 dark:text-[#B9C6BD]"><span aria-hidden="true" className="text-[#00875A] dark:text-[#69D5A3]">✓</span>{t(feature)}</li>)}
                  </ul>
                  <a href={createWhatsAppUrl(t("I’m interested in {service}. I’d like to order.").replace("{service}", t(title)), locale)} aria-label={t("Order {service} on WhatsApp").replace("{service}", t(title))} className={`${popular ? whatsapp : primary} mt-auto w-full`}>{t("Order delivery")}</a>
                </article>
              ))}
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 dark:border-[#34483B] bg-white dark:bg-[#1B2822] p-5">
                <div><h3 className="text-sm font-semibold text-[#111111] dark:text-[#F2F5F3]">{t("By distance")}</h3><p className="mt-2 text-sm text-gray-600 dark:text-[#B9C6BD]">{t("From")} <span className="font-semibold text-[#007D53] dark:text-[#69D5A3]">{t("25 MAD")}</span> {t("· +5 MAD per additional km")}</p></div>
                <a href={createWhatsAppUrl("I’d like a distance-based delivery quote.", locale)} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#007D53] dark:text-[#69D5A3]">{t("Get a quote")}</a>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 dark:border-[#34483B] bg-white dark:bg-[#1B2822] p-5">
                <div><h3 className="text-sm font-semibold text-[#111111] dark:text-[#F2F5F3]">{t("Business delivery")}</h3><p className="mt-2 text-sm text-gray-600 dark:text-[#B9C6BD]">{t("A tailored service, priced on request.")}</p></div>
                <a href={businessWhatsAppUrl} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#007D53] dark:text-[#69D5A3]">{t("Let’s talk")}</a>
              </div>
            </div>
          </div>
        </section>

        <section id="business" aria-labelledby="business-heading" className={`${container} ${sectionFrame} flex flex-col justify-center`}>
          <div className="grid items-center gap-12 max-sm:gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="max-sm:text-center">
              <p className={eyebrow}>{t("For local businesses")}</p>
              <h2 id="business-heading" className={heading}>{t("You run your business.")}<br />{t("We deliver")}<span className="text-[#00875A] dark:text-[#69D5A3]">.</span></h2>
              <p className="mt-5 max-w-md leading-7 text-gray-600 dark:text-[#B9C6BD] max-sm:mx-auto max-sm:text-pretty">{t("Keep your focus on your customers. Toslo handles local pickups and deliveries across Agadir.")}</p>
              <a href={businessWhatsAppUrl} className={`${primary} mt-7`}>{t("Let’s talk delivery")}</a>
              <p className="mt-3 text-xs leading-5 text-gray-500 dark:text-[#A4B4A9]">{t("Tell us about your business on WhatsApp.")}</p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-gray-200/80 dark:border-[#34483B]/80 bg-white dark:bg-[#1B2822] px-6 shadow-sm shadow-black/[0.025] max-sm:px-4 sm:px-8">
              <ol className="divide-y divide-gray-100 dark:divide-[#2D4035]">
                {[
                  ["01", "Your orders, ready to go", "Prepare your orders and share the pickup and delivery details."],
                  ["02", "We take it from here", "A local Toslo driver collects from your shop."],
                  ["03", "Straight to your customer", "We handle the journey to their doorstep."],
                ].map(([number, title, description]) => (
                  <li key={number} className="flex gap-5 py-7 max-sm:gap-3 max-sm:py-4 sm:py-8">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#ECFDF5] dark:bg-[#203C2E] text-xs font-semibold text-[#007D53] dark:text-[#69D5A3]">{number}</span>
                    <div>
                      <h3 className="pt-1 text-base font-semibold text-[#111111] dark:text-[#F2F5F3]">{t(title)}</h3>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-600 dark:text-[#B9C6BD]">{t(description)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-gray-200 dark:border-[#34483B] pt-6 sm:flex-row sm:items-center sm:gap-8">
            <p className="shrink-0 text-xs font-semibold text-gray-500 dark:text-[#A4B4A9]">{t("Made for local business")}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {["Restaurants", "Instagram sellers", "Shops", "E-commerce", "Local businesses"].map(label => (
                <li key={label} className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-[#B9C6BD]"><span aria-hidden="true" className="size-1 rounded-full bg-[#00875A]/60" />{t(label)}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="reviews" aria-labelledby="reviews-heading" className={`${sectionFrame} flex items-center justify-center bg-[#FAFAF8] dark:bg-[#101A15]`}>
          <div className={container}><div className="mx-auto max-w-2xl text-center"><p className={eyebrow}>{t("Customer reviews")}</p><h2 id="reviews-heading" className={heading}>{t("What our customers say")}</h2><p className="mt-4 leading-7 text-gray-600 dark:text-[#B9C6BD]">{t("See what customers think about their Toslo delivery experience.")}</p></div>
            <ReviewsWidget title={t("Customer reviews")} />

            <div className="mt-8 text-center"><a href="https://maps.app.goo.gl/X78CjoVafbTbxb4R6" target="_blank" rel="noopener noreferrer" className={secondary}>{t("View reviews on Google")}<span className="sr-only"> {t("(opens in a new tab)")}</span></a></div>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-heading" className={`${container} ${sectionFrame} grid content-center items-center gap-10 max-sm:gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <div className="max-sm:text-center"><p className={eyebrow}>{t("FAQ")}</p><h2 id="faq-heading" className={heading}>{t("Frequently")}<br />{t("asked questions")}</h2><p className="mt-5 leading-7 text-gray-600 dark:text-[#B9C6BD]">{t("A few things to know before your next delivery.")}</p><a href="#contact" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#007D53] dark:text-[#69D5A3]">{t("Still have a question?")}</a></div>
          <div className="divide-y divide-gray-200 dark:divide-[#34483B] border-y border-gray-200 dark:border-[#34483B]">{faqs.map(([question, answer]) => <details key={question} className="group py-1"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-[#00875A] [&::-webkit-details-marker]:hidden">{t(question)}<span aria-hidden="true" className="text-xl font-normal text-[#007D53] dark:text-[#69D5A3] group-open:rotate-45">+</span></summary><p className="pb-5 pe-7 text-sm leading-7 text-gray-600 dark:text-[#B9C6BD]">{t(answer)}</p></details>)}</div>
        </section>


        <ContactSection locale={locale} />
      </main>

      <SiteFooter locale={locale} />
      <FloatingWhatsApp locale={locale} />
    </div>
  );
}
