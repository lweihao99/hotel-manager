import React, { useEffect, useState } from "react";
import { Button, Table, Tag, Drawer, Modal, Space, Image } from "antd";
import { _account_list, _delete_role } from "../api/accountManageApi";
import styles from "../../styles/manage/role.module.scss";
import DrawerForm from "./drawerForm";

function StaffManage() {
  const [roleList, setRoleList] = useState([]);
  const [open, setOpen] = useState(false);
  const [roleId, setRoleId] = useState("");
  const [values, setValues] = useState({});

  // 表单列表
  const columns = [
    {
      title: "ID",
      dataIndex: "roleId",
      key: "roleId",
      width: 100,
      fixed: "left",
    },
    {
      title: "Avatar",
      dataIndex: "photo",
      key: "photo",
      width: 100,
      fixed: "left",
      render: () => {
        return <Image width={"100%"}></Image>;
      },
    },
    {
      title: "Staff Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      fixed: "left",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      width: 100,
      render: (_, { role, roleId }) => {
        let color; // 定义用户级别tag颜色
        switch (role) {
          case "manager":
            color = "gold";
            break;

          default:
            color = "green";
            break;
        }
        return (
          <>
            <Tag color={color} key={roleId}>
              {role}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { roleId, status }) => {
        let color; // 定义用户级别tag颜色
        switch (status) {
          case "active":
            color = "green";
            break;
          case "inactive":
            color = "red";
            break;
          case "vacation":
            color = "cyan";
            break;
          default:
            break;
        }
        return (
          <>
            {status ? (
              <Tag color={color} key={roleId}>
                {status.toUpperCase()}
              </Tag>
            ) : (
              <Tag color={"volcano"}>null</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
    },
    {
      title: "Birth",
      key: "birthDate",
      dataIndex: "birthDate",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <Space>
            <Button type="default" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button
              type="default"
              danger
              onClick={async () => {
                try {
                  // 显示删除对话框
                  Modal.confirm({
                    title: "Delete Account",
                    content: "Are you sure you want to delete this account?",
                    okText: "Confirm",
                    cancelText: "Cancel",
                    style: { top: "40%" },
                    async onOk() {
                      // 执行删除操作
                      await _delete_role(record._id);
                      // 手动更新数据状态
                      setRoleList(
                        roleList.filter((cur) => cur._id !== record._id)
                      );
                    },
                  });
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Delete
            </Button>
          </Space>
        </>
      ),
    },
  ];

  useEffect(() => {
    try {
      // 初始获取角色信息
      (async function getAccountList() {
        const list = await _account_list();

        const data = list.data.map((ele) => {
          const formattedDate = new Date(ele.createdAt).toLocaleDateString();
          return {
            ...ele,
            role: ele.role,
            key: ele.roleId,
            createdAt: formattedDate,
          };
        });
        // console.log(data);
        setRoleList(data);
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

  // edit
  const handleEdit = ({ _id, accountName, role }) => {
    setRoleId(_id);
    setValues({ accountName, role });
    showDrawer();
  };

  // drawer controll
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={styles.search}>
        <Button
          onClick={() => {
            showDrawer();
            setRoleId("");
          }}
        >
          Add
        </Button>
      </div>
      <Table
        dataSource={roleList}
        columns={columns}
        // style={{ height: "100%" }}
        scroll={{ x: 1400 }}
      />
      <Drawer
        title={roleId ? "Edit role" : "Add new account"}
        onClose={onClose}
        open={open}
      >
        <DrawerForm
          setDrawerClose={setOpen}
          setRoleList={setRoleList}
          roleId={roleId && roleId}
          oldRole={values && values}
        ></DrawerForm>
      </Drawer>
    </>
  );
}

export default StaffManage;
