import Link from "next/link";
import BrandLogo from "./brand-logo";
import { translator, type Locale } from "./i18n/translations";

const groups = [
  { title: "Company", links: [["Contact", "#contact"], ["Reviews", "#reviews"]] },
  { title: "Services", links: [["Food delivery", "/#services"], ["Parcels", "/#services"], ["Documents", "/#services"], ["Business delivery", "#business"]] },
  { title: "Useful links", links: [["Delivery zones", "#zones"], ["Pricing", "#pricing"], ["Become a driver", "#contact"]] },
];

export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const linkStyle = "inline-flex min-h-11 items-center py-2 text-sm leading-5 text-[#5B6472] transition-colors hover:text-[#007D53] dark:text-[#B9C6BD] dark:hover:text-[#69D5A3]";

  return (
    <footer className="border-t border-[#00875A]/10 bg-[#FAFAF8] pt-7 pb-[max(1.5rem,env(safe-area-inset-bottom))] dark:border-[#34483B] dark:bg-[#101A15] lg:pt-12">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="lg:grid lg:grid-cols-[1.3fr_0.8fr_1fr_1fr] lg:gap-10">
          <div className="text-center lg:text-start">
            <Link href="/" className="inline-flex"><BrandLogo className="size-20" /></Link>
            <p className="mx-auto mt-2 max-w-[240px] text-sm leading-6 text-[#5B6472] dark:text-[#B9C6BD] lg:mx-0">{t("Local delivery made simple in Agadir.")}</p>
          </div>

          <div className="mx-auto mt-6 max-w-md overflow-hidden rounded-2xl border border-[#00875A]/10 bg-white px-4 shadow-sm shadow-black/[0.02] dark:border-[#34483B] dark:bg-[#1B2822] lg:hidden">
            {groups.map(group => (
              <details key={group.title} className="group border-b border-[#00875A]/10 last:border-0 dark:border-[#34483B]">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm font-semibold text-[#171717] focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#00875A] dark:text-[#F2F5F3] [&::-webkit-details-marker]:hidden">
                  {t(group.title)}
                  <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#00875A]/5 text-[#007D53] dark:bg-[#203C2E] dark:text-[#69D5A3]">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="size-3 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"><path d="M8 3v10 M3 8h10" /></svg>
                  </span>
                </summary>
                <nav aria-label={t(group.title)} className="pb-3">
                  <ul className="grid grid-cols-2 gap-x-4">
                    {group.links.map(([label, href]) => <li key={label}><Link href={href} className={linkStyle}>{t(label)}</Link></li>)}
                  </ul>
                </nav>
              </details>
            ))}
          </div>

          {groups.map(group => (
            <nav key={group.title} aria-label={t(group.title)} className="hidden pt-4 lg:block">
              <h2 className="text-sm font-semibold text-[#171717] dark:text-[#F2F5F3]">{t(group.title)}</h2>
              <ul className="mt-3">{group.links.map(([label, href]) => <li key={label}><Link href={href} className={linkStyle}>{t(label)}</Link></li>)}</ul>
            </nav>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-gray-500 dark:text-[#A4B4A9] lg:mt-10 lg:border-t lg:border-[#00875A]/10 lg:pt-6 dark:lg:border-[#34483B]">{t("© Toslo Delivery")}</p>
      </div>
    </footer>
  );
}
