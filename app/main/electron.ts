/**
 * @desc electron 主入口（主进程模块）
 */
import path from 'path';
// import { app, BrowserWindow, ipcMain } from 'electron';

const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');

const ROOT_PATH = path.join(app.getAppPath(), '../');

// 监听渲染进程发的消息并回复
ipcMain.on('get-root-path', (event:any, arg:any) => {
  event.reply('reply-root-path', ROOT_PATH);
});

function isDev() {
  // 配置中通过 webpack.DefinePlugin 定义的构建变量
  return process.env.NODE_ENV === 'development';
}

function createWindow() {
  // 利用BrowserWindow创建浏览器窗口（即一个渲染进程）
  const mainWindow = new BrowserWindow({
    // width: 1200,
    // height: 800,
    width: 400,
    height: 550,
    resizable: false, // 是否可以缩放
    webPreferences: { // 一个配置参数
      devTools: true,
      nodeIntegration: true, // 注入node模块，才能在渲染进程中使用node
    },
  });

  // 改变页面尺寸
ipcMain.on('changeWindowSize',(event:any, arg:any) => {
  // mainWindow.setSize(1200,800);
  event.reply('change', mainWindow.isResizable());
  mainWindow.setSize(1200,800);
  mainWindow.setResizable(!mainWindow.isResizable());
  event.reply('change', mainWindow.isResizable());
})

ipcMain.on('changeWindowSizeSmall',(event:any, arg:any) => {
  // mainWindow.setSize(1200,800);
  event.reply('changeSize','');
  mainWindow.setSize(400,550);
  mainWindow.setResizable(false);
})
  

  if (isDev()) {
    // 开发环境下，加载的是运行在 7001 端口的 React
    mainWindow.loadURL(`http://127.0.0.1:7001`);
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
  }
}

app.whenReady().then(() => {
  createWindow();
  // 如果没有窗口打开则打开一个窗口
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
