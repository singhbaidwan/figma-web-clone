/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.externals.push({ canvas: "commonjs canvas" });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "liveblocks.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "w7.pngwing.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
