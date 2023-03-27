// 借助 node 的 fs 模块，实现文件操作的工具类
// 解释这段代码
// 1. Node 10 之后，提供了 fs Promises API ，这里我们通过官方提供的 API 即可实现 Promise 操作 fs 模块。
// 2. 使用 async/await 来实现异步操作
// 3. 使用 Promise 来封装异步操作
// 4. 使用 BufferEncoding 来指定编码
// 5. 使用 fs.constants.F_OK 来判断文件是否存在
// 6. 使用 fs.constants.W_OK 来判断文件是否可写
// 7. 使用 fs.constants.R_OK 来判断文件是否可读
import fs, { promises as fsPromiseAPIs } from 'fs';

const fileAction = {
  /**
   * @description 读取文件内容
   * @param path 路径
   * @returns {Promise}
   */
  read: (path: string, encoding?: BufferEncoding): Promise<string> => {
    return fsPromiseAPIs.readFile(path, { encoding: encoding || 'utf8' });
  },

  /**
   * @description 写入文件内容
   * @param path 路径
   * @returns {Promise}
   */
  write: (path: string, content: string, encoding?: BufferEncoding): Promise<void> => {
    return fsPromiseAPIs.writeFile(path, content, { encoding: encoding || 'utf8' });
  },

  /**
   * @description 重命名文件
   * @param {string} oldPath 旧地址
   * @param {string} newPath 新地址
   * @returns {Promise}
   */
  rename: (oldPath: string, newPath: string) => {
    return fsPromiseAPIs.rename(oldPath, newPath);
  },

  /**
   * @description 删除文件
   * @param path 路径
   * @returns {Promise}
   */
  delete: (path: string) => {
    return fsPromiseAPIs.unlink(path);
  },

  /**
   * @description 是否存在文件
   * @param path 路径
   * @returns {Promise}
   */
  hasFile: (path: string) => {
    return fsPromiseAPIs.access(path, fs.constants.F_OK);
  },

  /**
   * @description 是否可写入此文件
   * @param path 路径
   * @returns {Promise}
   */
  canWrite: (path: string) => {
    return fsPromiseAPIs.access(path, fs.constants.W_OK);
  },

  /**
   * @description 是否可读此文件
   * @param path 路径
   * @returns {Promise}
   */
  canRead: (path: string) => {
    return fsPromiseAPIs.access(path, fs.constants.R_OK);
  },
};

export default fileAction;
