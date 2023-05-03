/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/main/electron.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/main/electron.ts":
/*!******************************!*\
  !*** ./app/main/electron.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

function _path() {
  var data = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

  _path = function _path() {
    return data;
  };

  return data;
}

/**
 * @desc electron 主入口（主进程模块）
 */
// import { app, BrowserWindow, ipcMain } from 'electron';
var _require = __webpack_require__(/*! electron */ "electron"),
    app = _require.app,
    BrowserWindow = _require.BrowserWindow,
    ipcMain = _require.ipcMain,
    ipcRenderer = _require.ipcRenderer,
    remote = _require.remote;

var ROOT_PATH = _path()["default"].join(app.getAppPath(), '../'); // 监听渲染进程发的消息并回复


ipcMain.on('get-root-path', function (event, arg) {
  event.reply('reply-root-path', ROOT_PATH);
});

function isDev() {
  // 配置中通过 webpack.DefinePlugin 定义的构建变量
  return "development" === 'development';
}

function createWindow() {
  // 利用BrowserWindow创建浏览器窗口（即一个渲染进程）
  var mainWindow = new BrowserWindow({
    // width: 1200,
    // height: 800,
    width: 400,
    height: 550,
    resizable: false,
    // 是否可以缩放
    webPreferences: {
      // 一个配置参数
      devTools: true,
      nodeIntegration: true // 注入node模块，才能在渲染进程中使用node
      // enableRemoteModule: true, //才能使用remote.getCurrentWindow()

    }
  }); // 改变页面尺寸

  ipcMain.on('changeWindowSize', function (event, arg) {
    // mainWindow.setSize(1200,800);
    event.reply('change', mainWindow.isResizable());
    mainWindow.setSize(1200, 800); // remote.getCurrentWindow().setResizable(true);

    mainWindow.setResizable(!mainWindow.isResizable()); // mainWindow.setResizable(true);

    event.reply('change', mainWindow.isResizable());
  });
  ipcMain.on('changeWindowSizeSmall', function (event, arg) {
    // mainWindow.setSize(1200,800);
    event.reply('changeSize', '');
    mainWindow.setSize(400, 550);
    mainWindow.setResizable(true);
  });

  if (isDev()) {
    // 开发环境下，加载的是运行在 7001 端口的 React
    mainWindow.loadURL("http://127.0.0.1:7001");
  } else {
    mainWindow.loadURL("file://".concat(_path()["default"].join(__dirname, '../dist/index.html')));
  }
}

app.whenReady().then(function () {
  createWindow(); // 如果没有窗口打开则打开一个窗口

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL21haW4vZWxlY3Ryb24udHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJhcHAiLCJCcm93c2VyV2luZG93IiwiaXBjTWFpbiIsImlwY1JlbmRlcmVyIiwicmVtb3RlIiwiUk9PVF9QQVRIIiwicGF0aCIsImpvaW4iLCJnZXRBcHBQYXRoIiwib24iLCJldmVudCIsImFyZyIsInJlcGx5IiwiaXNEZXYiLCJwcm9jZXNzIiwiY3JlYXRlV2luZG93IiwibWFpbldpbmRvdyIsIndpZHRoIiwiaGVpZ2h0IiwicmVzaXphYmxlIiwid2ViUHJlZmVyZW5jZXMiLCJkZXZUb29scyIsIm5vZGVJbnRlZ3JhdGlvbiIsImlzUmVzaXphYmxlIiwic2V0U2l6ZSIsInNldFJlc2l6YWJsZSIsImxvYWRVUkwiLCJfX2Rpcm5hbWUiLCJ3aGVuUmVhZHkiLCJ0aGVuIiwiZ2V0QWxsV2luZG93cyIsImxlbmd0aCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FB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QUFDN0IsUUFBSVIsYUFBYSxDQUFDNkIsYUFBZCxHQUE4QkMsTUFBOUIsS0FBeUMsQ0FBN0MsRUFBZ0RoQixZQUFZO0FBQzdELEdBRkQ7QUFHRCxDQU5ELEU7Ozs7Ozs7Ozs7OztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkU7Ozs7Ozs7Ozs7O0FDUEEscUM7Ozs7Ozs7Ozs7O0FDQUEsaUMiLCJmaWxlIjoiZWxlY3Ryb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2FwcC9tYWluL2VsZWN0cm9uLnRzXCIpO1xuIiwiLyoqXG4gKiBAZGVzYyBlbGVjdHJvbiDkuLvlhaXlj6PvvIjkuLvov5vnqIvmqKHlnZfvvIlcbiAqL1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG4vLyBpbXBvcnQgeyBhcHAsIEJyb3dzZXJXaW5kb3csIGlwY01haW4gfSBmcm9tICdlbGVjdHJvbic7XG5cbmNvbnN0IHsgYXBwLCBCcm93c2VyV2luZG93LCBpcGNNYWluLCBpcGNSZW5kZXJlciwgcmVtb3RlIH0gPSByZXF1aXJlKCdlbGVjdHJvbicpO1xuXG5jb25zdCBST09UX1BBVEggPSBwYXRoLmpvaW4oYXBwLmdldEFwcFBhdGgoKSwgJy4uLycpO1xuXG4vLyDnm5HlkKzmuLLmn5Pov5vnqIvlj5HnmoTmtojmga/lubblm57lpI1cbmlwY01haW4ub24oJ2dldC1yb290LXBhdGgnLCAoZXZlbnQ6YW55LCBhcmc6YW55KSA9PiB7XG4gIGV2ZW50LnJlcGx5KCdyZXBseS1yb290LXBhdGgnLCBST09UX1BBVEgpO1xufSk7XG5cbmZ1bmN0aW9uIGlzRGV2KCkge1xuICAvLyDphY3nva7kuK3pgJrov4cgd2VicGFjay5EZWZpbmVQbHVnaW4g5a6a5LmJ55qE5p6E5bu65Y+Y6YePXG4gIHJldHVybiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jztcbn1cblxuZnVuY3Rpb24gY3JlYXRlV2luZG93KCkge1xuICAvLyDliKnnlKhCcm93c2VyV2luZG935Yib5bu65rWP6KeI5Zmo56qX5Y+j77yI5Y2z5LiA5Liq5riy5p+T6L+b56iL77yJXG4gIGNvbnN0IG1haW5XaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdyh7XG4gICAgLy8gd2lkdGg6IDEyMDAsXG4gICAgLy8gaGVpZ2h0OiA4MDAsXG4gICAgd2lkdGg6IDQwMCxcbiAgICBoZWlnaHQ6IDU1MCxcbiAgICByZXNpemFibGU6IGZhbHNlLCAvLyDmmK/lkKblj6/ku6XnvKnmlL5cbiAgICB3ZWJQcmVmZXJlbmNlczogeyAvLyDkuIDkuKrphY3nva7lj4LmlbBcbiAgICAgIGRldlRvb2xzOiB0cnVlLFxuICAgICAgbm9kZUludGVncmF0aW9uOiB0cnVlLCAvLyDms6jlhaVub2Rl5qih5Z2X77yM5omN6IO95Zyo5riy5p+T6L+b56iL5Lit5L2/55Sobm9kZVxuICAgICAgLy8gZW5hYmxlUmVtb3RlTW9kdWxlOiB0cnVlLCAvL+aJjeiDveS9v+eUqHJlbW90ZS5nZXRDdXJyZW50V2luZG93KClcbiAgICB9LFxuICB9KTtcblxuICAvLyDmlLnlj5jpobXpnaLlsLrlr7hcbmlwY01haW4ub24oJ2NoYW5nZVdpbmRvd1NpemUnLChldmVudDphbnksIGFyZzphbnkpID0+IHtcbiAgLy8gbWFpbldpbmRvdy5zZXRTaXplKDEyMDAsODAwKTtcbiAgZXZlbnQucmVwbHkoJ2NoYW5nZScsIG1haW5XaW5kb3cuaXNSZXNpemFibGUoKSk7XG4gIG1haW5XaW5kb3cuc2V0U2l6ZSgxMjAwLDgwMCk7XG4gIC8vIHJlbW90ZS5nZXRDdXJyZW50V2luZG93KCkuc2V0UmVzaXphYmxlKHRydWUpO1xuICBtYWluV2luZG93LnNldFJlc2l6YWJsZSghbWFpbldpbmRvdy5pc1Jlc2l6YWJsZSgpKTtcbiAgLy8gbWFpbldpbmRvdy5zZXRSZXNpemFibGUodHJ1ZSk7XG4gIGV2ZW50LnJlcGx5KCdjaGFuZ2UnLCBtYWluV2luZG93LmlzUmVzaXphYmxlKCkpO1xufSlcblxuaXBjTWFpbi5vbignY2hhbmdlV2luZG93U2l6ZVNtYWxsJywoZXZlbnQ6YW55LCBhcmc6YW55KSA9PiB7XG4gIC8vIG1haW5XaW5kb3cuc2V0U2l6ZSgxMjAwLDgwMCk7XG4gIGV2ZW50LnJlcGx5KCdjaGFuZ2VTaXplJywnJyk7XG4gIG1haW5XaW5kb3cuc2V0U2l6ZSg0MDAsNTUwKTtcbiAgbWFpbldpbmRvdy5zZXRSZXNpemFibGUodHJ1ZSk7XG59KVxuICBcblxuICBpZiAoaXNEZXYoKSkge1xuICAgIC8vIOW8gOWPkeeOr+Wig+S4i++8jOWKoOi9veeahOaYr+i/kOihjOWcqCA3MDAxIOerr+WPo+eahCBSZWFjdFxuICAgIG1haW5XaW5kb3cubG9hZFVSTChgaHR0cDovLzEyNy4wLjAuMTo3MDAxYCk7XG4gIH0gZWxzZSB7XG4gICAgbWFpbldpbmRvdy5sb2FkVVJMKGBmaWxlOi8vJHtwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vZGlzdC9pbmRleC5odG1sJyl9YCk7XG4gIH1cbn1cblxuYXBwLndoZW5SZWFkeSgpLnRoZW4oKCkgPT4ge1xuICBjcmVhdGVXaW5kb3coKTtcbiAgLy8g5aaC5p6c5rKh5pyJ56qX5Y+j5omT5byA5YiZ5omT5byA5LiA5Liq56qX5Y+jXG4gIGFwcC5vbignYWN0aXZhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKEJyb3dzZXJXaW5kb3cuZ2V0QWxsV2luZG93cygpLmxlbmd0aCA9PT0gMCkgY3JlYXRlV2luZG93KCk7XG4gIH0pO1xufSk7XG4iLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0O1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==