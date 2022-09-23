const prod = process.env.NODE_ENV === "production";
const withPWA = require("next-pwa")({
  disable: prod ? false : true,
  dest: "public",
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: [
      "octodex.github.com",
      "user-images.githubusercontent.com",
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = withPWA(nextConfig);
