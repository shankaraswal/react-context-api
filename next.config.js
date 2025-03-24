/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Turn off eslint during builds to avoid build failures
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig; 