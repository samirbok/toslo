import { notFound } from "next/navigation";
import SiteLayout, { metadata as siteMetadata } from "../site-layout";
import { isLocale } from "../i18n/translations";

export const metadata = siteMetadata;
export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <SiteLayout locale={locale}>{children}</SiteLayout>;
}
