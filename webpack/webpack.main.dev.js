const path = require('path');
const baseConfig = require('./webpack.base.js');
const webpackMerge = require('webpack-merge');

// 主进程开发环境配置

const mainConfig = {
  entry: path.resolve(__dirname, '../app/main/electron.ts'), // 定义入口文件
  target: 'electron-main',
  output: {
    filename: 'electron.js',
    path: path.resolve(__dirname, '../dist'),// 定义打包后的文件路径
  },
  devtool: 'inline-source-map',
  mode: 'development',
};

module.exports = webpackMerge.merge(baseConfig, mainConfig);
