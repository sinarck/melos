/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "melos.ufs.sh",
        pathname: "/f/*",
      },
    ],
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

