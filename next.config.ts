import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.jsdelivr.net', 'picsum.photos'],
  },
};

export default withNextIntl(nextConfig);