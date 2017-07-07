const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src/app');
const BUILT_DIR = path.resolve(__dirname, 'src/public');

const config = {
  entry: APP_DIR + '/app.js',
  output: {
    path: BUILT_DIR,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: APP_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react'],
        },
      },
    ],
  },
  devtool: 'inline-sourcemap',
  // devtool: '#source-map',
};

module.exports = config;
