const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    watertext: './index',
    'watertext.min': './index',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'watertext',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
    }),
  ],
  module: {
    loaders: [

    ],
  },
};
