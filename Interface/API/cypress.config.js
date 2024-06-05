const webpack = require('webpack');
const { startDevServer } = require('@cypress/webpack-dev-server');
const path = require('path');

module.exports = defineConfig({
  video: false,

  e2e: {
    setupNodeEvents(on, config) {
      on('dev-server:start', (options) =>
        startDevServer({
          options,
          webpackConfig: {
            resolve: {
              alias: {
                // Make sure the path to your node_modules is correct
                'node:crypto': require.resolve('crypto-browserify'),
                'node:net': require.resolve('net-browserify'),
              },
              fallback: {
                crypto: require.resolve('crypto-browserify'),
                net: require.resolve('net-browserify'),
                stream: require.resolve('stream-browserify'),
                buffer: require.resolve('buffer'),
              },
            },
            plugins: [
              new webpack.ProvidePlugin({
                process: 'process/browser',
                Buffer: ['buffer', 'Buffer'],
              }),
            ],
          },
        })
      );
      // Other setupNodeEvents code...
      return config;
    },
    baseUrl: "http://localhost:8080",
  },
});
