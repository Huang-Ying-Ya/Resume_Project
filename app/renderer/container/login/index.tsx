import React, { useEffect, useState } from "react";
// import { ipcRenderer } from "electron";
const { ipcRenderer } = require("electron");
import { useNavigate } from "react-router-dom";
import "./index.less";
import ROUTER from "@src/common/constants/router";
import { Button, Input, Space, Form, Checkbox, message} from "antd";
import {
  UserOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { goLogin } from "@src/api";
import { Encryption,Decryption} from "@src/common/utils/jsencrypt";

function Login() {
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    mobile:'',
    password:'',
  })

  useEffect(()=>{
    if(localStorage.getItem('remember')){
      // console.log('我被执行了');
      setFormData({
        // mobile:localStorage.getItem('mobile')||'',
        // password:Decryption(localStorage.getItem('password')||''),
        mobile:'123',
        password:'456',
      })
    }
  },[])

  // 去注册
  const goRegister = () => {
    navigate(ROUTER.register)
  }
  // 去找回密码
  const goForgetPassword = () => {
    navigate(ROUTER.forgetPassword)
  }

  // 去首页
  const onFinish = async (values: any) => {
    // console.log('Success:', values);
    
    const { mobile,password,remember } =values;
    try {
      const { data } =await goLogin({
        mobile,
        password,
      })
      if(data.error_code!=0) {
        message.error(data.message);
        return;
      }
      if (remember) {
        localStorage.setItem('remember',remember);
        localStorage.setItem('mobile',mobile);
        localStorage.setItem('password',Encryption(password));
      } else {
        if (localStorage.getItem("mobile")) {
          localStorage.removeItem('mobile');
          localStorage.removeItem('password');
        }
        if(localStorage.getItem('remember')) {
          localStorage.removeItem('remember');
        }
      }
      // console.log('data',data);
      // console.log('token',data.data.access_token);
      var token=Encryption(data.data.access_token);
      // console.log('加密后',token);
      localStorage.setItem('token',token);
      ipcRenderer.send('changeWindowSize','');
      ipcRenderer.on('change',(event:any, arg:boolean) => {
        if (arg) {
          console.log(arg);
          // console.log('成功');
        } else {
          // console.log('失败'); 
        }
      })
      navigate(ROUTER.root);  
    } catch (error:any) {
      message.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div styleName="login">
      <div styleName="title">My Resume</div>
      <Form
        name="login"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: localStorage.getItem('remember')||false, mobile:localStorage.getItem('mobile')||'', password:Decryption(localStorage.getItem('password')||'') }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        styleName="form"
      >
      <Form.Item
        // label="手机号"
        name="mobile"
        rules={[{ required: true, message: 'Please input your mobile!', pattern:new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g") }]}
        // styleName="form-group"
      >
        <Input 
          placeholder="请输入您的id或手机号" 
          prefix={<UserOutlined/>} 
          styleName="input-style"
          // value={formData.mobile}
        />
      </Form.Item>
      <Form.Item
        // label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          placeholder="请输入您的密码"
          prefix={<KeyOutlined/>}
          styleName="input-style"
        />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 24 }}>
        <Checkbox>记住我</Checkbox>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        {/* htmlType="submit"属性触发Form表单onFinish事件 */}
        <Button styleName="login-button" type="primary" htmlType="submit">
          登录
        </Button>
        <Button type="link" styleName="forget" onClick={goForgetPassword}>忘记密码</Button>
        <Button type="link" styleName="register" onClick={goRegister}>注册</Button>
      </Form.Item>
      {/* <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <Button type="link" styleName="forget" onClick={goForgetPassword}>忘记密码</Button>
        <Button type="link" styleName="register" onClick={goRegister}>注册</Button>
      </Form.Item> */}
      </Form>
      {/* <div styleName="form-group">
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
      </div> */}
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
      {/* <Button styleName="login-button" type="primary" onClick={goRoot} htmlType="submit">
        登录
      </Button> */}
      {/* <div styleName="form-group">
        <Button type="link" styleName="forget" onClick={goForgetPassword}>忘记密码</Button>
        <Button type="link" styleName="register" onClick={goRegister}>注册</Button>
      </div> */}
    </div>
  );
}
export default Login;
