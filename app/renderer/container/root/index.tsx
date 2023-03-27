import React, { useEffect } from "react";
import { shell } from "electron";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { ROUTER_ENTRY, ROUTER_KEY } from "@common/constants/router";
import { isHttpOrHttpsUrl } from "@common/utils/router";
import "./index.less";

function Root() {
  const history = useHistory();
  const appName = useSelector((state: any) => state.globalModel.appName);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      console.log("3s 后修改...");

      dispatch({
        type: "globalModel/setStore",
        payload: {
          key: "appName",
          values: "My_Resume_changed",
        },
      });
    }, 3000);
  }, []);

  useEffect(() => {
    console.log("appName = ", appName);
  }, [appName]);

  const onRouterToLink = (router: TSRouter.Item) => {
    if (isHttpOrHttpsUrl(router.url)) {
      shell.openExternal(router.url);
    } else {
      console.log("跳转到简历页面");
      history.push(router.url);
    }
  };

  return (
    <div styleName="root">
      <div styleName="container">
        <div styleName="title">My_Resume</div>
        <div styleName="tips">
          写简历并非难事
          <br />
          即刻进入My_Resume，创建或迭代你的简历
        </div>
        <div styleName="action">
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
              Copyright © 2018-{new Date().getFullYear()} All Rights Reserved.
              Copyright By Huang Ying
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Root;
