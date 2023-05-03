import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ROUTER, { ROUTER_ENTRY, ROUTER_KEY } from "@common/constants/router";
import { isHttpOrHttpsUrl } from "@common/utils/router";
import "./index.less";

import { Button, Row, Col, Avatar, Input, Modal, message} from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { changeUsername, getInfo } from "@src/api";
import { getToken } from "@src/common/utils/token";

function MyInfo() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personalInfo,setPersonalInfo]= useState({
    username:'dsdU893gir',
    userId:'3',
    userMobile:'18522696836',
    userAvatar:'',
  });
  const [username,setUsername] = useState(''); // 选中的简历标题


  useEffect(() => {
    const getPersonalInfo = async() => {
      try {
        const { data } = await getInfo();
        console.log('data',data);
        console.log('error_code',data.error_code);
        // getToken(data.error_code);
        setPersonalInfo({
          username:data.data.username,
          userId:data.data.id,
          userMobile:data.data.mobile,
          userAvatar:data.data.avatar,
        })
      } catch (error:any) {
        message.error(error.message)
      }
    }
    getPersonalInfo();
    
  },[]);

  const getPersonalInfo = async() => {
    try {
      const { data } = await getInfo();
      console.log('data',data);
      console.log('error_code',data.error_code);
      // getToken(data.error_code);
      setPersonalInfo({
        username:data.data.username,
        userId:data.data.id,
        userMobile:data.data.mobile,
        userAvatar:data.data.avatar,
      })
    } catch (error:any) {
      message.error(error.message)
    }
  }

  // 当输入的用户名变化时
  const handleChangeUsername = (e:any) =>{
    // console.log('value',e.target.value);
    setUsername(e.target.value);
  }
  

  // 显示修改昵称弹窗
  const showModal = () => {
    setIsModalOpen(true);
  };

  // 确认修改昵称
  const handleOk = async() => {
    try {
      const { data } = await changeUsername({
        username,
      });
      console.log('data',data);
      getPersonalInfo();
    } catch (error:any) {
      message.error(error.message)
    } 
    setIsModalOpen(false);
  };

  // 取消修改昵称
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div styleName="info">
      <div styleName="top">
        <Row justify="space-between">
          <Col span={3} styleName="avatar">
            <Avatar size={90} icon={<UserOutlined />} src={personalInfo.userAvatar}/>
          </Col>
          <Col span={21} styleName="username">
            <span>{personalInfo.username}</span>
            <span styleName="edit">
              <Button type="link" onClick={showModal}>
                编辑
              </Button>
              <Modal title="修改昵称" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Row justify="space-between" styleName="group-info">
                  <Col span={3} styleName="front">
                    昵称：
                  </Col>
                  <Col span={21} styleName="end">
                    <Input placeholder="请输入您的新昵称" defaultValue={personalInfo.username} onChange={handleChangeUsername}/>
                  </Col>
                </Row>
              </Modal>
            </span>
          </Col>
        </Row>
      </div>
      <div styleName="bottom">
        <div styleName="title">基本信息</div>
        <Row justify="space-between" styleName="group-info">
          <Col span={3} styleName="front">
            用户ID：
          </Col>
          <Col span={21} styleName="end">
            {personalInfo.userId}
          </Col>
        </Row>
        <Row justify="space-between" styleName="group-info">
          <Col span={3} styleName="front">
            昵称：
          </Col>
          <Col span={21} styleName="end">
            {personalInfo.username}
          </Col>
        </Row>
        <Row justify="space-between" styleName="group-info">
          <Col span={3} styleName="front">
            手机号：
          </Col>
          <Col span={21} styleName="end">
            {personalInfo.userMobile}
          </Col>
        </Row>
      </div>
    </div> 
  );
}
export default MyInfo;
