const CracoLessPlugin = require('craco-less');
const webpack = require("webpack");
module.exports = {
  eslint: {
    enabled: false
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {'@primary-color': '#1890FF'},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      zlib: require.resolve("browserify-zlib"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify")
    },
    resolve: {
      fallback: {
        module: "empty",
        dgram: "empty",
        dns: "mock",
        fs: "empty",
        http2: "empty",
        net: "empty",
        tls: "empty",
        child_process: "empty",
        process: require.resolve("process/browser.js"),
        zlib: require.resolve("browserify-zlib"),
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util"),
        buffer: require.resolve("buffer"),
        asset: require.resolve("assert")
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
        process: "process/browser.js"
      })
    ]
  }
};
