module.exports = {
  images: {
    domains: ["media.contentapi.ea.com", "static-cdn.jtvnw.net"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false,
          },
        },
      ],
    });
    return config;
  },
};
