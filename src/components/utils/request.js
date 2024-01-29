import axios from "axios";
import { BASE_URL } from "../config/config";
import { message } from "antd";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (sessionStorage.getItem("token")) {
      // 根据本地缓存中的token进行匹配确认 并添加到请求标头里
      const token = sessionStorage.getItem("token");
      const newToken = token.replace(/[\\"]/g, ""); // 替换 \ "
      config.headers.Authorization = `Bearer ${newToken}`;
      // console.log(config);
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response.status === 401 && error.response) {
      message.error("Authentication failed. Please check your credentials.");
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
