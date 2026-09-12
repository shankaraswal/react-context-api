import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/react-context-api',
  images: {
    unoptimized: true, // Next.js Image Optimization को static export के लिए disable करने हेतु
  },
};

export default nextConfig;
