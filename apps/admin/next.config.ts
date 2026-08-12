import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@gytev/config", "@gytev/types"],
};

export default nextConfig;
