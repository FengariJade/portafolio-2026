/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-international", "international-types"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  //output: "export",
  distDir: "out",
  images: {
    unoptimized: true, // 🔑 Desactiva el optimizador
  },
  assetPrefix: "/",
};

module.exports = nextConfig;
