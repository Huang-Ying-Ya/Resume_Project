const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 渲染进程开发环境配置

const devConfig = {
  mode: 'development',
  entry: {
    // 对应渲染进程的 app.tsx 入口文件
    index: path.resolve(__dirname, '../app/renderer/app.tsx'),
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  target: 'electron-renderer',// 这里的target针对electron渲染进程，最后通过webpack-merge合并导出一份完整配置
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    host: '127.0.0.1', // webpack-dev-server启动时要指定ip，不能直接通过localhost启动，不指定会报错
    port: 7001, // 启动端口为 7001 的服务
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: [/[\\/]node_modules[\\/].*antd/],
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        exclude: [/[\\/]node_modules[\\/].*antd/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'less-loader',
          // {
          //   loader: 'less-loader',
          //   options: {
          //     lessOptions: { 
          //       modifyVars: {
          //         'primary-color': '#73afc2',
          //         'link-color': '#73afc2',
          //         'border-radius-base': '2px',
          //       },
          //       javascriptEnabled: true,
          //   }},
          // }
         
        ],
      },

      // 针对 antd@4 相关 css/less 包 设置的打包规则
      {
        test: /\.css$/,
        include: [/[\\/]node_modules[\\/].*antd/],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        include: [/[\\/]node_modules[\\/].*antd/],
        use: [
          'style-loader', 
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: { 
                modifyVars: {
                  'primary-color': '#fff',
                  'link-color': '#73afc2',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true,
            }},
          }
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 以此文件为模版，自动生成 HTML
      template: path.resolve(__dirname, '../app/renderer/index.html'),
      filename: path.resolve(__dirname, '../dist/index.html'),
      chunks: ['index'],
    }),
  ],
};

module.exports = webpackMerge.merge(baseConfig, devConfig);
