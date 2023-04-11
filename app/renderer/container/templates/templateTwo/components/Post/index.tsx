/**
 * @desc 在校经历
 * @author huangying
 */
import "./index.less";
import React from "react";

function Post() {
  return (
    <div styleName="content">
      <p styleName="label">在校经历 Post</p>
      <ul styleName="list">
        <li styleName="flex">
          <div styleName="left">
            <p>2019.10-2021.05</p>
            <p>文体部部员&会长</p>
          </div>
          <div styleName="right">
            <p>电子科技大学软件学院学生会</p>
            <p>配合体育部完成各项工作</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Post;
