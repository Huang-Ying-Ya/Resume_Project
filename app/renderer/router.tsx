import React from "react";
import { Navigate, Route, Routes, BrowserRouter, HashRouter } from "react-router-dom";
import ROUTER from "@common/constants/router";

import Root from "@src/container/root";
import ResumeModelCentre from "@src/container/resumeModelCentre";
import ResumeModelEasy from "@src/container/resumeModelEasy";
import ResumeModelElegant from "@src/container/resumeModelElegant";
import Resume from "@src/container/resume";
import Register from "@src/container/register";
import Login from "@src/container/login";
import PersonalCentre from "@src/container/personalCentre";
import ForgetPassword from "@src/container/forgetPassword";
import MyInfo from "@src/container/myInfo";
import MyResume from "@src/container/myResume";
import MyDraft from "@src/container/myDraft";
import MyPassword from "@src/container/myPassword"


function Router() {
  return (
      <HashRouter>
        <Routes>
          <Route element={<Root/>} path={ROUTER.root}></Route>
          {/* 简历模版库 */}
          <Route element={<ResumeModelCentre />} path={ROUTER.resumeModelCentre}>
            <Route path={ROUTER.resumeModelCentre} element={<Navigate to={ROUTER.resumeModelEasy}/>}></Route>
            {/* 简洁模板 */}
            <Route element={<ResumeModelEasy />} path={ROUTER.resumeModelEasy}></Route>
            {/* 优雅模板 */}
            <Route element={<ResumeModelElegant />} path={ROUTER.resumeModelElegant}></Route>
          </Route>
          {/* 添加简历模块入口路由 */}
          <Route element={<Resume />} path={ROUTER.resume}></Route>
          {/* 注册路由 */}
          <Route element={<Register />}  path={ROUTER.register}></Route>
          {/* 登录路由 ——默认路由*/}
          <Route element={<Login />} path={ROUTER.login}></Route>
          {/* 找回密码路由 */}
          <Route element={<ForgetPassword />} path={ROUTER.forgetPassword}></Route>
          {/* 个人中心路由 */}
          <Route element={<PersonalCentre />} path={ROUTER.personalCentre}>
            {/* 默认个人中心进入时显示个人信息 */}
            <Route path={ROUTER.personalCentre} element={<Navigate to={ROUTER.myInfo}/>}></Route>
            {/* 个人中心--个人信息路由 */}
            <Route element={<MyInfo />} path={ROUTER.myInfo}></Route>
            {/* 个人中心--个人简历路由 */}
            <Route element={<MyResume />} path={ROUTER.myResume}></Route>
            {/* 个人中心--个人草稿路由 */}
            <Route element={<MyDraft />} path={ROUTER.myDraft}></Route>
            {/* 个人中心--个人手机路由 */}
            <Route element={<MyPassword />} path={ROUTER.myPassword}></Route>
          </Route>

          {/* 默认路由 */}
          <Route path="*" element={<Navigate to={ROUTER.login}/>}></Route>
        </Routes>
      </HashRouter>
  );
}
export default Router;
