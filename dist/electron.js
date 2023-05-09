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
    // resizable: false, // 是否可以缩放
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL21haW4vZWxlY3Ryb24udHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJhcHAiLCJCcm93c2VyV2luZG93IiwiaXBjTWFpbiIsImlwY1JlbmRlcmVyIiwicmVtb3RlIiwiUk9PVF9QQVRIIiwicGF0aCIsImpvaW4iLCJnZXRBcHBQYXRoIiwib24iLCJldmVudCIsImFyZyIsInJlcGx5IiwiaXNEZXYiLCJwcm9jZXNzIiwiY3JlYXRlV2luZG93IiwibWFpbldpbmRvdyIsIndpZHRoIiwiaGVpZ2h0Iiwid2ViUHJlZmVyZW5jZXMiLCJkZXZUb29scyIsIm5vZGVJbnRlZ3JhdGlvbiIsImlzUmVzaXphYmxlIiwic2V0U2l6ZSIsInNldFJlc2l6YWJsZSIsImxvYWRVUkwiLCJfX2Rpcm5hbWUiLCJ3aGVuUmVhZHkiLCJ0aGVuIiwiZ2V0QWxsV2luZG93cyIsImxlbmd0aCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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TUFBOUIsS0FBeUMsQ0FBN0MsRUFBZ0RmLFlBQVk7QUFDN0QsR0FGRDtBQUdELENBTkQsRTs7Ozs7Ozs7Ozs7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2RTs7Ozs7Ozs7Ozs7QUNQQSxxQzs7Ozs7Ozs7Ozs7QUNBQSxpQyIsImZpbGUiOiJlbGVjdHJvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXBwL21haW4vZWxlY3Ryb24udHNcIik7XG4iLCIvKipcbiAqIEBkZXNjIGVsZWN0cm9uIOS4u+WFpeWPo++8iOS4u+i/m+eoi+aooeWdl++8iVxuICovXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbi8vIGltcG9ydCB7IGFwcCwgQnJvd3NlcldpbmRvdywgaXBjTWFpbiB9IGZyb20gJ2VsZWN0cm9uJztcblxuY29uc3QgeyBhcHAsIEJyb3dzZXJXaW5kb3csIGlwY01haW4sIGlwY1JlbmRlcmVyLCByZW1vdGUgfSA9IHJlcXVpcmUoJ2VsZWN0cm9uJyk7XG5cbmNvbnN0IFJPT1RfUEFUSCA9IHBhdGguam9pbihhcHAuZ2V0QXBwUGF0aCgpLCAnLi4vJyk7XG5cbi8vIOebkeWQrOa4suafk+i/m+eoi+WPkeeahOa2iOaBr+W5tuWbnuWkjVxuaXBjTWFpbi5vbignZ2V0LXJvb3QtcGF0aCcsIChldmVudDphbnksIGFyZzphbnkpID0+IHtcbiAgZXZlbnQucmVwbHkoJ3JlcGx5LXJvb3QtcGF0aCcsIFJPT1RfUEFUSCk7XG59KTtcblxuZnVuY3Rpb24gaXNEZXYoKSB7XG4gIC8vIOmFjee9ruS4remAmui/hyB3ZWJwYWNrLkRlZmluZVBsdWdpbiDlrprkuYnnmoTmnoTlu7rlj5jph49cbiAgcmV0dXJuIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVXaW5kb3coKSB7XG4gIC8vIOWIqeeUqEJyb3dzZXJXaW5kb3fliJvlu7rmtY/op4jlmajnqpflj6PvvIjljbPkuIDkuKrmuLLmn5Pov5vnqIvvvIlcbiAgY29uc3QgbWFpbldpbmRvdyA9IG5ldyBCcm93c2VyV2luZG93KHtcbiAgICAvLyB3aWR0aDogMTIwMCxcbiAgICAvLyBoZWlnaHQ6IDgwMCxcbiAgICB3aWR0aDogNDAwLFxuICAgIGhlaWdodDogNTUwLFxuICAgIC8vIHJlc2l6YWJsZTogZmFsc2UsIC8vIOaYr+WQpuWPr+S7pee8qeaUvlxuICAgIHdlYlByZWZlcmVuY2VzOiB7IC8vIOS4gOS4qumFjee9ruWPguaVsFxuICAgICAgZGV2VG9vbHM6IHRydWUsXG4gICAgICBub2RlSW50ZWdyYXRpb246IHRydWUsIC8vIOazqOWFpW5vZGXmqKHlnZfvvIzmiY3og73lnKjmuLLmn5Pov5vnqIvkuK3kvb/nlKhub2RlXG4gICAgICAvLyBlbmFibGVSZW1vdGVNb2R1bGU6IHRydWUsIC8v5omN6IO95L2/55SocmVtb3RlLmdldEN1cnJlbnRXaW5kb3coKVxuICAgIH0sXG4gIH0pO1xuXG4gIC8vIOaUueWPmOmhtemdouWwuuWvuFxuaXBjTWFpbi5vbignY2hhbmdlV2luZG93U2l6ZScsKGV2ZW50OmFueSwgYXJnOmFueSkgPT4ge1xuICAvLyBtYWluV2luZG93LnNldFNpemUoMTIwMCw4MDApO1xuICBldmVudC5yZXBseSgnY2hhbmdlJywgbWFpbldpbmRvdy5pc1Jlc2l6YWJsZSgpKTtcbiAgbWFpbldpbmRvdy5zZXRTaXplKDEyMDAsODAwKTtcbiAgLy8gcmVtb3RlLmdldEN1cnJlbnRXaW5kb3coKS5zZXRSZXNpemFibGUodHJ1ZSk7XG4gIG1haW5XaW5kb3cuc2V0UmVzaXphYmxlKCFtYWluV2luZG93LmlzUmVzaXphYmxlKCkpO1xuICAvLyBtYWluV2luZG93LnNldFJlc2l6YWJsZSh0cnVlKTtcbiAgZXZlbnQucmVwbHkoJ2NoYW5nZScsIG1haW5XaW5kb3cuaXNSZXNpemFibGUoKSk7XG59KVxuXG5pcGNNYWluLm9uKCdjaGFuZ2VXaW5kb3dTaXplU21hbGwnLChldmVudDphbnksIGFyZzphbnkpID0+IHtcbiAgLy8gbWFpbldpbmRvdy5zZXRTaXplKDEyMDAsODAwKTtcbiAgZXZlbnQucmVwbHkoJ2NoYW5nZVNpemUnLCcnKTtcbiAgbWFpbldpbmRvdy5zZXRTaXplKDQwMCw1NTApO1xuICBtYWluV2luZG93LnNldFJlc2l6YWJsZSh0cnVlKTtcbn0pXG4gIFxuXG4gIGlmIChpc0RldigpKSB7XG4gICAgLy8g5byA5Y+R546v5aKD5LiL77yM5Yqg6L2955qE5piv6L+Q6KGM5ZyoIDcwMDEg56uv5Y+j55qEIFJlYWN0XG4gICAgbWFpbldpbmRvdy5sb2FkVVJMKGBodHRwOi8vMTI3LjAuMC4xOjcwMDFgKTtcbiAgfSBlbHNlIHtcbiAgICBtYWluV2luZG93LmxvYWRVUkwoYGZpbGU6Ly8ke3BhdGguam9pbihfX2Rpcm5hbWUsICcuLi9kaXN0L2luZGV4Lmh0bWwnKX1gKTtcbiAgfVxufVxuXG5hcHAud2hlblJlYWR5KCkudGhlbigoKSA9PiB7XG4gIGNyZWF0ZVdpbmRvdygpO1xuICAvLyDlpoLmnpzmsqHmnInnqpflj6PmiZPlvIDliJnmiZPlvIDkuIDkuKrnqpflj6NcbiAgYXBwLm9uKCdhY3RpdmF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoQnJvd3NlcldpbmRvdy5nZXRBbGxXaW5kb3dzKCkubGVuZ3RoID09PSAwKSBjcmVhdGVXaW5kb3coKTtcbiAgfSk7XG59KTtcbiIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiXSwic291cmNlUm9vdCI6IiJ9