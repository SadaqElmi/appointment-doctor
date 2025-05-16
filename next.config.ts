// next.config.ts
const nextConfig = {
  devIndicators: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack(config: any) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
