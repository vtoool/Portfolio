/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos"],
  },
  experimental: {
    serverComponentsExternalPackages: ['next-intl']
  }
};
module.exports = nextConfig;