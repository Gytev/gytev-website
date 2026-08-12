import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@gytev/ui",
    "@gytev/config",
    "@gytev/i18n",
    "@gytev/types",
    "@gytev/design-system",
  ],
};

export default nextConfig;
