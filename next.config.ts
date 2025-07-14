import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // tsconfigPath: "tsconfig.dev.json",
  reactStrictMode: false, // Disable for faster renders
  swcMinify: false, // Disable minification
  compress: false, // No compression in dev
  poweredByHeader: false,

  // Disable all image optimization
  images: {
    unoptimized: true,
    domains: [], // Empty array disables all remote images
  },

  // Aggressive memory management
  onDemandEntries: {
    maxInactiveAge: 1000 * 5, // 5 seconds (down from 10)
    pagesBufferLength: 1, // Minimum buffer
  },

  // Disable all experimental features
  experimental: {
    // serverActions: false,
    // turbo: false,
    optimizePackageImports: [], // No import optimization
    serverSourceMaps: true, // BUT keep source maps for debugging
    // instrumentationHook: false,
    webpackBuildWorker: false,
  },

  // Disable type checking during dev (use IDE instead)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Reduce logging
  logging: {
    fetches: {
      fullUrl: false,
    },
    // level: "error", // Only show errors
  },

  // Webpack config override for dev only
  webpack: (config, { isServer, dev }) => {
    if (dev) {
      // Disable some heavy processing
      config.optimization.minimize = false;
      config.optimization.removeAvailableModules = false;
      config.optimization.removeEmptyChunks = false;
      config.optimization.splitChunks = false;

      // But keep source maps
      config.devtool = "eval-source-map";
    }
    return config;
  },
};

export default nextConfig;
