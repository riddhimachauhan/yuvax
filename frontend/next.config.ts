import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  // Optional: Add webpack alias as backup
  // webpack: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     '@': '.',
  //   };
  //   return config;
  // },
  // output: "export",
  images: {
    unoptimized: true, // disables Image Optimization API
  },
};

import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const config = {
  ...nextConfig,
  reactStrictMode: true,
};

export default bundleAnalyzer(config);