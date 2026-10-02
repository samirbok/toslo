"use client";

import { translator, type Locale } from "./i18n/translations";
import { useEffect, useRef } from "react";

export default function DeliveryAreas({ zones, locale = "en" }: { zones: string[]; locale?: Locale }) {
  const t = translator(locale);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (!reducedMotion.matches) {
        Array.from(list.children).forEach((card, index) => {
          animations.push(card.animate(
            [
              { opacity: 0, transform: "translateY(18px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 500, delay: index * 65, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
          ));
        });
      }
      observer.disconnect();
    }, { threshold: 0.15 });

    const cancelMotion = () => {
      if (reducedMotion.matches) animations.forEach(animation => animation.cancel());
    };
    reducedMotion.addEventListener("change", cancelMotion);
    observer.observe(list);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", cancelMotion);
      animations.forEach(animation => animation.cancel());
    };
  }, []);

  return (
    <div id="delivery-areas" tabIndex={-1} className="scroll-mt-28 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#00875A]">
      <ul ref={listRef} aria-label={t("Delivery areas")} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {zones.map(zone => (
          <li key={zone}>
            <div className={`group flex h-full min-h-18 items-center gap-3 rounded-xl border px-4 py-4 shadow-sm shadow-black/[0.025] transition-[transform,box-shadow,border-color,background-color] duration-300 hover:border-[#00875A]/30 hover:bg-[#ECFDF5] dark:hover:bg-[#203C2E] hover:shadow-md hover:shadow-black/5 motion-safe:hover:-translate-y-1 motion-reduce:transition-none ${zone === "Agadir" ? "border-[#00875A]/20 bg-[#ECFDF5] dark:bg-[#203C2E]" : "border-gray-200/80 dark:border-[#34483B]/80 bg-white dark:bg-[#1B2822]"}`}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={`size-4 shrink-0 transition-[color,transform] duration-300 group-hover:text-[#00875A] dark:group-hover:text-[#69D5A3] motion-safe:group-hover:scale-110 motion-reduce:transition-none ${zone === "Agadir" ? "text-[#00875A] dark:text-[#69D5A3]" : "text-gray-400"}`}>
                <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span className="text-sm font-semibold text-[#1A1A1A] dark:text-[#F2F5F3]">{t(zone)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
