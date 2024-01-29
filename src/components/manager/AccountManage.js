import React, { useEffect, useState } from "react";
import { Button, Table, Tag, Drawer } from "antd";
import { _account_list } from "../api/accountManageApi";
import styles from "../../styles/manage/role.module.scss";
import DrawerForm from "./drawerForm";

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
    render: (_, { tags }) => (
      <>
        <Tag color={"green"} key={tags}>
          {tags}
        </Tag>
      </>
    ),
  },
];

function AccountManage() {
  const [roleList, setRoleList] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      // 获取角色信息
      (async function getAccountList() {
        const list = await _account_list();
        const data = list.data.map((ele) => {
          return { ...ele, tags: ele.role, key: ele.id };
        });
        setRoleList(data);
      })();
    } catch (error) {
      console.error(error);
    }
  }, [roleList]);

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
        <DrawerForm setDrawerClose={setOpen}></DrawerForm>
      </Drawer>
    </>
  );
}

export default AccountManage;
