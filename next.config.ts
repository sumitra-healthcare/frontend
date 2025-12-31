import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
  /*
  // Transpile ESM packages that don't work well with Next.js
  transpilePackages: ['@react-pdf/renderer'],
  // Externalize @react-pdf packages for server-side
  serverExternalPackages: ['@react-pdf/renderer', '@react-pdf/pdfkit', '@react-pdf/layout'],
  experimental: {
    esmExternals: 'loose',
  },
  // Webpack configuration to handle @react-pdf ESM issues
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Externalize @react-pdf packages on server to avoid ESM issues
      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals.push('@react-pdf/renderer');
      }
    }
    return config;
  },
  */
};

export default nextConfig;
