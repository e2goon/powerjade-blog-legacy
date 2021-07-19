const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const prod = process.env.NODE_ENV === "production";

module.exports = withPWA({
  devIndicators: {
    autoPrerender: false,
  },
  pwa: {
    disable: prod ? false : true,
    dest: "public",
    runtimeCaching,
  },
  images: {
    domains: [
      "octodex.github.com",
      "user-images.githubusercontent.com",
      "avatars.githubusercontent.com",
    ],
  },
});
