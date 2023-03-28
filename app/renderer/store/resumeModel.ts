const resumeModel: TSRcReduxModel.Props<TSResume.IntactResume> = {
  namespace: 'resumeModel',
  openSeamlessImmutable: true,
  state: {
    base: {
      avatar: '',
      username: 'huangying',
      area: 'chengdu',
      school: 'UESTC',
      major: '软件工程',
      degree: '本科',
      hometown: '天津',
      onSchoolTime: {
        beginTime: '2019.09',
        endTime: '2023.06',
      },
    },
    contact: {
      phone: '185****6836',
      email: '****@qq.com',
    },
    work: {
      job: '前端工程师',
      city: '北京 | 杭州',
      cityList: ['北京', '杭州'],
    },
    hobby: '看剧',
    skill:
      '熟悉 Vue.js｜熟悉 React，了解并使用 Hooks 特性｜了解 MYSQL，了解数据库优化常用方法',
    skillList: [
      '熟悉 Vue.js，了解数据双向绑定原理',
      '熟悉 React，了解并使用 Hooks 特性',
      '了解 MYSQL，了解数据库优化常用方法',
    ],
    evaluation:
      '',
    evaluationList: [
    ],
    certificate: '',
    certificateList: [],
    schoolExperience: [
      {
        beginTime: '2016.09',
        endTime: '2017.09',
        post: '文艺部会长',
        department: '校团委学生会',
        content:
          '计划、组织、协调各年级学生组织的文艺和文化娱乐活动｜承办好学生会部的学生文艺晚会。有效地与社团部开展合作项目',
        parseContent: [
          '计划、组织、协调各年级学生组织的文艺和文化娱乐活动',
          '承办好学生会部的学生文艺晚会。有效地与社团部开展合作项目',
        ],
      },
    ],
    workExperience: [
      {
        beginTime: '2017.09',
        endTime: '2019.04',
        post: '前端工程师',
        department: '湖南瞎说大学网络中心',
        content:
          '担任TickNet工作室前端工程师，与湖南瞎说大学网络中心合作，围绕微信企业号开发或主导多个应用｜任职期间基于微信企业号开发校内闲余市场，采用Vue.js主导开发，并与湖南xxx科技有限公司合作，主导开发该公司官网及后台管理',
        parseContent: [
          '担任TickNet工作室前端工程师，与湖南瞎说大学网络中心合作，围绕微信企业号开发或主导多个应用',
          '任职期间基于微信企业号开发校内闲余市场，采用Vue.js主导开发，并与湖南xxx科技有限公司合作，主导开发该公司官网及后台管理',
        ],
      },
    ],
    projectExperience: [
      {
        beginTime: '2021.03',
        endTime: '2021.05',
        projectName: 'visResumeMook 可视化简历平台',
        post: '前端工程师',
        content:
          'Electron + React Hooks 打造简历平台，只需输入一次信息，套用多份模版｜通过 jsonfile 方式实现主题换肤，支持导出 PDF 简历文档｜通过 indexDB 方式实现历史简历缓存，通过可视化拖拽形式，自定义组件模版',
        parseContent: [
          'Electron + React Hooks 打造简历平台，只需输入一次信息，套用多份模版',
          '通过 jsonfile 方式实现主题换肤，支持导出 PDF 简历文档',
          '通过 indexDB 方式实现历史简历缓存，通过可视化拖拽形式，自定义组件模版',
        ],
        date: 1621145137865,
      },
    ],
  },
};

export default resumeModel;
