import "~/styles/global.css";

import Link from "next/link";
import { Metadata } from "next";
import { Cursors } from "./components/Cursors";

export const metadata: Metadata = {
  title: "powerjade.me",
  description:
    "This is a static website blog created via a github issue. I used the next.js 13 framework with it.",
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#fff",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#000",
    },
  ],
  icons: {
    icon: [
      {
        url: "/icons/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icons/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        url: "/icons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      { sizes: "57x57", url: "/icons/apple-icon-57x57.png" },
      { sizes: "60x60", url: "/icons/apple-icon-60x60.png" },
      { sizes: "72x72", url: "/icons/apple-icon-72x72.png" },
      { sizes: "76x76", url: "/icons/apple-icon-76x76.png" },
      { sizes: "114x114", url: "/icons/apple-icon-114x114.png" },
      { sizes: "120x120", url: "/icons/apple-icon-120x120.png" },
      { sizes: "144x144", url: "/icons/apple-icon-144x144.png" },
      { sizes: "152x152", url: "/icons/apple-icon-152x152.png" },
      { sizes: "180x180", url: "/icons/apple-icon-180x180.png" },
      { sizes: "192x192", url: "/icons/android-icon-192x192.png" },
      { sizes: "32x32", url: "/icons/favicon-32x32.png" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Cursors />
        <div className="max-w-xl mx-auto">
          <header className="py-10 px-4 [&~main]:pt-0">
            <Link href="/" className="text-lg italic font-bold">
              powerjade.me
            </Link>
          </header>
          <main className="p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
