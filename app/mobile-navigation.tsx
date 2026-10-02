"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { translator, type Locale } from "./i18n/translations";

const items = [
  { label: "Services", section: "services", icon: "M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z" },
  { label: "How it works", section: "how-it-works", icon: "M9 6h11 M9 12h11 M9 18h11 M3 6h1 M3 12h1 M3 18h1" },
  { label: "Pricing", section: "pricing", icon: "M20 13 11 22 2 13V4h9l9 9Z M7 8h.01" },
  { label: "Zones", section: "zones", icon: "M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" },
  { label: "Reviews", section: "reviews", icon: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" },
  { label: "Contact", section: "contact", icon: "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" },
];

export default function MobileNavigation({ home = false, locale = "en" }: { home?: boolean; locale?: Locale }) {
  const t = translator(locale);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function scrollToSection(section: string) {
    document.getElementById(section)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });
  }

  // Sections mount after client navigation (or after choosing a language).
  useEffect(() => {
    if (pathname !== "/") return;
    const section = window.location.hash.slice(1);
    if (!items.some(item => item.section === section && section !== "services")) return;
    const frame = window.requestAnimationFrame(() => scrollToSection(section));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  function selectLink(event: MouseEvent<HTMLAnchorElement>, section: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setOpen(false);
    if (pathname !== "/" || section === "services") return;

    // Scroll explicitly after closing the dropdown, including repeated hash clicks.
    event.preventDefault();
    if (window.location.hash !== `#${section}`) {
      window.history.pushState(window.history.state, "", `#${section}`);
    }
    window.requestAnimationFrame(() => scrollToSection(section));
  }

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      ref={menuRef}
      className="lg:hidden"
      onKeyDown={event => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
      onBlur={event => {
        // Touch browsers may report no next focus target before dispatching click.
        // Outside pointer events already handle tapping away from the menu.
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={t("Navigation menu")}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(current => !current)}
        className={`flex size-11 cursor-pointer items-center justify-center rounded-2xl border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00875A] motion-reduce:transition-none ${open ? "border-[#00875A]/20 bg-[#ECFDF5] dark:bg-[#203C2E] text-[#007D53] dark:text-[#69D5A3]" : "border-[#00875A]/10 bg-white dark:bg-[#1B2822] text-[#007D53] dark:text-[#69D5A3] shadow-sm hover:bg-[#ECFDF5] dark:hover:bg-[#203C2E]"}`}
      >
        <span aria-hidden="true" className="relative block h-4 w-5">
          <span className={`absolute start-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-200 motion-reduce:transition-none ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`absolute start-0 top-[7px] h-0.5 w-4 rounded-full bg-current transition-opacity duration-200 motion-reduce:transition-none ${open ? "opacity-0" : "opacity-100"}`} />
          <span className={`absolute start-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition-transform duration-200 motion-reduce:transition-none ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </span>
      </button>

      <div
        id={menuId}
        aria-hidden={!open}
        inert={!open}
        className={`absolute inset-x-4 top-[calc(100%+8px)] origin-top overflow-hidden rounded-3xl border border-[#00875A]/10 bg-white dark:bg-[#1B2822] shadow-[0_16px_48px_-12px_rgba(0,65,43,0.22)] transition-[opacity,transform,visibility] duration-200 motion-reduce:transition-none sm:inset-x-auto sm:start-6 sm:w-80 ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
      >
        <div className="flex items-center justify-between border-b border-[#00875A]/[0.07] bg-[#FAFAF8] dark:bg-[#101A15] px-5 py-4">
          <span className="text-xs font-semibold text-[#5B6472] dark:text-[#B9C6BD]">{t("Navigation menu")}</span>
          <span aria-hidden="true" className="h-1 w-7 rounded-full bg-[#E5A83B]" />
        </div>
        <ul className="max-h-[calc(100dvh-168px)] space-y-1 overflow-y-auto overscroll-contain p-2">
          {items.map(({ label, section, icon }) => {
            const href = section === "services" ? "/services" : `${home ? "" : "/"}#${section}`;
            const active = section === "services" && pathname === "/services";
            return (
              <li key={section}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={event => selectLink(event, section)}
                  className={`group flex min-h-12 items-center gap-3 rounded-2xl px-3 py-2 text-sm font-semibold transition-colors duration-150 hover:bg-[#ECFDF5] dark:hover:bg-[#203C2E] hover:text-[#007D53] dark:hover:text-[#69D5A3] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#00875A] motion-reduce:transition-none ${active ? "bg-[#ECFDF5] dark:bg-[#203C2E] text-[#007D53] dark:text-[#69D5A3]" : "text-[#171717] dark:text-[#F2F5F3]"}`}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#00875A]/[0.06] text-[#007D53] dark:text-[#69D5A3]">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><path d={icon} /></svg>
                  </span>
                  {t(label)}
                  {active && <span aria-hidden="true" className="ms-auto size-1.5 rounded-full bg-[#E5A83B]" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
