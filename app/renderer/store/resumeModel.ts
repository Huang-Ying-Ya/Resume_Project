const resumeModel: TSRcReduxModel.Props<TSResume.IntactResume> = {
  namespace: 'resumeModel',
  openSeamlessImmutable: true,
  state: {
    // 包括个人信息（姓名，籍贯，爱好）
    // 包括教育信息（学校，专业，学位，学位在校时间）
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
    // 联系方式
    contact: {
      phone: '185****6836',
      email: '****@qq.com',
    },
    // 工作期望
    work: {
      job: '前端工程师',
      city: '北京 | 杭州',
      cityList: ['北京', '杭州'],
    },
    hobby: '看剧',
    skill:
      '熟悉 Vue.js｜熟悉 React，了解并使用 Hooks 特性｜了解 MYSQL，了解数据库优化常用方法',
    // 技能清单
    skillList: [
      '熟悉 Vue.js，了解数据双向绑定原理',
      '熟悉 React，了解并使用 Hooks 特性',
      '了解 MYSQL，了解数据库优化常用方法',
    ],
    evaluation:'我最棒了；我最棒了；我最棒了；',
    evaluationList: [
    ],
    certificate: '我得了一堆奖；我得了一堆奖；我得了一堆奖；',
    certificateList: [],
    // 在校经历
    schoolExperience: [
      {
        beginTime: '2020.09',
        endTime: '2021.09',
        post: '文体部会长',
        department: '校团委学生会',
        content:
          '计划、组织、协调各年级学生组织的文艺和文化娱乐活动｜承办好学生会部的学生文艺晚会。有效地与社团部开展合作项目',
        parseContent: [
          '计划、组织、协调各年级学生组织的文艺和文化娱乐活动',
          '承办好学生会部的学生文艺晚会。有效地与社团部开展合作项目',
        ],
      },
    ],
    // 工作经历
    workExperience: [
      {
        beginTime: '2017.09',
        endTime: '2019.04',
        post: '前端工程师',
        department: '四川某不知名企业',
        content:
          '我是一块砖，哪里需要哪里搬。我是一块砖，哪里需要哪里搬。我是一块砖，哪里需要哪里搬。我是一块砖，哪里需要哪里搬。我是一块砖，哪里需要哪里搬。我是一块砖，哪里需要哪里搬。',
        parseContent: [
          '我是一块砖，哪里需要哪里搬。我是一块砖，哪里需要哪里搬。我是一块砖，哪里需要哪里搬。我是一块砖，哪里需要哪里搬。',
          '我是一块砖，哪里需要哪里搬。我是一块砖，哪里需要哪里搬。我是一块砖，哪里需要哪里搬。我是一块砖，哪里需要哪里搬。我是一块砖，哪里需要哪里搬。',
        ],
      },
    ],
    // 项目经历
    projectExperience: [
      {
        beginTime: '2021.03',
        endTime: '2021.05',
        projectName: '简历平台',
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
