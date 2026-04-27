import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // typedRoutes: re-enable once all routes are scaffolded (Phase 8)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
