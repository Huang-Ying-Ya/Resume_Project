/**
 * @desc 项目经历
 * @author pengdaokuan
 * @createTime 2021-03-22
 * @lastModify 2021-03-22
 */
import React from 'react';
import './index.less';

function Project() {
  return (
    <div styleName="content">
      <p styleName="label">项目经历 Project</p>
      <ul styleName="list">
        <li styleName="flex">
          <div styleName="left">
            <p>
              <span>2021.11 - 2022.06</span>
            </p>
          </div>
          <div styleName="right">
            <p>
              <span>全民健康网 - 前端工程师</span>
            </p>
          </div>
          <div styleName="text">
            <ul styleName="item-box">
              <li styleName="item-content">
                <span>
                  致力于为大家提供专业的健康资讯及各种健康服务的网站，包含各种类型的健康小贴士、疾病治疗方案，支持用户评论、收藏等功能;
                </span>
              </li>
              <li styleName="item-content">
                <span>负责搭建前端框架以及基础配置；</span>
              </li>
              <li styleName="item-content">
                <span>
                  负责前端页面的开发、维护、优化；负责前端项目的部署、上线、维护。
                </span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Project;
