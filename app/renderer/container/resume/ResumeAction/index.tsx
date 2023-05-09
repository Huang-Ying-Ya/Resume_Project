/**
 * @description 制作简历-操作区
 */
import React, { useEffect, useState } from "react";
import "./index.less";
import { useNavigate } from "react-router-dom";
import ROUTER from "@common/constants/router";
import MyButton from "@common/components/MyButton";
import { toPrintPdf } from "@common/utils/htmlToPdf";
import { useSelector } from "react-redux";
import MyModal from "@common/components/MyModal";
import { Button, Row, Col, Input, Modal, message} from 'antd';
import { saveTitle, saveContact, saveWorkHope, saveCertificate, saveEvaluation, saveBasicInfo, saveSchoolExperience, saveWorkExperience, saveProjectExperience, saveSkill, saveEducationExperience } from "@src/api";
import { RESUME_TOOLBAR_MAPS } from "@common/constants/resume";
// import { getToken } from "@src/common/utils/token";

function ResumeAction(props: any) {
  const { resumeModelId } = props;
  const navigate = useNavigate();
  const [title,setTitle] = useState('');
  const [showModal, setShowModal] = useState(false); // 导出简历的弹窗
  const [isModalOpen, setIsModalOpen] = useState(false);// 保存简历的弹窗

  // 已经被添加的模块清单（需要根据清单发送请求保存）
  const resumeToolbarKeys: string[] = useSelector(
    (state: any) => state.templateModel.resumeToolbarKeys
  );

  // 基本信息
  const base: TSResume.Base = useSelector(
    (state: any) => state.resumeModel.base
  );
  // 工作意向
  const work: TSResume.Work = useSelector(
    (state: any) => state.resumeModel.work
  );
  // 联系方式
  const contact: TSResume.Contact = useSelector(
    (state: any) => state.resumeModel.contact
  );
  // 学生工作经历
  const schoolExperience: TSResume.SchoolExperience = useSelector(
    (state: any) => state.resumeModel.schoolExperience[0]
  );
  // 工作经历
  const workExperience: TSResume.WorkExperience = useSelector(
    (state:any) => state.resumeModel.workExperience[0]
  );
  // 项目经历
  const projectExperience: TSResume.ProjectExperience = useSelector(
    (state:any) => state.resumeModel.projectExperience[0]
  );
  // 技能清单
  const skill: TSResume.Skill = useSelector(
    (state:any) => state.resumeModel.skill
  );
  // 荣誉证书
  const certificate: TSResume.Certificate = useSelector(
    (state:any) => state.resumeModel.certificate
  );
  // 个人评价
  const evaluation: TSResume.Evaluation = useSelector(
    (state:any) => state.resumeModel.evaluation
  );

  useEffect(() => {
    // 监听当isModalOpen或contact变化时
    if(!isModalOpen) {
      // console.log('contact',contact);
      // console.log('base',base);
      // console.log('work',work);
      // console.log('schoolExperience',schoolExperience);
      // console.log('workExperience',workExperience);
      // console.log('projectExperience',projectExperience);
      // console.log('skill',skill);
      // console.log('certificate',certificate);
      // console.log('evaluation',evaluation);      
    }
    // console.log('resumeToolbarKeys',resumeToolbarKeys);
  },[isModalOpen,contact,base,work,schoolExperience,workExperience,projectExperience,skill,certificate,evaluation,resumeToolbarKeys]);

  // 返回首页
  const onBack = () => navigate(ROUTER.resumeModelCentre);

  // 保存简历
  const onSave = () => {
    openModal();
  }

  // 导出pdf
  // const onExport = () =>{
  //   setShowModal(true);
  //   toPrintPdf(`${base?.username}+${base?.school}+${work?.job}`);
  // }

  // 显示增加标题弹窗
  const openModal = () => {
    setIsModalOpen(true);
  };

  const changeTitle = (e:any) =>{
    // console.log('value',e.target.value);
    setTitle(e.target.value);
  }

  // 确认增加标题，保存简历
  const handleOk = async() => {
    // console.log('title',title);
    
    try {
      const { data } = await saveTitle({
        title,
        resumeModelId,
      });
      if(data.error_code!=0) {
        message.error(data.message);
        return;
      }
      console.log('data',data);
      const resumeId = data.data.id;
      // getToken(data.error_code);
      // console.log('if true', resumeToolbarKeys, RESUME_TOOLBAR_MAPS.contact, resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.contact));
      
      if(resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.contact)) {
        // console.log('要提交contact表单了');
        
        handleContact(resumeId);
      }
      if(resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.personal)) {
        handleBasicInfo(resumeId);
      }
      if(resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.education)) {
        handleEducationExperience(resumeId);
      }
      if(resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.workPrefer)) {
        handleWorkHope(resumeId);
      }
      if(resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.schoolExperience)) {
        handleSchoolExperience(resumeId);
      }
      if(resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.projectExperience)) {
        handleProjectExperience(resumeId);
      }
      if(resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.workExperience)) {
        handleWorkExperience(resumeId);
      }
      if(resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.certificate)) {
        handleCertificate(resumeId);
      }
      if(resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.evaluation)) {
        handleEvaluation(resumeId);
      }
      if(resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.skill)) {
        handleSkill(resumeId);
      }
      setTitle('');
    } catch (error:any) {
      message.error(error.message);
    }
    setIsModalOpen(false);
  };

  // 保存个人信息
  const handleContact = async(resumeId:any) => {
    try {
      
      const data =await saveContact({
        resumeId,
        phone:contact.phone,
        email:contact.email,
      });
      // console.log('data',data);
      
    } catch (error:any) {
      message.error(error.message);
    }
  }

  // 保存工作期望
  const handleWorkHope = async(resumeId:any) => {
    try {
      const data =await saveWorkHope({
        resumeId,
        job:work.job,
        city:work.city,
      });
      // console.log('data',data);
      
    } catch (error:any) {
      message.error(error.message);
    }
  }

  // 保存技能
  const handleSkill = async(resumeId:any) => {
    try {
      const data =await saveSkill({
        resumeId,
        skill:skill,
      });
      console.log('data',data);
      
    } catch (error:any) {
      message.error(error.message);
    }
  }

  // 保存荣誉证书
  const handleCertificate = async(resumeId:any) => {
    try {
      const data =await saveCertificate({
        resumeId,
        certificate:certificate,
      });
      console.log('data',data);
      
    } catch (error:any) {
      message.error(error.message);
    }
  }

  // 保存个人评价
  const handleEvaluation = async(resumeId:any) => {
    try {
      const data =await saveEvaluation({
        resumeId,
        evaluation:evaluation,
      });
      console.log('data',data);
      
    } catch (error:any) {
      message.error(error.message);
    }
  }

  // 保存基本信息
  const handleBasicInfo = async(resumeId:any) => {
    try {
      const data =await saveBasicInfo({
        resumeId,
        avatar:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F19%2F20210719150601_4401e.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1684640135&t=161876bc26904f3f908ba4687d04361d",
        username:base.username,
        hometown:base.hometown,
      });
      console.log('data',data);
      
    } catch (error:any) {
      message.error(error.message);
    }
  }

  // 保存教育信息
  const handleEducationExperience = async(resumeId:any) => {
    try {
      const data =await saveEducationExperience({
        resumeId,
        school:base.school,
        degree:base.degree,
        major:base.major,
        beginTime:base.onSchoolTime?.beginTime,
        endTime:base.onSchoolTime?.endTime,
      });
      console.log('data',data);
      
    } catch (error:any) {
      message.error(error.message);
    }
  }

  // 保存学生工作经历
  const handleSchoolExperience = async(resumeId:any) => {
    try {
      const data =await saveSchoolExperience({
        resumeId,
        department:schoolExperience.department,
        position:schoolExperience.post,
        content:schoolExperience.content,
        beginTime:schoolExperience.beginTime,
        endTime:schoolExperience.endTime,
      });
      console.log('data',data);
      
    } catch (error:any) {
      message.error(error.message);
    }
  }

  // 保存工作经历
  const handleWorkExperience = async(resumeId:any) => {
    try {
      const data =await saveWorkExperience({
        resumeId,
        companyName:workExperience.department,
        position:workExperience.post,
        content:workExperience.content,
        beginTime:workExperience.beginTime,
        endTime:workExperience.endTime,
      });
      console.log('data',data);
      
    } catch (error:any) {
      message.error(error.message);
    }
  }
  
  // 保存项目经历
  const handleProjectExperience = async(resumeId:any) => {
    try {
      const data =await saveProjectExperience({
        resumeId,
        projectName:projectExperience.projectName,
        position:projectExperience.post,
        content:projectExperience.content,
        beginTime:projectExperience.beginTime,
        endTime:projectExperience.endTime,
      });
      console.log('data',data);
      
    } catch (error:any) {
      message.error(error.message);
    }
  }

  // 取消增加标题
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div styleName="actions">
      <div styleName="back" >
        <span onClick={onBack}>返回 </span>
        <span onClick={onSave}>｜ 保存</span>
        <Modal title="请填写简历标题（备注）" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Row justify="space-between" styleName="group-info">
            <Col span={3} styleName="front">
              标题：
            </Col>
            <Col span={21} styleName="end">
              <Input placeholder="请输入您的标题" defaultValue="简历-标题" onChange={changeTitle}/>
            </Col>
          </Row>
        </Modal>
      </div>
      <MyButton
        size="middle"
        className="export-btn"
        onClick={()=>setShowModal(true)}
      >
        导出PDF
      </MyButton>
      {/* 弹窗内容 */}
      {showModal && (
        <MyModal.Confirm
          title="确定要打印简历吗？"
          description="请确保信息的正确，目前仅支持单页打印哦～"
          config={{
            cancelBtn: {
              isShow: true,
              callback: () => setShowModal(false),
            },
            submitBtn: {
              isShow: true,
              callback: () => {
                toPrintPdf(`${base?.username}+${base?.school}+${work?.job}`);
                setShowModal(false);
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default ResumeAction;
