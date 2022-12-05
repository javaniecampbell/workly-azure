/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ["images.unsplash.com", "tailwindui.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
