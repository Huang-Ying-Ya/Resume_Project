// common文件夹存放的是项目中所有公共通用的代码文件
// 在里边我们创建一个 constants 文件夹，表示这里维护所有常量数据

// 模块路径
const ROUTER = {
  root: '/root',
  resume: '/resume',
  register: '/register',
  login: '/login',
  personalCentre: '/personalCentre',
  forgetPassword: '/forgetPassword',
  myInfo:'/personalCentre/myInfo',
  myResume:'/personalCentre/myResume',
  myDraft:'/personalCentre/myDraft',
  myPhone:'/personalCentre/myPhone',
};
export default ROUTER;

export const ROUTER_KEY = {
  root: 'root',
  resume: 'resume',
  login: 'login',
  register: 'register',
  personalCentre: 'personalCentre',
  forgetPassword: 'forgetPassword',
  myInfo:'personalCentre/myInfo',
  myResume:'personalCentre/myResume',
  myDraft:'personalCentre/myDraft',
  myPhone:'personalCentre/myPhone',
};

// 入口模块 (TS 定义类型必须为TSRouter.Item)
export const ROUTER_ENTRY = [
  {
    url: ROUTER.login,
    key: ROUTER_KEY.login,
    text: '退出登录',
  },
  {
    url: ROUTER.resume,
    key: ROUTER_KEY.resume,
    text: '快速开始',
  },
  {
    url: ROUTER.personalCentre,
    key: ROUTER_KEY.personalCentre,
    text: '个人中心',
  },
];
