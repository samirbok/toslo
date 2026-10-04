import { LanguageWelcome } from "../language-picker";
import { localizedSeo, pageMetadata } from "../seo";

export const metadata = pageMetadata(localizedSeo.fr.title, localizedSeo.fr.description, "");

export default function Home() {
  return <LanguageWelcome />;
}
