const path = require("path");
const { NormalModuleReplacementPlugin } = require("webpack");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@bumblebee/ui"],
  webpack: (config, { webpack, isServer }) => {
    if (isServer) {
      config.plugins.push(
        // temp fix for react-email bug: https://github.com/resendlabs/react-email/issues/868#issuecomment-1782771917
        new NormalModuleReplacementPlugin(
          /email\/render/,
          path.resolve(__dirname, "./renderEmailFix.js"),
        ),
      );
    }

    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "no-referrer-when-downgrade",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
};
