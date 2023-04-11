/**
 * @desc 工作经历
 * @author huangying
 */
import './index.less';
import React from 'react';

function Work() {
  return (
    <div styleName="content">
      <p styleName="label">工作经历 Post</p>
      <ul styleName="list">
        <li styleName="flex">
          <div styleName="left">
            <p>2022.01-2022.07</p>
            <p>前端工程师</p>
          </div>
          <div styleName="right">
            <p>成都中科合迅科技有限公司</p>
            <p>
              <li>
                个人成长: 开发过程中持续思考如何写出更优雅、高效的代码，
                提升了业务理解能力，养成了优秀的产品思维；
              </li>
              <li>
                组内贡献:
                参与项目的缺陷修改工作，负责项目新模块从零到一的开发并由产品、测试验收通过。
              </li>
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Work;
