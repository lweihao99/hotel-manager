import axios from "../utils/request";

export const _login = async (params) => {
  try {
    // const { data } = await axios.get("api/recipe/user", {
    //   params,
    // });  // 传递params参数作为query,get方法登录信息不安全

    const { data } = await axios.post("api/recipe/login", {
      ...params,
    });

    if (!data) return;

    // 处理返回的数据, 如果成功就在浏览器缓存token
    if (data.status === "success") {
      sessionStorage.setItem("token", JSON.stringify(data.token));
    }
    return data;
  } catch (error) {
    console.error("Error", error.message);
  }
};
