import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ROUTER, { ROUTER_ENTRY, ROUTER_KEY } from "@common/constants/router";
import { useNavigate } from "react-router-dom";
import { toPrintPdf } from "@common/utils/htmlToPdf";
import "./index.less";
import { EditOutlined } from '@ant-design/icons';
import MyModal from "@common/components/MyModal";

// TODO: 这里不能直接引入位置，而要这么写
import ShowImageOne from '@assets/outlookOne.jpg';
import ShowImageTwo from '@assets/outlookTwo.jpg';


import { Button, Row, Col, Image, Input, Modal, message} from 'antd';
import {generateRandomString} from "@src/common/utils/random";

interface modelObject {
  imgUrl: string,
  resumeModelId: number,
}

function ResumeModelEasy() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeItems, setResumeItems] = useState<modelObject[][]>();
  const [title,setTitle] = useState(''); // 选中的简历标题
  const [id,setId] = useState(0); // 选中的简历的id

  useEffect(() => {
    setResumeItems([[{imgUrl:ShowImageOne,resumeModelId:1},{imgUrl:ShowImageTwo,resumeModelId:2}]]);

  },[]);
  const goResume = (resumeModelId:number) => {
    const params ={resumeId:0, resumeModelId};
    navigate(ROUTER.resume,{state:params});
  }
  return (
    <div styleName="my-resume">
      {
        resumeItems && resumeItems.map((item, i)=>{
          return (
            <Row justify="start" styleName="group-resume" key={i}>
              {
                item && item.map((smallItem,j)=>{
                  return(
                    <Col span={8} styleName="group-img">
                      <Image
                        width={180}
                        height={200}
                        src={smallItem.imgUrl}
                      />
                      <Button type="link" onClick={() => goResume(smallItem.resumeModelId)}>使用</Button>
                    </Col>
                  )
                })
              }
              {/* <Col span={8}>
                <Image
                  width={180}
                  height={200}
                  src={item[0]}
                />
              </Col>
              <Col span={8} styleName="title">
                <Image
                  width={180}
                  height={200}
                  src={item[1]}
                />
              </Col>
              <Col span={8}>
              <Image
                  width={180}
                  height={200}
                  src={item[2]}
                />
              </Col> */}
            </Row>
          )
        })
      }
    </div> 
  );
}
export default ResumeModelEasy;
