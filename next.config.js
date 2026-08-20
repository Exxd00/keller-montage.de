/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Optimize images
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // Allow dev origins for preview
  allowedDevOrigins: [
    'localhost',
    '*.preview.same-app.com',
  ],
  // Enable experimental features for better performance
  experimental: {
    // Inline critical CSS to reduce render-blocking.
    // Only in production: in dev it (critters) drastically slows down compiles.
    optimizeCss: process.env.NODE_ENV === 'production',
  },
  // Compress responses
  compress: true,
  // Power by header removal
  poweredByHeader: false,
  // Generate ETags for better caching
  generateEtags: true,
  // Strict mode for better development
  reactStrictMode: true,

  // Add security headers for thank-you page
  async headers() {
    return [
      {
        source: '/thank-you',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet, noimageindex',
          },
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
