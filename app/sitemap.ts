export const dynamic = "force-static";
import type { MetadataRoute } from "next";

const siteUrl = "https://officeandcloud.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
