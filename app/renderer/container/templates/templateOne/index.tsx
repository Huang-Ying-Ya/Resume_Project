/**
 * @desc 模板1
 * @author huangying
 */
import React from "react";
import "./index.less";
import Avatar from "./components/Avatar";
import BaseInfo from "./components/BaseInfo";
import Contact from "./components/Contact";
import Job from "./components/Job";
import Certificate from "./components/Certificate";
import Synopsis from "./components/Synopsis";
import Skill from "./components/Skill";
import Post from "./components/Post";
import Project from "./components/Project";
import Work from "./components/Work";
import { useSelector } from "react-redux";
import { RESUME_TOOLBAR_MAPS } from "@common/constants/resume";

function TemplateOne() {
  // 获取简历信息数据
  // 从store 中获取指定数据，存储在 state.resumeModel.base 中
  // 使用 useSelector Hook 获取仓库中的 base 数据项，将该数据项强制转换为 TSResume.Base 类型
  const base: TSResume.Base = useSelector(
    (state: any) => state.resumeModel.base
  );
  // 获取工具条模块keys
  const resumeToolbarKeys: string[] = useSelector(
    (state: any) => state.templateModel.resumeToolbarKeys
  );
  // 必须带有id，以方便导出时获取DOM元素内容
  return (
    <div styleName="a4-box">
      <div styleName="flex container" id="visPdf">
        {/* 左侧 */}
        <div styleName="left">
          <div styleName="avatar">
            <Avatar />
          </div>
          <div styleName="fillColor" />
          <div styleName="baseData">
            <BaseInfo />
            // 只有 resumeToolbarKeys 数组中包含 RESUME_TOOLBAR_MAPS.contact 这个值时，才会渲染一个名为 Contact 的组件
            {resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.contact) && (
              <Contact />
            )}
            {resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.workPrefer) && (
              <Job />
            )}
            {resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.certificate) && (
              <Certificate />
            )}
          </div>
        </div>
        {/* 内容 */}
        <div styleName="center">
          {(resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.evaluation) ||
            base?.username) && <Synopsis />}
          <div styleName="listData">
            {resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.skill) && <Skill />}
            {resumeToolbarKeys.includes(
              RESUME_TOOLBAR_MAPS.schoolExperience
            ) && <Post />}
            {resumeToolbarKeys.includes(
              RESUME_TOOLBAR_MAPS.projectExperience
            ) && <Project />}
            {resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.workExperience) && (
              <Work />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateOne;
