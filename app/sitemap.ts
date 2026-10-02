import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Update this date when the public page content changes.
  const lastModified = "2026-10-02";

  return [
    {
      url: "https://www.delivery-agadir.com",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.delivery-agadir.com/contact",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
