module.exports = {
  i18n: {
    locales: ["fr-FR"],
    defaultLocale: "fr-FR",
  },
  images: {
    domains: [
      "media.contentapi.ea.com",
      "static-cdn.jtvnw.net",
      "fifa21.content.easports.com",
    ],
  },
  async headers() {
    return [
      {
        source: "/fonts/DIN-Condensed.woff2",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
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
