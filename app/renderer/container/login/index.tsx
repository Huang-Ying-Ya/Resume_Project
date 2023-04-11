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

function Login() {
  const navigate = useNavigate();
  const sendLoginInfo = ()=>{}
  // 去首页
  const goRoot = () => {
    ipcRenderer.send('changeWindowSize','');
    ipcRenderer.on('change',(event:any, arg:boolean) => {
      if (arg) {
        console.log(arg);
        console.log('成功');
      } else {
        console.log('失败'); 
      }
    })
    navigate(ROUTER.root)
  }

  // 去注册
  const goRegister = () => {
    navigate(ROUTER.register)
  }
  // 去找回密码
  const goForgetPassword = () => {
    navigate(ROUTER.forgetPassword)
  }
  return (
    <div styleName="login">
      <div styleName="title">My Resume</div>
      <div styleName="form-group">
        <Input 
          placeholder="请输入您的id或手机号" 
          prefix={<UserOutlined styleName="icon-style"/>} 
          styleName="input-style"
        />
      </div>
      <div styleName="form-group">
        <Input.Password
          placeholder="请输入您的密码"
          prefix={<KeyOutlined styleName="icon-style"/>}
          styleName="input-style"
          //iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </div>
      {/* <div styleName="form-group">
        <Space direction="horizontal">
          <Input
            placeholder="请输入验证码"
            styleName="input-style"
            //visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          />
          <Button style={{ width: 120 }} 
            //onClick={() => setPasswordVisible(prevState => !prevState)}
          >
            获取验证码
          </Button>
        </Space>
      </div> */}
      <Button styleName="login-button" type="primary" onClick={goRoot}>
        登录
      </Button>
      <div styleName="form-group">
        <Button type="link" styleName="forget" onClick={goForgetPassword}>忘记密码</Button>
        <Button type="link" styleName="register" onClick={goRegister}>注册</Button>
      </div>
    </div>
  );
}
export default Login;
