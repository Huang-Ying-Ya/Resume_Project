// common文件夹存放的是项目中所有公共通用的代码文件
// 在里边我们创建一个 constants 文件夹，表示这里维护所有常量数据

// 模块路径
const ROUTER = {
  root: '/',
  resume: '/resume',
};
export default ROUTER;

export const ROUTER_KEY = {
  root: 'root',
  resume: 'resume',
};

// 入口模块
export const ROUTER_ENTRY = [
  {
    url: 'https://github.com/Huang-Ying-Ya/Resume_Project',
    key: 'intro',
    text: '介绍',
  },
  {
    url: ROUTER.resume,
    key: ROUTER_KEY.resume,
    text: '快速开始',
  },
  {
    url: 'https://github.com/Huang-Ying-Ya/Resume_Project',
    key: 'code',
    text: '源码',
  },
];
