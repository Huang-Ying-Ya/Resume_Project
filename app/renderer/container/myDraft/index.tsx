import React, { useEffect, useState } from "react";
// import { shell } from "electron";
const { shell } = require("electron");
import { useSelector, useDispatch } from "react-redux";
import ROUTER, { ROUTER_ENTRY, ROUTER_KEY } from "@common/constants/router";
import { isHttpOrHttpsUrl } from "@common/utils/router";
import "./index.less";

function MyDraft() {

  return (
    <div>我是草稿</div> 
  );
}
export default MyDraft;
