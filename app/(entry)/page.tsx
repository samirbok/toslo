import { LanguageWelcome } from "../language-picker";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata("Toslo | Choose your language · Choisissez votre langue · اختر لغتك", "Choose Arabic, French or English to request local delivery with Toslo in Agadir. اختر لغتك لطلب التوصيل مع توسلو.", "");

export default function Home() {
  return <LanguageWelcome />;
}
