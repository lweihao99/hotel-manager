import React from "react";
import {
  Button,
  Form,
  notification,
  Select,
  Space,
  message,
  Input,
} from "antd";
import { _add_account_role, _edit_role } from "../api/accountManageApi";

// drawer form layout
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function DrawerForm({ setDrawerClose, setRoleList, roleId }) {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    try {
      // 如果是点击add那么就没有roleId,   // add new role
      if (!roleId) {
        const res = await _add_account_role(values);
        const { data } = res.data;

        // console.log(data);

        if (res.status === 200) {
          openNotificationWithIcon("success", data.accountName, data.role);

          // 手动更新数据
          setRoleList((prev) => [...prev, { key: data.roleId, ...data }]);
        }
        setDrawerClose(false);
        form.resetFields();
      } else {
        // 修改的情况下会有roleId传入 // edit role
        console.log(values);
        const oldData = { ...values };
        const id = roleId;
        await _edit_role(id, oldData);
        // todo 添加notification，修改的时候在输入框显示旧数据，修改完成后清空并关闭侧窗口
      }
    } catch (error) {
      message.error(error.message);
      console.error(error);
    }
  };

  // notification on create
  const openNotificationWithIcon = (type, name, role) => {
    api[type]({
      message: "You have add new account successfully.",
      description: `Account "${name}" (${role}) has been created.`,
      duration: 3,
    });
  };

  return (
    <div>
      {contextHolder}
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="accountName"
          label="Account Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role Name"
          rules={[
            {
              required: true,
              message: "Please select the role name!",
            },
          ]}
        >
          <Select placeholder="Select a role type." allowClear>
            <Option value="vip">Vip</Option>
            <Option value="normal">Normal</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              {roleId ? "EDIT ROLE" : "ADD ROLE"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default DrawerForm;
