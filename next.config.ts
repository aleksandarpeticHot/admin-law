import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // Enables SWC-based styled-components support
  },
  experimental: {
    forceSwcTransforms: true, // ✅ Forces SWC even with Babel
  }
};

export default nextConfig;
