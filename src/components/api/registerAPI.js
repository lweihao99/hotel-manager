import axios from "../utils/request";

// new user register, 登录新的客户信息
export const _createUser = async (params) => {
  try {
    const res = await axios.post("/api/register", params);
    console.log(res);

    if (!res) throw new Error("Register not complete.");
    return res.data;
  } catch (error) {
    console.error("Error", error.message);
  }
};
