import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROUTER, { ROUTER_ENTRY, ROUTER_KEY } from "@common/constants/router";
import "./index.less";
const { ipcRenderer} = require("electron");

import { Button, Form, Checkbox, Space, Input, message} from 'antd';
import { UserOutlined, MailOutlined, KeyOutlined } from '@ant-design/icons';
import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";
import { askCode, cancelLogin, changePassword } from "@src/api";

function MyPassword() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isDisable, setIsDisable] = useState(false);
  // const [textOnAskCode, setTextOnAskCode] = useState('获取验证码');
  const [countdown,setCountdown] = useState(60);
// 发送验证码
const sendMessage = async() => {
  form.validateFields(['mobile']).then(() => {
    sendAskCode();
  }).catch(() => {
    // 格式错误
    message.error('请输入正确的手机号格式再尝试发送验证码');
  });
}
  // 发送请求请求验证码
  const sendAskCode = async() => {
    const values = form.getFieldsValue()
    const { mobile } =values;
    console.log('发送验证码');
    
    try {
      const { data } =await askCode({
        mobile,
      })
      if(data.error_code!=0) {
        message.error(data.message);
        return;
      }
      setIsDisable(true);
      setCountdown(60);
      // setTextOnAskCode(`${countdown}秒后可重发`);
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        setIsDisable(false);
        // setTextOnAskCode('获取验证码');
      }, 60000);
      console.log('data',data);
    } catch (error:any) {
      message.error(error.message)
    }
  }

  const onFinish = async(values: any) => {
    console.log('Success:', values);
    const { mobile, code, password, passwordAgain } =values;
    console.log('mobile',mobile);
    if(password != passwordAgain) {
      message.error('您输入的两次密码不一致，请重新输入');
      return
    }
    try {
      const { data } =await changePassword({
        mobile,
        password,
        code,
      })
      console.log('data',data);
      if(data.error_code!=0) {
        message.error(data.message);
      } else {
        message.success('密码修改成功');
        setInterval(async() => {
          // navigate(ROUTER.personalCentre);  
          // 去登录界面切换页面大小
          try {
            const data = await cancelLogin();
            console.log('success',data);
            
            if (localStorage.getItem('token')) {
              localStorage.removeItem('token');
            }
            ipcRenderer.send('changeWindowSizeSmall','');
            ipcRenderer.on('changeSize',(event:any, arg:boolean) => {
            })
            navigate(ROUTER.login);
          } catch (error:any) {
            message.error(error.message)
          }
        },3000);
      }
    } catch (error:any) {
      message.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div styleName="my-password">
      <Form
        name="myPassword"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        styleName="form"
        form={form}
      >
      <Form.Item
        // label="手机号"
        name="mobile"
        rules={[{ required: true, message: 'Please input your phone number!', pattern:new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g") }]}
      >
        <Input 
          placeholder="请输入您的手机号" 
          prefix={<UserOutlined/>} 
          styleName="input-style"
        />
      </Form.Item>
      <Form.Item
        // label="验证码"
        name="code"
        rules={[{ required: true, message: 'Please input your code!' }]}
      >
        <Space direction="horizontal">
          <Input
            placeholder="请输入验证码"
            prefix={<MailOutlined />}
            styleName="input-style"
          />
          <Button style={{ width: 120, height: 30, }} 
            onClick={sendMessage}
            disabled={isDisable}
          >
            {isDisable? `${countdown}秒后可重发` : '获取验证码'}
          </Button>
        </Space>
      </Form.Item>
      <Form.Item
        // label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          placeholder="请输入您的新密码"
          prefix={<KeyOutlined/>}
          styleName="input-style"
        />
      </Form.Item>
      <Form.Item
        // label="Password"
        name="passwordAgain"
        rules={[{ required: true, message: 'Please input your password Again!' }]}
      >
        <Input.Password
          placeholder="请再次输入您的新密码"
          prefix={<KeyOutlined/>}
          styleName="input-style"
        />
      </Form.Item>
      {/* <Form.Item wrapperCol={{ offset: 0, span: 24 }} >
        <Button styleName="sure-button" type="primary"  htmlType="submit">
          提交更改
        </Button>
      </Form.Item> */}
      <Button styleName="sure-button" type="primary"  htmlType="submit">
        提交更改
      </Button>
      {/* <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <Button type="link" styleName="forget" onClick={goForgetPassword}>忘记密码</Button>
        <Button type="link" styleName="register" onClick={goRegister}>注册</Button>
      </Form.Item> */}
      </Form>
    </div> 
  );
}
export default MyPassword;
