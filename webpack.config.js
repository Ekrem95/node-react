const webpack = require('webpack');
const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');

const production = process.env.NODE_ENV === 'production';
const APP_DIR = path.resolve(__dirname, 'src/app');
const BUILT_DIR = path.resolve(__dirname, 'src/public');

const config = {
    entry: APP_DIR + '/app.js',
    output: { path: BUILT_DIR, filename: 'bundle.js' },
    devtool: production ? '' : 'inline-sourcemap',
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: APP_DIR,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['react'] },
            },
        ],
    },
    plugins: production ? [new uglify()] : [],
};

module.exports = config;
