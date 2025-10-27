import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./next-intl.config.ts');

const nextConfig: NextConfig = {
  cacheComponents: true, // Cache Components вместо experimental.ppr
  experimental: {
    turbopackFileSystemCacheForDev: true, // Turbopack FS cache
  },
  // Turbopack теперь по умолчанию, webpack не нужен
};

export default withNextIntl(nextConfig);
