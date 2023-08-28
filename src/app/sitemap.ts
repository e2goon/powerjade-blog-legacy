import { MetadataRoute } from "next";

import { github } from "~/utils/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const isProd = process.env.VERCEL_ENV === "production";
  const repo = await github.issues({
    owner: "e2goon",
    name: "powerjade",
    label: ["published"],
  });
  const allIssues = repo.repository?.issues?.nodes;
  const issues =
    allIssues?.map((post) => ({
      url: `https://powerjade.me/post/${post?.number}`,
      lastModified: post?.createdAt,
    })) ?? [];
  const routes = [""].map((route) => ({
    url: `https://powerjade.me/${route}`,
    lastModified: new Date().toISOString(),
  }));
  return isProd ? [...routes, ...issues] : [];
}
