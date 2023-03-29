/**
 * @desc 简单介绍
 * @author huangying
 */
import React from 'react';
import './index.less';

function Synopsis() {
  return (
    <div styleName="content">
      <p styleName="name">黄颖</p>
      <p styleName="job">前端/后端工程师</p>
      <p styleName="summary">
        {[
          "我认为自己有着很大的毅力与恒心，有着一定的执行力，能够积极主动完成所分配任务，不拖延，高效完成任务",
          "有较强的学习能力，能够面对各种未知的挑战",
          "有一定的领导能力与组织规划能力，能够较好地划分任务、分配任务、统筹安排，使得团队工作完成的更加高效有序",
        ].join("，")}
      </p>
    </div>
  );
}

export default Synopsis;
