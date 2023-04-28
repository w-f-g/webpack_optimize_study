/* eslint-disable @typescript-eslint/no-var-requires */
// const path = require('path')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const baseConfig = require('./webpack.base')
const packageJSON = require('../package.json')
// const resolve = path.resolve

// 不需要单独拆分的模块列表
const exclusive = []
// 需要拆包的模块列表
const libs = Object.keys(packageJSON.dependencies)
  .filter(name => !exclusive.includes(name))
  .reduce((libs, name) => {
    const key = `\\node_modules\\${name}\\`
    libs[name] = {
      chunks: 'initial',
      name: name + '-chunks',
      test(_module) {
        const id = _module.resource
        return id && id.includes(key)
      },
      priority: -10,
    }
    return libs
  }, {})

const config = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, //移除所有console相关代码；
          },
          format: {
            comments: true, //删除注释
          },
        },
        // 是否将注释抽离到单独的文件中
        extractComments: false,
      }),
    ],
    splitChunks: {
      minSize: 2 * 1024,
      cacheGroups: {
        ...libs,
        vendor: {
          chunks: 'initial',
          name: 'vender-chunks',
          test: /[\\/]node_modules[\\/]/,
          priority: -15,
        },
        default: {
          chunks: 'all',
          minChunks: 2,
          priority: -20,
        }
      }
    },
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  ],
}

module.exports = merge(baseConfig, config)