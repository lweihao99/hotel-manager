import React, { useEffect, useState } from "react";
import { Button, Table, Tag, Drawer, Modal } from "antd";
import { _account_list, _delete_role } from "../api/accountManageApi";
import styles from "../../styles/manage/role.module.scss";
import DrawerForm from "./drawerForm";

function AccountManage() {
  const [roleList, setRoleList] = useState([]);
  const [open, setOpen] = useState(false);

  // 表单列表
  const columns = [
    {
      title: "ID",
      dataIndex: "roleId",
      key: "roleId",
    },
    {
      title: "Account Name",
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (_, { role, roleId }) => (
        <>
          <Tag color={"green"} key={roleId}>
            {role}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          onClick={async () => {
            try {
              // 显示删除对话框
              Modal.confirm({
                title: "Delete Account",
                content: "Are you sure you want to delete this account?",
                okText: "Confirm",
                cancelText: "Cancel",
                async onOk() {
                  await _delete_role(record._id);
                  setRoleList(roleList.filter((cur) => cur._id !== record._id));
                },
              });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  useEffect(() => {
    try {
      // 获取角色信息
      (async function getAccountList() {
        const list = await _account_list();
        const data = list.data.map((ele) => {
          return { ...ele, role: ele.role, key: ele.roleId };
        });
        setRoleList(data);
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

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
        <Button onClick={showDrawer}>Add</Button>
      </div>
      <Table
        dataSource={roleList}
        columns={columns}
        // style={{ height: "100%" }}
      />
      <Drawer title="Add new account" onClose={onClose} open={open}>
        <DrawerForm
          setDrawerClose={setOpen}
          setRoleList={setRoleList}
        ></DrawerForm>
      </Drawer>
    </>
  );
}

export default AccountManage;
