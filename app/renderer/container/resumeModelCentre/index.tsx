import { useNavigate, NavLink,Outlet, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
const { shell } = require("electron");
import { useSelector, useDispatch } from "react-redux";
import ROUTER, { ROUTER_ENTRY, ROUTER_KEY } from "@common/constants/router";
import "./index.less";

import { FolderOpenOutlined, MailOutlined, SettingOutlined, FolderOutlined, LockOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, Button, Row, Col, Affix} from 'antd';
import { Link } from "react-router-dom";
import { getInfo } from "@src/api";

const { Header, Content, Footer, Sider } = Layout;

function ResumeModelCentre() {
  const [bottom, setBottom] = useState(0);
  const navigate = useNavigate();

  // 返回首页
  const goRoot = () => {
    navigate(ROUTER.root);
  }

  type MenuItem = Required<MenuProps>['items'][number];

  // 生成导航对应item
  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  const items: MenuItem[] = [
    getItem('简洁', ROUTER.resumeModelEasy),
    getItem('优雅', ROUTER.resumeModelElegant),
  ];
  
  // 第一层的menu的key的集合
  const rootSubmenuKeys = [ROUTER.resumeModelEasy, ROUTER.resumeModelElegant];
  
  // 打开的是哪个item
  const [openKeys, setOpenKeys] = useState([ROUTER.resumeModelEasy]);
  
  // 更换打开的item
  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const changeRouter = (e:any) => {
    navigate(e.key,{replace:true})
  }

  return (
    <Layout styleName="model-center">
      <Header styleName="header">
        <Row justify="space-between">
          <Col span={10} styleName="title">
            <span styleName="big">My Resume</span>
            <span styleName="small">简历模板中心</span>
          </Col>
          <Col span={6} styleName="return">
            <Button type="link" onClick={goRoot}>
              返回首页
            </Button>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider
          styleName="sider"
          collapsedWidth="0"
        >
          <div styleName="gap"></div>
          <Menu
            styleName="menu"
            theme="light"
            mode="inline"
            defaultSelectedKeys={[ROUTER.resumeModelEasy]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            items={items}
            onClick={changeRouter}
          >
          </Menu>
        </Sider>
        {/* <Header styleName="site-layout-sub-header-background" style={{ padding: 0 }} /> */}
        <Content style={{ margin: '25px 16px 0' }}>
          <div styleName="site-layout-background" style={{ padding: 25, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
      <Affix offsetBottom={bottom}>
        <Footer style={{ textAlign: 'center' }}>Copyright By Huang Ying</Footer>
      </Affix>
    </Layout> 
  );
}
export default ResumeModelCentre;

