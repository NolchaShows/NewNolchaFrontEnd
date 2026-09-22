import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Tree-shake icon/animation packages at module-level (avoids barrel-file bloat)
    optimizePackageImports: ["lucide-react", "react-icons", "@react-spring/web"],
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/white-label",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      // Cloudflare R2 buckets used for Nolcha media
      {
        protocol: 'https',
        hostname: 'pub-3dc8ce9c3aeb451d8c5fe66c623ea48c.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev',
      },
      // Strapi backend hosts
      {
        protocol: 'https',
        hostname: 'new-nolcha-strapi-uiai.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'new-nolcha-strapi.onrender.com',
      },
      // Local development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Only print source-map upload logs in CI
  silent: !process.env.CI,

  // Wider client upload = clearer production stack traces
  widenClientFileUpload: true,

  // Route browser events through Next.js to reduce ad-blocker drops
  tunnelRoute: "/monitoring",

  // Tree-shake Sentry logger statements in production builds
  disableLogger: true,
});
