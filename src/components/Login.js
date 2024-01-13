import React from "react";
import styles from "../styles/Login.module.scss";
import { Button, Checkbox, Form, Input } from "antd";
import { UilReact } from "@iconscout/react-unicons";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Login() {
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
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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
                      <Button type="primary">Login</Button>
                      <Button style={{ marginLeft: "2rem" }}>Cancel</Button>
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
