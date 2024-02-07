import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  notification,
  message,
  Checkbox,
  DatePicker,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { UilEnvelopeEdit, UilUser } from "@iconscout/react-unicons";

import { _createUser } from "./api/registerAPI";

function RegisterForm({ setRegister }) {
  const [form] = Form.useForm();

  const [firstStep, setFirstStep] = useState(true);
  const [date, setDate] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [userAccount, setUserAccount] = useState({});
  const [passwordValidate, setPasswordValidate] = useState(null);

  // 生日日期
  const onDateChange = (date, dateString) => {
    // console.log(dateString);
    setDate(dateString);
  };

  const onFinish = async (values) => {
    try {
      // 进行用户注册，创建一个新的客户account
      let person = {};
      if (firstStep) {
        setFirstStep(false);
        const userInfo = {
          name: values.name,
          email: values.email,
          birthDate: date,
        };
        setUserInfo(userInfo);
        return;
      } else {
        const { username, password, confirmPassword } = values;
        if (password !== confirmPassword) {
          message.error("Password not correct");
          setPasswordValidate(false);
        } else {
          setPasswordValidate(true);
          const account = {
            username,
            password,
            confirmPassword,
          };
          setUserAccount(account);
          person = { ...userInfo, ...account };
          console.log(person);
        }
      }
      // const person = { ...userInfo, ...userAccount };
      console.log(person);
      const data = await _createUser(person);
      if (data.status) {
        message.success("Register success");
        setRegister(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      name="register"
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
        username: "",
        password: "",
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      {/* 第一步注册，获取简单的个人信息 */}
      {firstStep ? (
        <div id="first_step">
          <Form.Item
            // label="Username"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name.",
              },
            ]}
          >
            <Input
              prefix={<UilUser className="site-form-item-icon" />}
              placeholder="Enter your name"
            />
          </Form.Item>
          <Form.Item
            // label="Password"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email.",
              },
            ]}
          >
            <Input
              prefix={<UilEnvelopeEdit className="site-form-item-icon" />}
              placeholder="example@hotmail.com"
            />
          </Form.Item>
          <DatePicker
            style={{ marginBottom: "2rem" }}
            onChange={onDateChange}
            placeholder="Select Birth"
            wrapperCol={{ span: 18 }}
            allowClear
          />

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
            <Button
              style={{ marginLeft: "2rem" }}
              onClick={() => {
                if (firstStep) {
                  // 直接清除并返回到登录页面
                  form.resetFields();
                  setRegister(false);
                }
              }}
            >
              Cancel
            </Button>
          </Form.Item>
        </div>
      ) : (
        // 第二步注册，进行账号以及密码的创建
        <div id="second_step">
          <Form.Item
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
            validateStatus={
              passwordValidate === null
                ? "default"
                : passwordValidate
                ? "success"
                : "error"
            }
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            // label="Username"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
            ]}
            validateStatus={
              passwordValidate === null
                ? "default"
                : passwordValidate
                ? "success"
                : "error"
            }
            hasFeedback
            help={
              passwordValidate === null
                ? ""
                : passwordValidate
                ? ""
                : "Not the same password"
            }
          >
            <Input
              type="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm Passoword"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <Button
              style={{ marginLeft: "2rem" }}
              onClick={() => {
                if (!firstStep) {
                  // 如果是在第二部就返回到第一步
                  setFirstStep(true);
                }
              }}
            >
              Back
            </Button>
          </Form.Item>
        </div>
      )}
      {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          {firstStep ? "Next" : "Register"}
        </Button>
        <Button
          style={{ marginLeft: "2rem" }}
          onClick={() => {
            if (firstStep) {
              // 直接清除并返回到登录页面
              form.resetFields();
              setRegister(false);
            } else {
              // 如果是在第二部就返回到第一步
              setFirstStep(true);
            }
          }}
        >
          {firstStep ? "Cancel" : "Back"}
        </Button>
      </Form.Item> */}
    </Form>
  );
}

export default RegisterForm;
