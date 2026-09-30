const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    config.module.rules.push({
      test: /\.geojson$/,
      use: ["json-loader"],
    });
    return config;
  },
};

module.exports = nextConfig;
