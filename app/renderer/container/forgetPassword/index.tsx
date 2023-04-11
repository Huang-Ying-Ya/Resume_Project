import React, { useEffect } from "react";
// import { ipcRenderer } from "electron";
const { ipcRenderer } = require("electron");
import { useNavigate } from "react-router-dom";
import "./index.less";
import ROUTER from "@src/common/constants/router";
import { Button, Input, Space } from "antd";
import {
  UserOutlined,
  KeyOutlined,
} from '@ant-design/icons';

function ForgetPassword() {
  const navigate = useNavigate();

  // 去登录
  const goLogin = () => {
    navigate(ROUTER.login);
  }
  return (
    <div styleName="forget-password">
      <div styleName="title">找回密码<KeyOutlined/></div>
      <div styleName="form-group">
        <Input 
          placeholder="请输入您的手机号" 
          prefix={<UserOutlined styleName="icon-style"/>} 
          styleName="input-style"
        />
      </div>
      <div styleName="form-group">
        <Space direction="horizontal">
          <Input
            placeholder="请输入验证码"
            styleName="input-style"
            //visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          />
          <Button style={{ width: 120, height: 40, borderRadius: 6,}} 
            //onClick={() => setPasswordVisible(prevState => !prevState)}
          >
            获取验证码
          </Button>
        </Space>
      </div>
      <div styleName="form-group">
        <Input.Password
          placeholder="请输入您的密码"
          prefix={<KeyOutlined styleName="icon-style"/>}
          styleName="input-style"
          //iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </div>
      <div styleName="form-group">
        <Input.Password
          placeholder="请再次输入密码"
          prefix={<KeyOutlined styleName="icon-style"/>}
          styleName="input-style"
          //iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </div>
      <Button styleName="sure-button" type="primary">
        确认修改
      </Button>
      <div styleName="form-group">
        <Button type="link" styleName="return" onClick={goLogin}>返回登录</Button>
      </div>
    </div>
  );
}
export default ForgetPassword;
