import React, { useEffect, useState } from "react";
// import { shell } from "electron";
const { shell } = require("electron");
import { useSelector, useDispatch } from "react-redux";
import ROUTER, { ROUTER_ENTRY, ROUTER_KEY } from "@common/constants/router";
import { isHttpOrHttpsUrl } from "@common/utils/router";
import "./index.less";

function MyInfo() {

  return (
    <div>我是个人信息</div> 
  );
}
export default MyInfo;
