import { defineConfig } from "cypress";
import webpack from 'webpack';
import { startDevServer } from '@cypress/webpack-dev-server';
import path from 'path';

export default defineConfig({
  video: false,

  e2e: {
    setupNodeEvents(on, config) {
      on('dev-server:start', (options) =>
        startDevServer({
          options,
          webpackConfig: {
            resolve: {
              alias: {
                'node:crypto': 'crypto-browserify',
                'node:net': 'net-browserify',
              },
              fallback: {
                crypto: 'crypto-browserify',
                net: 'net-browserify',
                stream: 'stream-browserify',
                buffer: 'buffer',
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
      return config;
    },
    baseUrl: "http://localhost:8080",
  },
});
