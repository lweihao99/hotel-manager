import axios from "../utils/request";

// 获取员工职位信息
export const _login = async (params) => {
  try {
    // const { data } = await axios.get(`login`, { params }); // 传递params参数作为query,get方法登录信息不安全

    const { data } = await axios.post("api/login", {
      ...params,
    });

    if (!data) throw Error("fetching data failed.");

    // 处理返回的数据, 如果成功就在浏览器缓存tokens
    if (data.status === true) {
      sessionStorage.setItem("token", JSON.stringify(data.token));
    }

    return data;
  } catch (error) {
    console.error("Error", error.message);
  }
};
