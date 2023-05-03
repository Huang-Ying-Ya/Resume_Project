import request from '../api/axios'
 
// 登录
export const goLogin = (data:any) => {
    return request({
        url:'api/auth/login',
        method:'post',
        data,
    })
}

// 取消登录
export const cancelLogin = () => {
    return request({
        url:'api/auth/logout',
        method:'post',
    })
}

// 获取验证码
export const askCode = (data:any) => {
    return request({
        url:'api/auth/askCode',
        method:'post',
        data,
    })
}

// 注册
export const goRegister = (data:any) => {
    return request({
        url:'api/auth/register',
        method:'post',
        data,
    })
}

// 查看个人信息
export const getInfo = () => {
    return request({
        url:'api/auth/info',
        method:'post',
    })
}

// 修改username
export const changeUsername = (data:any) => {
    return request({
        url:'api/auth/changeUsername',
        method:'post',
        data,
    })
}

// 修改密码
export const changePassword = (data:any) => {
    return request({
        url:'api/auth/changePassword',
        method:'post',
        data,
    })
}

// 查看个人所有简历
export const getResumes = () => {
    return request({
        url:'api/auth/userResume',
        method:'get',
    })
}

// 保存简历标题
export const saveTitle = (data:any) => {
    return request({
        url:'api/auth/saveResume',
        method:'post',
        data,
    })
}

// 更改简历标题
export const changeTitle = (data:any) => {
    return request({
        url:'api/auth/changeTitle',
        method:'post',
        data,
    })
}


// 删除指定简历
export const deleteResume = (data: any) => {
    return request({
        url: 'api/auth/deleteResume',
        method: 'post',
        data,
    })
}

// 保存联系方式
export const saveContact = (data: any) => {
    return request({
        url:'api/auth/saveContact',
        method:'post',
        data,
    })
}

// 保存基本信息
export const saveBasicInfo = (data:any) => {
    return request({
        url:'api/auth/saveBasicInfo',
        method:'post',
        data,
    })
}

// 保存教育信息
export const saveEducationExperience = (data:any) => {
    return request({
        url:'api/auth/saveEducationExperience',
        method:'post',
        data,
    })
}

// 保存学生工作经历
export const saveSchoolExperience = (data:any) => {
    return request({
        url:'api/auth/saveSchoolExperience',
        method:'post',
        data,
    })
}

// 保存工作经历
export const saveWorkExperience = (data:any) => {
    return request({
        url:'api/auth/saveWorkExperience',
        method:'post',
        data,
    })
}

// 保存项目经历
export const saveProjectExperience = (data:any) => {
    return request({
        url:'api/auth/saveProjectExperience',
        method:'post',
        data,
    })
}

// 保存技能
export const saveSkill = (data:any) => {
    return request({
        url:'api/auth/saveSkill',
        method:'post',
        data,
    })
}

// 保存荣誉证书
export const saveCertificate = (data:any) => {
    return request({
        url:'api/auth/saveCertificate',
        method:'post',
        data,
    })
}

// 保存个人评价
export const saveEvaluation = (data:any) => {
    return request({
        url:'api/auth/saveEvaluation',
        method:'post',
        data,
    })
}

// 保存工作期望
export const saveWorkHope = (data:any) => {
    return request({
        url:'api/auth/saveWorkHope',
        method:'post',
        data,
    })
}

// 查看简历信息
export const checkResumeInfo = (data:any) => {
    return request({
        url:'api/auth/checkResumeInfo',
        method:'post',
        data,
    })
}