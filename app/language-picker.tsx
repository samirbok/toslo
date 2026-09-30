import { chooseLanguage } from "./i18n/actions";
import { languageNames, translator, type Locale } from "./i18n/translations";

const languageFlags: Record<Locale, string> = { en: "🇬🇧", fr: "🇫🇷", ar: "🇲🇦" };

export default function LanguagePicker({ locale, destination = "/" }: { locale?: Locale; destination?: string }) {
  const t = translator(locale ?? "en");
  return (
    <form action={chooseLanguage}>
      <input type="hidden" name="destination" value={destination} />
      <fieldset className="flex flex-wrap items-center justify-center gap-2" dir="ltr">
        <legend className={locale ? "mb-3 w-full text-center text-sm text-gray-600" : "sr-only"}>{t("Change language")}</legend>
        {(Object.keys(languageNames) as Locale[]).map(language => (
          <button key={language} type="submit" name="language" value={language} lang={language} aria-label={languageNames[language]} aria-pressed={locale ? locale === language : undefined} className={`flex min-h-20 min-w-16 flex-col items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00875A] sm:px-5 ${locale === language ? "bg-[#ECFDF5] text-[#007D53] ring-1 ring-[#00875A]/25" : "text-gray-600 hover:bg-[#ECFDF5] hover:text-[#007D53]"}`}>
            <span aria-hidden="true" className="text-4xl leading-none">{languageFlags[language]}</span>
            <span>{languageNames[language]}</span>
          </button>
        ))}
      </fieldset>
    </form>
  );
}

export function LanguageWelcome({ destination = "/" }: { destination?: string }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#FAFAF8] px-6 py-12" dir="ltr">
      <section aria-labelledby="language-heading" className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">
        <p className="text-4xl font-extrabold tracking-tight text-[#00875A]">Toslo.</p>
        <h1 id="language-heading" className="mt-8 text-2xl font-bold text-[#111111]">Choose your language</h1>
        <p lang="fr" className="mt-3 text-gray-600">Choisissez votre langue</p>
        <p lang="ar" dir="rtl" className="mt-3 text-lg text-gray-600">اختر لغتك</p>
        <div className="mt-8"><LanguagePicker destination={destination} /></div>
      </section>
    </main>
  );
}
