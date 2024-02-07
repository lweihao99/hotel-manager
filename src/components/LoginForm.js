import React from "react";
import { Button, Form, Input, notification, message, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { UilReact } from "@iconscout/react-unicons";

function LoginForm({ values, setRegister }) {
  const [form] = Form.useForm();

  const onFinish = (val) => {
    values(val);
  };

  const handleRegister = () => {
    setRegister(true);
  };
  return (
    <Form
      name="basic"
      form={form}
      className="login-form"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        // remember: true,
        username: "",
        password: "",
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        // label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        // label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
        />
      </Form.Item>
      {/*   REMEMBER BOX */}
      {/* <Form.Item className="remember-box">
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="#">
          Forgot password
        </a>
      </Form.Item> */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
        <Button
          style={{ marginLeft: "2rem" }}
          onClick={() => {
            form.resetFields();
          }}
        >
          Cancel
        </Button>
      </Form.Item>
      Or{" "}
      <span
        style={{ color: "blue", cursor: "pointer" }}
        onClick={() => handleRegister()}
      >
        register now!
      </span>
    </Form>
  );
}

export default LoginForm;
