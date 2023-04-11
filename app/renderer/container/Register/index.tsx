import React, { useEffect } from "react";
const { ipcRenderer } = require("electron");
import "./index.less";
import ROUTER from "@src/common/constants/router";
import { Button, Input, Space } from "antd";
import {
  SmileOutlined,
  UserOutlined,
  KeyOutlined,
  HeartOutlined,
} from '@ant-design/icons';

function Register() {
  const goLogin = () => {
  }
  
  return (
    <div styleName="register">
      <div styleName="title">欢迎你的加入<HeartOutlined /></div>
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
      <Button styleName="register-button" type="primary">
        注册
      </Button>
      <div styleName="form-group">
        <Button type="link" styleName="login" onClick={goLogin}>去登录</Button>
      </div>
    </div>
  );
}
export default Register;

