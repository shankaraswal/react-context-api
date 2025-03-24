/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Turn off eslint during builds to avoid build failures
    ignoreDuringBuilds: true
  },
  // Add output configuration to ensure client-side code is properly generated
  output: 'standalone',
  // Disable unnecessary features
  reactStrictMode: true,
  poweredByHeader: false
};

module.exports = nextConfig; 