const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    watertext: ['core-js/fn/promise', './index'],
    'watertext.min': ['core-js/fn/promise', './index'],
    'watertext.core': './core',
    'watertext.core.min': './core',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'watertext',
    libraryTarget: 'umd2',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      output: {
        comments: false,
      },
    }),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    }],
  },
};
