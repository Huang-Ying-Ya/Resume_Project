import React, { useEffect } from "react";
// import { shell } from "electron";
const { shell, ipcRenderer} = require("electron");
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ROUTER, { ROUTER_ENTRY, ROUTER_KEY } from "@common/constants/router";
import { isHttpOrHttpsUrl } from "@common/utils/router";
import { cancelLogin } from "@src/api";
import { message } from "antd";
import "./index.less";

function Root() {
  const navigate = useNavigate(); // 通过history.push进行跳转
  const dispatch = useDispatch();

  const onRouterToLink = (router: TSRouter.Item) => {
    if (isHttpOrHttpsUrl(router.url)) {
      // 通过shell模块（electron提供的），打开路由
      shell.openExternal(router.url); // 如果是外部可访问的链接（是不是http或https）
    } else {
      if(router.url===ROUTER.login) {
        goRoot();
      }else if(router.url===ROUTER.resume){
        const params ={resumeId:0};
      navigate(ROUTER.resume,{state:params})
      }else{
        navigate(router.url);
      }
    }
  };

  // 去登录界面切换页面大小
  const goRoot = async () => {
    try {
      const data = await cancelLogin();
      console.log('success',data);
      
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
      ipcRenderer.send('changeWindowSizeSmall','');
      ipcRenderer.on('changeSize',(event:any, arg:boolean) => {
        if (arg) {
          // console.log(arg);
          // console.log('成功');
        } else {
          // console.log('失败'); 
        }
      })
      navigate(ROUTER.login);
    } catch (error:any) {
      message.error(error.message)
    }
  }

  return (
    <div styleName="root">
      <div styleName="container">
        <div styleName="title">My_Resume</div>
        <div styleName="tips">
          开始你的第一份简历
          <br />
          即刻进入My_Resume，创建或迭代你的个人简历
        </div>
        <div styleName="action">
           {/* .map: 便利数组 */}
          {ROUTER_ENTRY.map((router: TSRouter.Item) => {
            return (
              <div
                key={router.key}
                styleName="item"
                onClick={() => onRouterToLink(router)}
              >
                {router.text}
              </div>
            );
          })}
        </div>
        <div styleName="copyright">
          <div styleName="footer">
            <p styleName="copyright">
              Copyright By Huang Ying
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Root;
