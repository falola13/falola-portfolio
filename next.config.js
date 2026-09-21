/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      // The admin is Keystatic, which serves itself at /keystatic.
      { source: "/admin", destination: "/keystatic", permanent: false },
      { source: "/admin/:path*", destination: "/keystatic/:path*", permanent: false },
    ];
  },
};

module.exports = nextConfig
