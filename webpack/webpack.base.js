const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 基础公共配置

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],// import引入文件时，找文件后缀的顺序
    alias: { // 别名配置，方便写路径
      "@assets": path.join(__dirname, "../", "assets/"),
      "@src": path.join(__dirname, "../", "app/renderer"),
      "@common": path.join(__dirname, "../", "app/renderer/common"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash].[ext]",
              outputPath: "images/",
            },
          },
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
