import React, { useEffect, useState, createElement } from 'react';
import * as UseTemplateList from './UseTemplate';
import MyScrollBox from '@common/components/MyScrollBox';
import Messager, { MESSAGE_EVENT_NAME_MAPS } from '@common/messager';
import { RESUME_TOOLBAR_MAPS } from '@common/constants/resume';
import CertificateForm from './UseForm/Certificate';
import ContactForm from './UseForm/Contact';
import EducationForm from './UseForm/Education';
import EvaluationForm from './UseForm/Evaluation';
import PersonalForm from './UseForm/Personal';
import SkillForm from './UseForm/Skill';
import WorkForm from './UseForm/Work';
import ProjectExperience from './UseForm/ProjectExperience';
import SchoolExperience from './UseForm/SchoolExperience';
import WorkExperience from './UseForm/WorkExperience';

interface modelKeyObject {
  [key: number] : any;
}

function ResumeContent(props: any) {
  const { resumeModelId } = props;
  const HEADER_ACTION_HEIGHT = 92;
  const height = document.body.clientHeight;
  // 定义state值
  const [formName, setFormName] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [modelKey,setModelKey] = useState<modelKeyObject>({
    1: UseTemplateList.TemplateOne, 
    2: UseTemplateList.TemplateTwo,
  });

  // 监听此事件
  useEffect(() => {
    document.addEventListener(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, onReceive);
    // console.log('id',resumeModelId);
    // console.log('123',modelKey[resumeModelId]);
    
    
    return () => {
      document.removeEventListener(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, onReceive);
    };
  }, []);
  /**
   * @description 接收订阅事件的传参(控制modal的展示与关闭)
   */
  const onReceive = (e: any) => {
    Messager.receive(e, (data: any) => {
      // setShowFormModal 和 setFormName 都是 React 中 useState Hook 的函数，用于更新状态变量的值
      // 这两个函数会重新渲染组件，以显示新的状态或属性
      setShowFormModal(true);
      // 这里的form_name:education 或 personal等
      setFormName(data?.form_name);
    });
  };

  const onClose = () => {
    setShowFormModal(false);
    setFormName('');
  };
  return (
    <MyScrollBox maxHeight={height - HEADER_ACTION_HEIGHT}>
      {createElement(modelKey[resumeModelId])}
      {/* <UseTemplateList.TemplateOne /> */}
      {showFormModal && (
        <>
          {formName === RESUME_TOOLBAR_MAPS.certificate && <CertificateForm onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.contact && <ContactForm onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.education && <EducationForm onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.evaluation && <EvaluationForm onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.personal && <PersonalForm onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.skill && <SkillForm onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.workPrefer && <WorkForm onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.projectExperience && <ProjectExperience onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.schoolExperience && <SchoolExperience onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.workExperience && <WorkExperience onClose={onClose} />}
        </>
      )}
    </MyScrollBox>
  );
}
export default ResumeContent;
