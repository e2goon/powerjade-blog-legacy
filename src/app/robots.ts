import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/post/$"],
    },
    sitemap: "https://powerjade.me/sitemap.xml",
  };
}
