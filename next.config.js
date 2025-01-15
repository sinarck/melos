/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/ai/:path*",
        destination: "http://127.0.0.1:5328/:path*", // Points to Flask server
      },
    ];
  },
};
