import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.scss";
import { Button, Form, Input, notification, message } from "antd";
import { UilReact } from "@iconscout/react-unicons";
import { _login } from "./api/adminApi";

function Login() {
  const [form] = Form.useForm(); // 对表单数据与进行交互，若是class component可以用ref
  const navigate = useNavigate();

  // 判断是否已经登录
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/manage");
    }
  }, []);

  // 使用Api登录
  const onFinish = async (values) => {
    try {
      const res = await _login(values); // 进行登录请求

      if (!res) throw Error("登录失败");

      if (res.status === "success") {
        // message.success("登录成功");
        message.success("Login success");
        navigate("/manage");
      }
    } catch (error) {
      message.error("登录失败");
      console.error(error);
    }
  };

  // Static Login
  // const onFinish = async (values) => {
  //   const { username, password } = values;
  //   if (username === "admin" && password === "admin") {
  //     sessionStorage.setItem("token", username);
  //     message.success("Login success");
  //     navigate("/manage");
  //   } else {
  //     message.error("Login failed");
  //   }
  // };

  return (
    <div className={styles.login_root}>
      <div className={styles.login}>
        <div>
          <div className={styles.head}>
            <div className={styles.head_center}>
              <div className={styles.logo}>
                <UilReact></UilReact>
              </div>
            </div>
          </div>

          <div className={styles.login_container}>
            <div className={styles.login_title}>
              <span className={styles.login_text_container}>
                <span>Hotel MS</span>
              </span>
            </div>

            <div>
              <span className={styles.left}>
                <div className="icon_container">
                  <div className={styles.icon}>
                    {/* <UilReact></UilReact> */}
                    <img
                      src="https://img.pikbest.com/origin/09/28/40/99ApIkbEsTspM.png!sw800"
                      alt=""
                    />
                  </div>
                </div>
              </span>
              <span className={styles.split_line}></span>

              <span className={styles.right}>
                <div className={styles.form_container}>
                  <Form
                    name="basic"
                    form={form}
                    labelCol={{
                      span: 6,
                    }}
                    wrapperCol={{
                      span: 15,
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
                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
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
                  </Form>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
