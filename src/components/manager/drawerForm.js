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
import { _add_account_role } from "../api/accountManageApi";

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

function DrawerForm({ setDrawerClose }) {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  // add new role
  const onFinish = async (values) => {
    try {
      const res = await _add_account_role(values);
      const { data } = res.data;
      if (res.status === 200) {
        openNotificationWithIcon("success", data.accountName, data.role);
      }
      setDrawerClose(false);
      form.resetFields();
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
              ADD ROLE
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default DrawerForm;
