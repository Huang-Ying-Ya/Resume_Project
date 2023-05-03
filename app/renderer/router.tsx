import React from "react";
import { Navigate, Route, Routes, BrowserRouter, HashRouter } from "react-router-dom";
import ROUTER from "@common/constants/router";

import Root from "@src/container/root";
import Resume from "@src/container/resume";
import Register from "@src/container/register";
import Login from "@src/container/login";
import PersonalCentre from "@src/container/personalCentre";
import ForgetPassword from "@src/container/forgetPassword";
import MyInfo from "@src/container/myInfo";
import MyResume from "@src/container/myResume";
import MyDraft from "@src/container/myDraft";
import MyPhone from "@src/container/myPhone";
import MyPassword from "@src/container/myPassword"


function Router() {
  return (
      <HashRouter>
        <Routes>
          <Route element={<Root/>} path={ROUTER.root}></Route>
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
            <Route element={<MyPhone />} path={ROUTER.myPhone}></Route>
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
