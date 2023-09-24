/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['www.maid.uz'],
  }
}

export default nextConfig
