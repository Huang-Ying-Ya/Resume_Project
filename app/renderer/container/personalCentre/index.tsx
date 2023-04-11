import { useNavigate, NavLink,Outlet, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { shell } from "electron";
const { shell } = require("electron");
import { useSelector, useDispatch } from "react-redux";
import ROUTER, { ROUTER_ENTRY, ROUTER_KEY } from "@common/constants/router";
import { isHttpOrHttpsUrl } from "@common/utils/router";
import "./index.less";
import MyInfo from "@src/container/myInfo";
import MyResume from "@src/container/myResume";
import MyDraft from "@src/container/myDraft";
import MyPhone from "@src/container/myPhone";

import { FolderOpenOutlined, MailOutlined, SettingOutlined, FolderOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, Button, Row, Col} from 'antd';
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

function PersonalCentre() {
  const [destination, setDestination] =useState<string>(ROUTER.myInfo);
  const navigate = useNavigate();
  // 返回首页
  const goRoot = () => {
    navigate(ROUTER.root);
  }

  // 定义menuItem
  // Required<MenuProps(antd自带的)>类型，这表示将MenuProps组件的所有属性变为必需属性
  // 使用['items']来获取MenuProps类型中的items属性，然后使用[number]来表示items属性应该是一个数组，并且数组中的每个元素都应该是一个MenuItem类型
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
    // getItem('个人信息', 'sub1', <MailOutlined />, [
    //   // getItem('Option 1', '1'),
    //   // getItem('Option 2', '2'),
    // ]),
    // getItem(<Link to={ROUTER.myInfo}>个人信息</Link>, ROUTER.myInfo,<MailOutlined />),
    // getItem(<Link to={ROUTER.myResume}>我的简历</Link>, ROUTER.myResume, <FolderOpenOutlined />),
    // getItem(<Link to={ROUTER.myDraft}>我的草稿</Link>,ROUTER.myDraft, <FolderOutlined />),
    // getItem(<Link to={ROUTER.myPhone}>绑定手机</Link>, ROUTER.myPhone, <SettingOutlined />),
    getItem('个人信息', ROUTER.myInfo,<MailOutlined />),
    getItem('我的简历', ROUTER.myResume, <FolderOpenOutlined />),
    getItem('我的草稿',ROUTER.myDraft, <FolderOutlined />),
    getItem('绑定手机', ROUTER.myPhone, <SettingOutlined />),
  ];
  
  // 第一层的menu的key的集合
  const rootSubmenuKeys = [ROUTER.myInfo, ROUTER.myResume, ROUTER.myDraft, ROUTER.myPhone];
  
  // 打开的是哪个item
  const [openKeys, setOpenKeys] = useState([ROUTER.myInfo]);
  
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
    console.log('key',e.key);
    setDestination(e.key);
    navigate(e.key,{replace:true})
    // this.props.to(e.key);
  }

  return (
    <Layout styleName="personal-center">
      <Header styleName="header">
        <Row justify="space-between">
          <Col span={10} styleName="title">
            <span styleName="big">My Resume</span>
            <span styleName="small">个人中心</span>
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
          // breakpoint="lg" // 触发响应式布局的断点
          collapsedWidth="0" // 收缩宽度
          // onBreakpoint={broken => { // 触发响应式布局断点时的回调
          //   console.log(broken);
          // }}
          // onCollapse={(collapsed, type) => {
          //   console.log(collapsed, type); // 展开-收起时的回调函数
          // }}
        >
          <div styleName="gap"></div>
          <Menu
            styleName="menu"
            theme="light"
            mode="inline"
            defaultSelectedKeys={[ROUTER.myInfo]}
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
            <Outlet/>
          </div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Copyright By Huang Ying</Footer>
    </Layout>  
  );
}
export default PersonalCentre;
