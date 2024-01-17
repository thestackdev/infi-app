/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["infiapp-ads.s3.ap-south-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
