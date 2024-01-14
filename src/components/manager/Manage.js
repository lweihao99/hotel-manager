import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        key: "1-1",
        label: "Account Manage",
      },
      {
        key: "1-2",
        label: "Users Manage",
      },
    ],
  },
  {
    key: "2",
    icon: <KeyOutlined />,
    label: "Room",
    children: [
      {
        key: "2-1",
        label: "Room Manage",
      },
      {
        key: "2-2",
        label: "Room Type Manage",
      },
      {
        key: "2-3",
        label: "Revenue",
      },
    ],
  },
  {
    key: "3",
    icon: <TeamOutlined />,
    label: "Clients",
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
          Content
        </Content>
      </Layout>
    </Layout>
  );
}

export default Manage;
