import { notFound } from "next/navigation";
import Home from "../home-content";
import { isLocale } from "../i18n/translations";
import { localizedMetadata } from "../seo";

export function generateStaticParams() {
  return ["ar", "fr", "en"].map(locale => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return localizedMetadata(locale);
}

export default function LocaleHome() {
  return <Home />;
}
