import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.scss";
import { Button, Form, Input, notification, message, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { UilReact } from "@iconscout/react-unicons";
import { _login } from "./api/adminApi";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function Login() {
  const [form] = Form.useForm(); // 对表单数据与进行交互，若是class component可以用ref
  const [register, setRegister] = useState(false);
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

      if (!res) throw Error("Login Failed.");

      if (res.status === "success") {
        // message.success("登录成功");
        message.success("Login success");
        navigate("/manage");
      }
    } catch (error) {
      message.error("Login Failed.");
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

  // register controll

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
                  {/* register login form */}
                  {!register ? (
                    <LoginForm
                      values={onFinish}
                      setRegister={setRegister}
                    ></LoginForm>
                  ) : (
                    <RegisterForm setRegister={setRegister}></RegisterForm>
                  )}
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
