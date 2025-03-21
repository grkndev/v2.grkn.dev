/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "bionluk.com",
      },
      {
        hostname: "skillicons.dev",
      },
      {
        hostname: "cdn.bionluk.com",
      },
      {
        hostname: "cdn.skillicons.dev",
      },
    ],
  },
};

export default nextConfig;
