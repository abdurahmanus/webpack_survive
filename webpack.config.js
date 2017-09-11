const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  {
    // Entries have to resolve to files! They rely on Node
    // convention by default so if a directory contains *index.js*,
    // it resolves to that.
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
      }),
    ],
  },
  parts.lintJavaScript({
    include: PATHS.app,
    options: {
      emitWarning: true,
      emitError: true,
    },
  }),
]);

const productionConfig = merge([
  parts.extractCSS({
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: true,
        },
      },
      parts.autoprefix(),
    ],
  }),
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
]);

module.exports = env => {
  return env === 'production' ?
    merge(commonConfig, productionConfig) :
    merge(commonConfig, developmentConfig);
};
