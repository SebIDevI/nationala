/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "files.stripe.com", "localhost"],
  },
};

module.exports = nextConfig;
