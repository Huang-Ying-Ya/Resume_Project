/**
 * @desc 求职意向
 * @author huangying
 */
import React from 'react';
import '../../../styles/template-one.less';
import './index.less';

function Job() {
  return (
    <div styleName="container">
      <p styleName="title">求职意向 Work</p>
      <ul styleName="content">
        <li>职位：前端/后端工程师</li>
        <li>城市：成都|北京|杭州|上海</li>
      </ul>
    </div>
  );
}

export default Job;
