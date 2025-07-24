import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "swiperjs.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "assets.codepen.io"
      }
    ],
  },
  env: {
    FOLJ_SONG_DOMAIN: process.env.FOLJ_SONG_DOMAIN,
    FOLJ_API_VERSION: process.env.FOLJ_API_VERSION,
  },
};

export default nextConfig;
