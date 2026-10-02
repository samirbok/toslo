import type { MetadataRoute } from "next";
import { languageAlternates } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Services and contact are homepage sections; their redirect URLs are excluded.
  return Object.values(languageAlternates).map(url => ({
    url,
    lastModified: "2026-10-02",
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages: languageAlternates },
  }));
}
