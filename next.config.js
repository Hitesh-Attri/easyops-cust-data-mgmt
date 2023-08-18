/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Set Cache-Control header to prevent caching for API routes
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
      {
        // Set Cache-Control header for other routes (adjust as needed)
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
