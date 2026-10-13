const nextConfig = {
  async rewrites() {
    return [
      { source: "/api/auth/:path*", destination: "http://localhost:5000/api/auth/:path*" },
    ];
  },
};
export default nextConfig;