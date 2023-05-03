import React, { useEffect } from "react";
import "./index.less";
// 👇 将组件引入
import ResumeAction from "./ResumeAction";
import ResumeContent from "./ResumeContent";
import ResumeToolbar from "./ResumeToolbar";
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { checkResumeInfo } from "@src/api";
import {message} from "antd";
import useUpdateResumeHook from '@src/container/resume/ResumeContent/useUpdateResumeHook';

function Resume() {
  const updateResumeHook = useUpdateResumeHook();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = location.state;
  const resumeId = params.resumeId;
  // const resumeToolbarKeys: string[] = useSelector(
  //   (state: any) => state.templateModel.resumeToolbarKeys
  // );
  // 发起一个 Action，修改 redux 中的数据值 改变简历模块的 keys
  const changeResumeToolbarKeys = (moduleKeys: string[]) => {
    if (moduleKeys.length > 0) {
      // 向 store 发送 action
      dispatch({
        // type 字段用来描述这个 action 发生了什么，需要一个字符串常量
        type: "templateModel/setStore",
        // payload 字段用来描述这个 action 需要发送的数据，可以是任意类型的数据
        payload: {
          // resumeToolbarKeys用来让展示简历的部分看是否需要展示
          key: "resumeToolbarKeys",
          values: moduleKeys,
        },
      });
    }
  };
  useEffect(()=>{
    const getResumesInfo = async() => {
      try {
        const { data } = await checkResumeInfo({
          resumeId:resumeId
        });
        console.log('data',data);
        const resumeToolBar = data.data.resumeToolBar
        // 将resumeToobar赋值，并且要更改store里面的数据
        changeResumeToolbarKeys(resumeToolBar)
        // console.log('resumeToolbarKeys',state.templateModel.resumeToolbarKeys);
        
      } catch (error:any) {
        message.error(error.message)
      }
    }
    if(resumeId!=0) {
      getResumesInfo();
    }
  })
  return (
    <div styleName="container">
      <div styleName="header">
        <ResumeAction />
      </div>
      <div styleName="content">
        <ResumeContent />
      </div>
      <div styleName="toolbar">
        <ResumeToolbar />
      </div>
    </div>
  );
}
export default Resume;
