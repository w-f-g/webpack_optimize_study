const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

const resolve = path.resolve

const config = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    port: 9000,
    static: {
      directory: resolve(__dirname, 'public'),
    },
    hot: true,
    open: true,
    compress: true,
    setupMiddlewares: resolve(__dirname, '../mock')
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
}

module.exports = merge(baseConfig, config)