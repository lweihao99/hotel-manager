import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  HomeOutlined,
  EditOutlined,
  LogoutOutlined,
  AuditOutlined,
  TeamOutlined,
  KeyOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, message, Modal, Alert } from "antd";
import styles from "../../styles/manage/Layout.module.scss";
import { UilEstate } from "@iconscout/react-unicons";

const { Header, Sider, Content } = Layout;

const ITEMS = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Account",
    children: [
      {
        key: "accountManage",
        label: "Account Manage",
      },
      {
        key: "staffManage",
        label: "Staff Manage",
      },
    ],
  },
  {
    key: "2",
    icon: <KeyOutlined />,
    label: "Room",
    children: [
      {
        key: "room",
        label: "Room Manage",
      },
      {
        key: "type",
        label: "Room Type Manage",
      },
    ],
  },
  {
    key: "3",
    icon: <TeamOutlined />,
    label: "Clients",
  },
  {
    key: "4",
    icon: <AreaChartOutlined />,
    label: "Statistics",
  },
];

const MENU_ITEMS = [
  {
    label: "Home",
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: "Message",
    key: "message",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Mail",
    key: "mail",
    icon: <MailOutlined />,
  },
  {
    label: "User Center",
    key: "user",
    icon: <SettingOutlined />,
    children: [
      {
        key: "profile",
        label: "Profile",
        icon: <UserOutlined />,
      },
      {
        key: "changePwd",
        label: "Change Password",
        icon: <EditOutlined />,
      },
      {
        key: "logOut",
        label: "Log Out",
        icon: <LogoutOutlined />,
      },
    ],
  },
];

function Manage() {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // 如果没有token就返回登录页面
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // header menu list click event
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);

    if (e.key === "logOut") {
      sessionStorage.clear();
      localStorage.clear();
      showModal();
    }
  };

  const handleSideClick = (e) => {
    const key = e.key;
    console.log(key);

    if (key === "accountManage") navigate("/manage/account");
    if (key === "staffManage") navigate("/manage/staff");
  };

  // handle logout
  const handleLogout = () => {
    navigate("/");
    message.error("Logged out successfully");
  };

  // 确认是否退出的对话框
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleLogout();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout styles={styles.layout}>
      {/* side menu bar */}
      <Sider
        className={styles.sider}
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: "#f8f8f8",
          height: "100vh",
        }}
        breakpoint="lg"
        // collapsedWidth={0}
      >
        <div className={styles.logo_container}>
          <div className={styles.logo}>
            <h2>{collapsed ? <UilEstate></UilEstate> : "Hotel MS"}</h2>
          </div>
        </div>
        <Menu
          className={styles.menu}
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={(e) => handleSideClick(e)}
          items={ITEMS}
        />
      </Sider>

      <Layout>
        <Header
          className={styles.header}
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={MENU_ITEMS}
            inlineCollapsed={true}
          />
          <Modal
            title="Log Out"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Alert
              message="Are you sure to exit the Hotel MS system?"
              type="warning"
            />
          </Modal>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Manage;
