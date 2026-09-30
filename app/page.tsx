import Link from "next/link";
import MobileNavigation from "./mobile-navigation";
import { createWhatsAppUrl, businessWhatsAppUrl, deliveryWhatsAppUrl, deliveryPhoneUrl } from "./contact-links";
import Script from "next/script";
import HeroSlider from "./hero-slider";
import ContactSection from "./contact-section";
import DeliveryAreas from "./delivery-areas";
import FloatingWhatsApp from "./floating-whatsapp";

const container = "mx-auto w-full max-w-[1200px] px-6";
const sectionFrame = "min-h-[calc(100dvh-81px)] scroll-mt-[81px] py-10 lg:py-12";
const action = "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors";
const primary = `${action} bg-[#111111] hover:bg-[#00875A]`;
const whatsapp = `${action} bg-[#00875A] hover:bg-[#007D53]`;
const secondary = "inline-flex min-h-12 items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-[#FAFAF8]";
const eyebrow = "text-xs font-bold uppercase tracking-[0.18em] text-[#007D53]";
const heading = "mt-4 text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl";
const steps = [
  ["01", "M8 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-3 M16 3l5 5 M10 14l-1 4 4-1 9-9a2 2 0 0 0-5-5Z", "Tell us what you need", "Send us the pickup details, delivery address and what needs to be delivered."],
  ["02", "m22 2-7 20-4-9-9-4 20-7Z M22 2 11 13", "Place your request", "Send your delivery request quickly through Toslo."],
  ["03", "M1 3h14v13H1V3Z M15 8h4l3 4v4h-7 M5 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z", "We pick up your order", "A local Toslo driver handles the pickup and delivery."],
  ["04", "M22 11v1a10 10 0 1 1-5.9-9.1 M22 4 12 14l-3-3", "Delivery completed", "Your order reaches the destination you provided."],
];
const stepColors = [
  { card: "border-[#CFEBDD] bg-[#F0FAF5]", accent: "bg-[#D9F1E4] text-[#006B47]", number: "text-[#006B47]" },
  { card: "border-[#D8E6F4] bg-[#F2F7FC]", accent: "bg-[#DEEBF8] text-[#315E8A]", number: "text-[#315E8A]" },
  { card: "border-[#F0DFCF] bg-[#FFF7EF]", accent: "bg-[#FBE6D3] text-[#915329]", number: "text-[#915329]" },
  { card: "border-[#E5DDF1] bg-[#F7F4FC]", accent: "bg-[#EAE1F6] text-[#6B4D91]", number: "text-[#6B4D91]" },
];
const zones = ["Agadir", "Hay Salam", "Dakhla", "Founty", "Talborjt", "Bensergao", "Dcheira", "Inezgane", "Ait Melloul", "Anza", "Tamraght", "Taghazout"];
const pricing = [
  { title: "Standard delivery", price: 25, popular: false, features: ["Delivery in 15–20 min", "City centre", "0–3 km", "Real-time tracking"] },
  { title: "Express delivery", price: 30, popular: true, features: ["Delivery in 10–15 min", "Across Agadir", "0–5 km", "Priority delivery"] },
  { title: "Night delivery", price: 30, popular: false, features: ["24/7 delivery", "Across Agadir", "0–5 km", "Available at night"] },
  { title: "Outlying areas", price: 50, popular: false, features: ["Delivery in 30–40 min", "Surrounding areas", "5–10 km", "Reliable service"] },
];
const faqs = [
  ["Where does Toslo deliver?", "Toslo focuses on Agadir and nearby areas. Share your pickup and destination so we can confirm availability for your route."],
  ["How much does delivery cost?", "Standard delivery starts at 25 MAD, express and night delivery at 30 MAD, and outlying areas at 50 MAD. Distance-based pricing starts at 25 MAD with 5 MAD per additional kilometre. Business deliveries are quoted individually. Contact Toslo to confirm your route and price."],
  ["How do I request a delivery?", "Send Toslo the pickup address, destination and a description of what needs delivering. The team can confirm the next steps."],
  ["Can I schedule a delivery?", "Share your preferred date and time with Toslo. Scheduling is subject to confirmation and driver availability."],
  ["Can businesses use Toslo?", "Yes. Local businesses can contact Toslo to discuss customer deliveries and their regular delivery needs."],
  ["How can I become a Toslo driver?", "Contact Toslo to ask about driver opportunities and the current requirements."],
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] selection:bg-[#ECFDF5] selection:text-[#111111] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[#00875A]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-lg focus:bg-white focus:p-4">Skip to content</a>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-[#FAFAF8]">
        <nav aria-label="Main navigation" className={`${container} flex h-20 items-center justify-between gap-2 sm:gap-4`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <MobileNavigation home />
            <Link href="/" className="text-3xl font-extrabold tracking-tight text-[#00875A]">Toslo<span className="text-[#00875A]">.</span></Link>
          </div>
          <div className="hidden items-center gap-6 text-sm font-medium text-gray-600 lg:flex">
            {[["Services", "services"], ["How it works", "how-it-works"], ["Pricing", "pricing"], ["Zones", "zones"], ["Reviews", "reviews"], ["Contact", "contact"]].map(([label, id]) => (
              <a key={id} href={id === "services" ? "/services" : `#${id}`} className="transition-colors hover:text-[#007D53]">{label}</a>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <a href={deliveryWhatsAppUrl} className={primary.replace("px-6", "px-3 sm:px-6")}>Order now <span aria-hidden="true">↗</span></a>
          </div>
        </nav>
      </header>

      <main id="main">
        <section aria-labelledby="hero-heading" className={`${sectionFrame} relative isolate flex items-center overflow-hidden bg-[#FAFAF8]`}>
          <div aria-hidden="true" className="absolute -top-36 -right-32 -z-10 size-[520px] rounded-full border-[60px] border-[#00875A]/5" />
          <div className={`${container} grid items-center gap-6 lg:grid-cols-2 lg:gap-16`}>
            <h1 id="hero-heading" className="order-first mx-auto w-full text-center text-[2.5rem] leading-[1.08] font-bold tracking-tight sm:text-6xl lg:col-span-2 lg:text-6xl"><span className="text-[#00875A]">Your delivery,</span><br className="lg:hidden" />{" "}<span className="text-[#F7DE3A]">made simple.</span></h1>
            <div className="mx-auto w-full max-w-lg pt-2 text-center lg:mx-0 lg:pt-0 lg:text-left">
              <p className="text-base leading-7 text-gray-700 sm:text-lg sm:leading-8">Toslo makes it easy to send parcels, food, documents, shopping and local orders across Agadir.</p>
              <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">Request your delivery in just a few steps and let a local Toslo driver take care of the rest.</p>
              <div className="mt-8 hidden gap-3 lg:flex"><a href={deliveryWhatsAppUrl} className={whatsapp}>Order on WhatsApp <span aria-hidden="true">↗</span></a><a href={deliveryPhoneUrl} className={secondary}>Call us</a></div>
              <Link href="/services" className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-gray-600 hover:text-[#007D53]">Our services <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="-order-1 min-w-0 lg:order-last">
              <HeroSlider />
              <div className="mx-auto mt-5 flex w-full max-w-lg flex-col gap-3 lg:hidden">
                <a href={deliveryWhatsAppUrl} className={whatsapp}>Order on WhatsApp <span aria-hidden="true">↗</span></a>
                <a href={deliveryPhoneUrl} className={secondary}>Call us</a>
              </div>
            </div>
          </div>
        </section>

        <div className="border-y border-gray-200 bg-white">
          <ul className={`${container} grid grid-cols-2 gap-6 py-8 md:grid-cols-4`}>
            {[["↗", "Fast delivery"], ["♡", "Local drivers"], ["◎", "Agadir coverage"], ["✓", "Easy ordering"]].map(([icon, label]) => <li key={label} className="flex items-center gap-3 text-sm font-semibold"><span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#ECFDF5] text-lg text-[#1A1A1A]">{icon}</span>{label}</li>)}
          </ul>
        </div>

        <section id="how-it-works" aria-labelledby="how-heading" className={`${container} ${sectionFrame} flex flex-col justify-center`}>
          <div className="mx-auto max-w-2xl text-center"><p className={eyebrow}>How it works</p><h2 id="how-heading" className={heading}>Delivery made simple</h2><p className="mt-4 leading-7 text-gray-600">A few details from you. A local driver for the journey. Toslo makes local delivery quick and straightforward.</p></div>
          <div className="mt-7 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {steps.map(([number, icon, title, description], index) => (
              <article key={number} className={`grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-x-3 rounded-2xl border p-4 shadow-sm shadow-black/[0.025] sm:block sm:p-6 ${stepColors[index].card}`}>
                <div className="contents sm:flex sm:items-center sm:justify-between">
                  <span className={`col-start-1 row-start-1 flex size-10 items-center justify-center rounded-xl sm:size-12 sm:rounded-2xl ${stepColors[index].accent}`}>
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5 sm:size-6"><path d={icon} /></svg>
                  </span>
                  <span className={`col-start-3 row-start-1 text-[10px] font-semibold tracking-widest sm:text-xs ${stepColors[index].number}`}>{number}</span>
                </div>
                <h3 className="col-start-2 row-start-1 text-sm leading-5 font-semibold text-[#111111] sm:mt-7 sm:text-base sm:leading-6">{title}</h3>
                <p className="col-span-3 mt-3 text-sm leading-6 text-gray-600">{description}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-[#00875A]/10 bg-white px-6 py-4 text-center text-sm font-medium text-[#007D53]">Simple, local and designed to make delivery easier.</p>
        </section>

        <section id="zones" aria-labelledby="zones-heading" className={`${container} ${sectionFrame} grid content-center items-center gap-10 max-sm:gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16`}>
          <div className="max-sm:mx-auto max-sm:w-full max-sm:max-w-lg max-sm:text-center">
            <p className={eyebrow}>Delivery zones</p>
            <h2 id="zones-heading" className={heading}>Across Agadir.<br />Closer to you.</h2>
            <p className="mt-5 leading-7 text-gray-600 max-sm:text-pretty">From your neighborhood to nearby towns, Toslo makes local delivery simple.</p>
            <a href={createWhatsAppUrl("Can you confirm delivery availability between my pickup and destination?")} className={`${primary} mt-7 max-sm:max-w-full`}><span className="sm:hidden">Check delivery availability</span><span className="hidden sm:inline">Confirm delivery on WhatsApp</span><span aria-hidden="true">↗</span></a>
            <p className="mt-3 text-sm leading-6 text-gray-500">Send your pickup and destination to check availability.</p>
          </div>
          <DeliveryAreas zones={zones} />
        </section>

        <section id="pricing" aria-labelledby="pricing-heading" className={`${sectionFrame} flex items-center justify-center border-y border-gray-100 bg-[#FAFAF8]`}>
          <div className={container}>
            <div className="mx-auto max-w-2xl text-center">
              <p className={eyebrow}>Pricing</p>
              <h2 id="pricing-heading" className={heading}>Simple delivery pricing</h2>
              <p className="mt-4 leading-7 text-gray-600">Choose the delivery that fits your day. All prices in Moroccan dirhams.</p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pricing.map(({ title, price, popular, features }) => (
                <article key={title} className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm shadow-black/5 ${popular ? "border-[#00875A] ring-1 ring-[#00875A]" : "border-gray-200"}`}>
                  {popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#00875A] px-4 py-1 text-xs font-semibold text-white">Popular</span>}
                  <h3 className="text-base font-semibold text-[#111111]">{title}</h3>
                  <p className="mt-5 text-xs text-gray-500">From</p>
                  <p className="mt-1 flex items-baseline gap-2"><span className="text-4xl font-bold tracking-tight text-[#111111]">{price}</span><span className="text-sm font-semibold text-gray-500">MAD</span></p>
                  <ul className="my-6 space-y-3">
                    {features.map(feature => <li key={feature} className="flex gap-2 text-sm leading-5 text-gray-600"><span aria-hidden="true" className="text-[#00875A]">✓</span>{feature}</li>)}
                  </ul>
                  <a href={createWhatsAppUrl(`I’m interested in ${title.toLowerCase()}. I’d like to order.`)} aria-label={`Order ${title.toLowerCase()} on WhatsApp`} className={`${popular ? whatsapp : primary} mt-auto w-full`}>Order delivery <span aria-hidden="true">↗</span></a>
                </article>
              ))}
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5">
                <div><h3 className="text-sm font-semibold text-[#111111]">By distance</h3><p className="mt-2 text-sm text-gray-600">From <span className="font-semibold text-[#007D53]">25 MAD</span> · +5 MAD per additional km</p></div>
                <a href={createWhatsAppUrl("I’d like a distance-based delivery quote.")} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#007D53]">Get a quote <span aria-hidden="true">↗</span></a>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5">
                <div><h3 className="text-sm font-semibold text-[#111111]">Business delivery</h3><p className="mt-2 text-sm text-gray-600">A tailored service, priced on request.</p></div>
                <a href={businessWhatsAppUrl} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#007D53]">Let’s talk <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
        </section>

        <section id="business" aria-labelledby="business-heading" className={`${container} ${sectionFrame} flex flex-col justify-center`}>
          <div className="grid items-center gap-12 max-sm:gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="max-sm:text-center">
              <p className={eyebrow}>For local businesses</p>
              <h2 id="business-heading" className={heading}>You run your business.<br />We deliver<span className="text-[#00875A]">.</span></h2>
              <p className="mt-5 max-w-md leading-7 text-gray-600 max-sm:mx-auto max-sm:text-pretty">Keep your focus on your customers. Toslo handles local pickups and deliveries across Agadir.</p>
              <a href={businessWhatsAppUrl} className={`${primary} mt-7`}>Let’s talk delivery <span aria-hidden="true">↗</span></a>
              <p className="mt-3 text-xs leading-5 text-gray-500">Tell us about your business on WhatsApp.</p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white px-6 shadow-sm shadow-black/[0.025] max-sm:px-4 sm:px-8">
              <ol className="divide-y divide-gray-100">
                {[
                  ["01", "Your orders, ready to go", "Prepare your orders and share the pickup and delivery details."],
                  ["02", "We take it from here", "A local Toslo driver collects from your shop."],
                  ["03", "Straight to your customer", "We handle the journey to their doorstep."],
                ].map(([number, title, description]) => (
                  <li key={number} className="flex gap-5 py-7 max-sm:gap-3 max-sm:py-4 sm:py-8">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#ECFDF5] text-xs font-semibold text-[#007D53]">{number}</span>
                    <div>
                      <h3 className="pt-1 text-base font-semibold text-[#111111]">{title}</h3>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-600">{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:gap-8">
            <p className="shrink-0 text-xs font-semibold text-gray-500">Made for local business</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {["Restaurants", "Instagram sellers", "Shops", "E-commerce", "Local businesses"].map(label => (
                <li key={label} className="flex items-center gap-2 text-xs font-medium text-gray-600"><span aria-hidden="true" className="size-1 rounded-full bg-[#00875A]/60" />{label}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="reviews" aria-labelledby="reviews-heading" className={`${sectionFrame} flex items-center justify-center bg-[#FAFAF8]`}>
          <div className={container}><div className="mx-auto max-w-2xl text-center"><p className={eyebrow}>Customer reviews</p><h2 id="reviews-heading" className={heading}>What our customers say</h2><p className="mt-4 leading-7 text-gray-600">See what customers think about their Toslo delivery experience.</p></div>
            <div className="mt-8 min-h-80 w-full [&_a[href*='elfsight.com']]:hidden!">
              <div
                className="elfsight-app-6365c76a-bfbd-46e1-b404-5cb7e6177859"
                data-elfsight-app-lazy=""
              />
            </div>
            <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />

            <div className="mt-8 text-center"><a href="https://maps.app.goo.gl/X78CjoVafbTbxb4R6" target="_blank" rel="noopener noreferrer" className={secondary}>View reviews on Google<span className="sr-only"> (opens in a new tab)</span></a></div>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-heading" className={`${container} ${sectionFrame} grid content-center items-center gap-10 max-sm:gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <div className="max-sm:text-center"><p className={eyebrow}>FAQ</p><h2 id="faq-heading" className={heading}>Frequently<br />asked questions</h2><p className="mt-5 leading-7 text-gray-600">A few things to know before your next delivery.</p><a href="#contact" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#007D53]">Still have a question? <span aria-hidden="true">↗</span></a></div>
          <div className="divide-y divide-gray-200 border-y border-gray-200">{faqs.map(([question, answer]) => <details key={question} className="group py-1"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-[#00875A] [&::-webkit-details-marker]:hidden">{question}<span aria-hidden="true" className="text-xl font-normal text-[#007D53] group-open:rotate-45">+</span></summary><p className="pb-5 pr-7 text-sm leading-7 text-gray-600">{answer}</p></details>)}</div>
        </section>


        <ContactSection />
      </main>

      <footer className="bg-[#FAFAF8] pt-16 pb-28 max-sm:pt-10 max-sm:pb-20">
        <div className={container}><div className="grid gap-10 max-sm:grid-cols-2 max-sm:gap-x-5 max-sm:gap-y-6 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]"><div className="max-sm:col-span-2 max-sm:text-center"><Link href="/" className="text-2xl font-bold tracking-tight text-[#00875A]">Toslo Delivery</Link><p className="mt-4 max-w-xs text-sm leading-7 text-gray-600 max-sm:mx-auto max-sm:mt-2">Local delivery made simple in Agadir.</p></div>
          {[{ title: "Company", links: [["Contact", "#contact"], ["Reviews", "#reviews"]] }, { title: "Services", links: [["Food delivery", "/services"], ["Parcels", "/services"], ["Documents", "/services"], ["Business delivery", "#business"]] }, { title: "Useful links", links: [["Delivery zones", "#zones"], ["Pricing", "#pricing"], ["Become a driver", "#"]] }].map(column => <div key={column.title} className={column.title === "Services" ? "max-sm:col-start-2 max-sm:row-start-2 max-sm:row-span-2" : column.title === "Company" ? "max-sm:col-start-1 max-sm:row-start-2" : "max-sm:col-start-1 max-sm:row-start-3"}><h3 className="text-sm font-semibold">{column.title}</h3><ul className="mt-4 space-y-1 max-sm:mt-2 max-sm:space-y-0">{column.links.map(([label, href]) => <li key={label}><Link href={href} className="inline-flex min-h-11 items-center text-sm text-gray-600 hover:text-[#007D53]">{label}</Link></li>)}</ul></div>)}
        </div><div className="mt-12 border-t border-gray-200 pt-6 text-xs text-gray-600 max-sm:mt-8 max-sm:text-center">© Toslo Delivery</div></div>
      </footer>
      <FloatingWhatsApp />
    </div>
  );
}
