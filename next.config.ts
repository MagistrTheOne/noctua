import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true, // Turbopack FS cache
  },
  // Turbopack теперь по умолчанию, webpack не нужен
};

export default nextConfig;
