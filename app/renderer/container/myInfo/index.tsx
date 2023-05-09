import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ROUTER, { ROUTER_ENTRY, ROUTER_KEY } from "@common/constants/router";
import { isHttpOrHttpsUrl } from "@common/utils/router";
import "./index.less";

import { Button, Row, Col, Avatar, Input, Modal, message, Upload} from 'antd';
import { UserOutlined, LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import { changeUsername, getInfo } from "@src/api";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

function MyInfo() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personalInfo,setPersonalInfo]= useState({
    username:'dsdU893gir',
    userId:'3',
    userMobile:'18522696836',
    userAvatar:'',
  });
  const [username,setUsername] = useState(''); // 选中的简历标题
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

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
      if(data.error_code!=0){
        message.error(data.message);
        return;
      }
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
      if (data.error_code!=0) {
        message.error(data.message);
        return;
      }
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

  // 处理头像上传
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    console.log('info',info);
    
    // if (info.file.status === 'uploading') {
    //   setLoading(true);
    //   setImageUrl(info.file.uid);
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj as RcFile, (url) => {
    //     setLoading(false);
    //     setImageUrl(url);
    //   });
    // }
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div styleName="info">
      <div styleName="top">
        <Row justify="space-between">
          <Col span={3} styleName="avatar">
            {/* <Avatar size={90} icon={<UserOutlined />} src={personalInfo.userAvatar}/> */}
            <Upload
              name="avatar"
              // listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <Avatar size={90} icon={<UserOutlined />} src={personalInfo.userAvatar}/>} */}
              {imageUrl ? <Avatar size={90} icon={<UserOutlined />} src={imageUrl}/> : <Avatar size={90} icon={<UserOutlined />} src={personalInfo.userAvatar}/>}
            </Upload>
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
