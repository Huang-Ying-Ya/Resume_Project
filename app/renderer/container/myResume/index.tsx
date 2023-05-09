import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ROUTER, { ROUTER_ENTRY, ROUTER_KEY } from "@common/constants/router";
import { useNavigate } from "react-router-dom";
import { toPrintPdf } from "@common/utils/htmlToPdf";
import "./index.less";
import { EditOutlined } from '@ant-design/icons';
import MyModal from "@common/components/MyModal";
// TODO: 这里不能直接引入位置，而要这么写
import ShowImage from '@assets/outlookOne.jpg';


import { Button, Row, Col, Image, Input, Modal, message} from 'antd';
import { changeTitle, deleteResume, getResumes } from "@src/api";
import { getToken } from "@src/common/utils/token";
import {generateRandomString} from "@src/common/utils/random";


interface ResumeItemProps {
  title: string;
  id: number;
  userId: number;
  resumeModelId: number;
};

function MyResume() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [resumeItems,setResumeItems] = useState([{ title:'123', id:123 }, {title:'123', id:456},]);
  const [resumeItems, setResumeItems] = useState<ResumeItemProps[]>([]);
  // const [isShowModal, setIsShowModal] = useState(false); // 导出简历的弹窗
  // const [oldTitle,setOldTitle] = useState(''); // 选中的简历标题的原本标题
  const [title,setTitle] = useState(''); // 选中的简历标题
  const [id,setId] = useState(0); // 选中的简历的id

  useEffect(() => {
    const getResumesInfo = async() => {
      try {
        const { data } = await getResumes();
        const code =data.error_code;
        setResumeItems(data.data);
        if(code===40100) {
          message.error('用户登录信息过期，请重新登录');
          setTimeout(() => {
              navigate(ROUTER.login);
            }, 2000); 
        }
        // getToken(data.error_code);
        // console.log('title',data.data[0].title);
      } catch (error:any) {
        message.error(error.message)
      }
    }
    getResumesInfo();
  },[]);

  const getResumesInfo = async() => {
    try {
      const { data } = await getResumes();
      const code =data.error_code;
      setResumeItems(data.data);
      if(code===40100) {
        message.error('用户登录信息过期，请重新登录');
        setTimeout(() => {
            navigate(ROUTER.login);
          }, 2000); 
      }
      // getToken(data.error_code);
      // console.log('title',data.data[0].title);
    } catch (error:any) {
      message.error(error.message)
    }
  }

  // 显示修改简历标题
  const showModal = (id:number, title:string) => {
    setId(id);
    // setOldTitle(title);
    setTitle(title);
    setIsModalOpen(true);
  };

  // 当输入的简历标题变化时
  const handleChangeTitle = (e:any) =>{
    // console.log('value',e.target.value);
    setTitle(e.target.value);
  }

  // 确认修改简历标题
  const handleOk = async() => {
    
    try {
      const { data } = await changeTitle({
        ResumeId:id,
        Title:title,
      });
      // console.log('data',data);
      getResumesInfo();
    } catch (error:any) {
      message.error(error.message)
    } 
    setIsModalOpen(false);
  };

  // 取消修改简历标题
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 编辑简历
  const handleEdit = (id:number, modelId:number) => {
    const params ={resumeId:id, resumeModelId:modelId};
    navigate(ROUTER.resume,{state:params})
  }

  // 删除简历
  const handleDelete = async(id: number) => {
    try {
      const { data } = await deleteResume({
        resumeId: id,
      });
      // console.log('data', data, id);
      // resumeItems.filter((item) => {
      //   return item.id !== id;
      // });
      getResumesInfo();
    } catch (error: any) {
      message.error(error.message);
    }
  }
  return (
    <div styleName="my-resume">
      {
        resumeItems && resumeItems.map((item, i)=>{
          return (
            <Row justify="space-between" styleName="group-resume" key={i}>
              <Col span={6}>
                <Image
                  width={180}
                  height={200}
                  src={ShowImage}
                />
              </Col>
              <Col span={14} styleName="title">
                <span>{item.title}</span>
                <Button styleName="title-icon" type="link" onClick={() => showModal(item.id, item.title)}>
                  <EditOutlined />
                </Button>
                <Modal title="修改简历标题（备注）" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <Row justify="space-between">
                    <Col span={3}>
                      标题：
                    </Col>
                    <Col span={21}>
                      <Input placeholder="请输入您的新标题"  value={title} onChange={handleChangeTitle}/>
                    </Col>
                  </Row>
                </Modal>
              </Col>
              <Col span={4}>
                <Button type="link" block styleName="resume-button" onClick={() => handleEdit(item.id,item.resumeModelId)}>编辑</Button>
                {/* <Button type="link" block styleName="resume-button" onClick={() => handleDownload(item.title)}>下载</Button> */}
                <Button type="link" block styleName="resume-button" onClick={() => handleDelete(item.id)}>删除</Button>
              </Col>
            </Row>
          )
        })
      }
    </div> 
  );
}
export default MyResume;
