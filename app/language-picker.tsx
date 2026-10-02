"use client";

import BrandLogo from "./brand-logo";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { languageNames, translator, type Locale } from "./i18n/translations";

const languageFlags: Record<Locale, string> = { en: "🇬🇧", fr: "🇫🇷", ar: "🇲🇦" };

const languageSessionKey = "toslo-visit-language";
const languageChangeEvent = "toslo-language-change";
let visitLocale: Locale | null = null;

function getVisitLocale(): Locale | null {
  try {
    const saved = window.sessionStorage.getItem(languageSessionKey);
    if (saved === "en" || saved === "fr" || saved === "ar") return saved;
  } catch {
    // Keep navigation working when the browser blocks storage.
  }
  return visitLocale;
}

function selectVisitLanguage(locale: Locale) {
  visitLocale = locale;
  try {
    window.sessionStorage.setItem(languageSessionKey, locale);
  } catch {
    // The in-memory choice still works without storage access.
  }
  window.dispatchEvent(new Event(languageChangeEvent));
}

function subscribeToLanguage(onChange: () => void) {
  window.addEventListener(languageChangeEvent, onChange);
  return () => window.removeEventListener(languageChangeEvent, onChange);
}

function getServerLocale(): null {
  return null;
}

const LanguageVisitContext = createContext<{
  locale: Locale | null;
  selectLanguage: (locale: Locale) => void;
} | null>(null);

export function useVisitLocale(): Locale {
  return useContext(LanguageVisitContext)?.locale ?? "en";
}

export function LanguageVisit({ children }: { children: ReactNode }) {
  // Keep the choice across navigation and refreshes within this browser session.
  const locale = useSyncExternalStore(subscribeToLanguage, getVisitLocale, getServerLocale);
  const pathname = usePathname();
  const isPublicPage = pathname === "/" || pathname === "/services";

  useEffect(() => {
    document.documentElement.lang = locale ?? "en";
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return (
    <LanguageVisitContext.Provider value={{ locale, selectLanguage: selectVisitLanguage }}>
      {isPublicPage && !locale ? <LanguageWelcome destination={pathname} /> : children}
    </LanguageVisitContext.Provider>
  );
}

export default function LanguagePicker({ locale, destination = "/" }: { locale?: Locale; destination?: string }) {
  const visit = useContext(LanguageVisitContext);
  const t = translator(locale ?? "en");
  const router = useRouter();
  const pathname = usePathname();
  const selected = visit?.locale ?? locale;

  function selectLanguage(language: Locale) {
    // A tap advances immediately, even when the preview blocks cookies/storage.
    visit?.selectLanguage(language);
    if (pathname !== destination) router.replace(destination);
  }

  return (
    <div>
      <fieldset className="flex flex-wrap items-center justify-center gap-2" dir="ltr">
        <legend className={locale ? "mb-3 w-full text-center text-sm text-gray-600 dark:text-[#B9C6BD]" : "sr-only"}>{t("Change language")}</legend>
        {(Object.keys(languageNames) as Locale[]).map(language => (
          <button key={language} type="button" onClick={() => selectLanguage(language)} lang={language} aria-label={languageNames[language]} aria-pressed={selected === language} className={`flex min-h-24 min-w-16 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border px-3 py-4 text-xs font-semibold shadow-sm transition-[background-color,border-color,box-shadow,transform] duration-200 active:scale-95 active:border-[#00875A] active:bg-[#ECFDF5] dark:active:bg-[#203C2E] motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00875A] sm:px-5 ${selected === language ? "border-[#00875A] bg-[#ECFDF5] dark:bg-[#203C2E] text-[#007D53] dark:text-[#69D5A3] ring-1 ring-[#00875A]/20" : "border-gray-200 dark:border-[#34483B] bg-white dark:bg-[#1B2822] text-gray-600 dark:text-[#B9C6BD] hover:border-[#00875A]/50 hover:bg-[#ECFDF5] dark:hover:bg-[#203C2E] hover:text-[#007D53] dark:hover:text-[#69D5A3] hover:shadow-md"}`}>
            <span aria-hidden="true" className="text-4xl leading-none">{languageFlags[language]}</span>
            <span>{languageNames[language]}</span>
          </button>
        ))}
      </fieldset>
    </div>
  );
}

export function LanguageWelcome({ destination = "/" }: { destination?: string }) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const animation = logo.animate([
      { opacity: 0, transform: "translateY(12px) scale(0.96)", offset: 0 },
      { opacity: 1, transform: "translateY(0) scale(1)", offset: 0.2 },
      { opacity: 1, transform: "translateY(-6px) scale(1)", offset: 0.45 },
      { opacity: 1, transform: "translateY(0) scale(1)", offset: 0.7 },
      { opacity: 1, transform: "translateY(-3px) scale(1)", offset: 0.85 },
      { opacity: 1, transform: "translateY(0) scale(1)", offset: 1 },
    ], { duration: 4500, easing: "ease-in-out", iterations: 1 });

    const stopMotion = () => { if (reducedMotion.matches) animation.cancel(); };
    reducedMotion.addEventListener("change", stopMotion);
    return () => {
      animation.cancel();
      reducedMotion.removeEventListener("change", stopMotion);
    };
  }, []);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#FAFAF8] dark:bg-[#101A15] px-6 pt-8 pb-24 sm:pb-32" dir="ltr">
      <section aria-labelledby="language-heading" className="w-full max-w-lg rounded-3xl border border-gray-200 dark:border-[#34483B] bg-white dark:bg-[#1B2822] px-6 py-8 text-center shadow-sm sm:p-10">
        <div ref={logoRef}><BrandLogo className="mx-auto size-32 sm:size-36" /></div>
        <h1 id="language-heading" className="mt-8 text-2xl font-bold text-[#111111] dark:text-[#F2F5F3]">Choose your preferred language</h1>
        <p lang="fr" className="mt-3 text-gray-600 dark:text-[#B9C6BD]">Choisissez votre langue</p>
        <p lang="ar" dir="rtl" className="mt-3 text-xl leading-8 text-gray-600 dark:text-[#B9C6BD]">اختر لغتك</p>
        <div className="mt-8"><LanguagePicker destination={destination} /></div>
      </section>
    </main>
  );
}
