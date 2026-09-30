"use client";

import BrandLogo from "./brand-logo";
import { useEffect, useOptimistic, useRef } from "react";
import { chooseLanguage } from "./i18n/actions";
import { languageNames, translator, type Locale } from "./i18n/translations";

const languageFlags: Record<Locale, string> = { en: "🇬🇧", fr: "🇫🇷", ar: "🇲🇦" };

export default function LanguagePicker({ locale, destination = "/" }: { locale?: Locale; destination?: string }) {
  const t = translator(locale ?? "en");
  const [selected, setSelected] = useOptimistic<Locale | undefined>(locale);
  async function selectLanguage(formData: FormData) {
    const language = formData.get("language");
    if (language === "en" || language === "fr" || language === "ar") setSelected(language);
    await chooseLanguage(formData);
  }
  return (
    <form action={selectLanguage}>
      <input type="hidden" name="destination" value={destination} />
      <fieldset className="flex flex-wrap items-center justify-center gap-2" dir="ltr">
        <legend className={locale ? "mb-3 w-full text-center text-sm text-gray-600" : "sr-only"}>{t("Change language")}</legend>
        {(Object.keys(languageNames) as Locale[]).map(language => (
          <button key={language} type="submit" name="language" value={language} lang={language} aria-label={languageNames[language]} aria-pressed={selected === language} className={`flex min-h-24 min-w-16 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border px-3 py-4 text-xs font-semibold shadow-sm transition-[background-color,border-color,box-shadow,transform] duration-200 active:scale-95 active:border-[#00875A] active:bg-[#ECFDF5] motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00875A] sm:px-5 ${selected === language ? "border-[#00875A] bg-[#ECFDF5] text-[#007D53] ring-1 ring-[#00875A]/20" : "border-gray-200 bg-white text-gray-600 hover:border-[#00875A]/50 hover:bg-[#ECFDF5] hover:text-[#007D53] hover:shadow-md"}`}>
            <span aria-hidden="true" className="text-4xl leading-none">{languageFlags[language]}</span>
            <span>{languageNames[language]}</span>
          </button>
        ))}
      </fieldset>
    </form>
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
    <main className="flex min-h-dvh items-center justify-center bg-[#FAFAF8] px-6 pt-8 pb-24 sm:pb-32" dir="ltr">
      <section aria-labelledby="language-heading" className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white px-6 py-8 text-center shadow-sm sm:p-10">
        <div ref={logoRef}><BrandLogo className="mx-auto size-32 sm:size-36" /></div>
        <h1 id="language-heading" className="mt-8 text-2xl font-bold text-[#111111]">Choose your preferred language</h1>
        <p lang="fr" className="mt-3 text-gray-600">Choisissez votre langue</p>
        <p lang="ar" dir="rtl" className="mt-3 text-xl leading-8 text-gray-600">اختر لغتك</p>
        <div className="mt-8"><LanguagePicker destination={destination} /></div>
      </section>
    </main>
  );
}
