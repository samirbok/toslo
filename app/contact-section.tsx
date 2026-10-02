import { translator, type Locale } from "./i18n/translations";
import { createWhatsAppUrl, deliveryPhone, deliveryPhoneUrl, instagramUrl, tiktokUrl } from "./contact-links";

export default function ContactSection({ locale = "en" }: { locale?: Locale }) {
  const t = translator(locale);
  const contactDetails = [
    { title: "WhatsApp", value: deliveryPhone, note: "Questions & delivery requests", href: createWhatsAppUrl("I have a question.", locale), tone: "bg-[#ECFDF5] text-[#007D53]", path: "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" },
    { title: "Telephone", value: deliveryPhone, note: "Available 24/7", href: deliveryPhoneUrl, tone: "bg-[#ECFDF5] text-[#007D53]", path: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" },
    { title: "Address", value: "Agadir, Morocco", note: "View our Google Maps listing", href: "https://maps.app.goo.gl/X78CjoVafbTbxb4R6", tone: "bg-[#FFF5E4] text-[#94621B]", path: "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z M14.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" },
    { title: "Opening hours", value: "24/7 · Every day", note: "Open every day", href: undefined, tone: "bg-[#F1EDFA] text-[#6B4D91]", path: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z M12 6v6l4 2" },
  ];
  return (
    <section id="contact" aria-labelledby="contact-heading" className="flex min-h-[calc(100dvh-81px)] scroll-mt-[81px] items-center bg-[#FAFAF8] py-10 lg:py-12">
      <div className="mx-auto w-full max-w-[920px] px-6">
        <div className="mb-7 text-center sm:mb-9">
          <p className="text-xs font-bold tracking-[0.18em] text-[#007D53] uppercase">{t("Contact Toslo")}</p>
          <h2 id="contact-heading" className="mt-3 text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">{t("Let’s talk")}<span className="text-[#00875A]">.</span></h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-600">{t("A question, a delivery, or a business enquiry. We’re here for you.")}</p>
        </div>
        <div className="rounded-3xl border border-gray-200/80 bg-white p-4 shadow-sm shadow-black/[0.025] sm:p-6">
          <ul className="grid auto-rows-fr gap-3 sm:grid-cols-2 sm:gap-4">
            {contactDetails.map((detail) => {
              const Row = detail.href ? "a" : "div";
              return (
                <li key={detail.title}>
                  <Row href={detail.href} className={`grid h-full grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-4 rounded-2xl border border-gray-100 p-5 sm:min-h-32 sm:p-6 ${detail.href ? "transition-colors hover:border-[#00875A]/25 hover:bg-[#FAFAF8]" : ""}`}>
                    <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${detail.tone}`}>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d={detail.path} /></svg>
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-xs font-medium leading-5 text-gray-500">{t(detail.title)}</h3>
                      <p dir={detail.title === "WhatsApp" || detail.title === "Telephone" ? "ltr" : undefined} className="mt-1 break-words text-base font-semibold tracking-tight sm:text-lg text-[#111111]">{t(detail.value)}</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">{t(detail.note)}</p>
                    </div>
                  </Row>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 border-t border-gray-100 pt-5 sm:mt-6 sm:pt-6">
            <p className="text-sm font-medium text-gray-600 max-sm:w-full max-sm:text-center">{t("Follow Toslo")}</p>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-pink-100 bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-800 transition-colors hover:bg-pink-100">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-5"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              {t("Instagram")}<span className="sr-only"> {t("(opens in a new tab)")}</span>
            </a>
            <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#E5A83B] bg-[#E5A83B] px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-[#CF922A] hover:bg-[#CF922A]">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-5"><path d="M16.7 2h-3.4v13.4a3 3 0 1 1-2.6-3V9a6.4 6.4 0 1 0 6 6.4V8.6a8.4 8.4 0 0 0 5 1.6V6.8a5 5 0 0 1-5-4.8Z" /></svg>
              {t("TikTok")}<span className="sr-only"> {t("(opens in a new tab)")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
