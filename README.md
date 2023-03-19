# 基于 Electron + React 的简历平台桌面端应用

根据指引 输入你的信息 生成一份简洁美观的简历📒

本项目使用现代化软件工程流程规范进行开发

## 分支管理

* 没有使用git flow的分支管理方式 直接在 main 分支上进行开发

## 前端项目技术栈

* 前端：
  * 打包 构建工具: Webpack
  * React全家桶（React Hooks + React router + Redux）+ TypeScript
  * 前端工程化插件：Eslint/Prettier
  * 桌面端应用打包工具: Electron

## 运行方法

`npm install`

`npm run start:render` // 渲染进程模块

`npm run start:main` // 启动桌面端应用

## 项目结构

├── Resume_project
│ ├── app
│ │ ├── main      // 主进程模块
│ │ │    ├── electron.js
│ │ │    └── index.html
│ │ ├── renderer  // 渲染进程模块
│ ├── webpack
│ └── package.json
├── dist
└──

## 项目亮点（论文重点）

* 从零到一的脚手架搭建
  * Webpack
  * Electron
