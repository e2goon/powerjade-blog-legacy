import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === "production";
  return isProd
    ? {
        rules: {
          userAgent: "*",
          allow: ["/", "/post/$"],
        },
        sitemap: "https://powerjade.me/sitemap.xml",
      }
    : {
        rules: {
          userAgent: "*",
          disallow: "/",
        },
      };
}
