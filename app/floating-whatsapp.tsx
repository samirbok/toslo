"use client";

import { translator, type Locale } from "./i18n/translations";


import { useEffect, useState } from "react";
import { createWhatsAppUrl } from "./contact-links";

export default function FloatingWhatsApp({ locale = "en" }: { locale?: Locale }) {
  const t = translator(locale);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { rootMargin: "-81px 0px 0px 0px" },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  if (contactVisible) return null;

  return (
    <a
      href={createWhatsAppUrl("I'd like to request a delivery.", locale)}
      aria-label={t("Chat with Toslo on WhatsApp")}
      title={t("Chat on WhatsApp")}
      className="fixed right-4 bottom-4 z-40 flex size-12 items-center justify-center rounded-full bg-[#00875A] text-white shadow-lg shadow-black/15 transition-colors hover:bg-[#007D53] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00875A] sm:right-6 sm:bottom-6 sm:size-14"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-7">
        <path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.47 0 .12 5.35.12 11.93c0 2.1.55 4.15 1.59 5.96L0 24l6.26-1.64a11.94 11.94 0 0 0 5.79 1.48h.01c6.57 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.19-3.47-8.43ZM12.06 21.82a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98.99-3.63-.23-.37a9.86 9.86 0 0 1-1.52-5.28c0-5.47 4.45-9.92 9.93-9.92a9.84 9.84 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.88-9.97 9.88Zm5.44-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.21 3.08c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.69.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
