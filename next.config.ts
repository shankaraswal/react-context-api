import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/react-context-api',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // Build के दौरान ESLint एरर इग्नोर करने के लिए
  },
  typescript: {
    ignoreBuildErrors: true, // Build के दौरान TypeScript एरर इग्नोर करने के लिए
  },
};

export default nextConfig;
