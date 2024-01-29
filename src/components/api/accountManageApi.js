import axios from "../utils/request";

// get account list
export const _account_list = async () => {
  const { data } = await axios({
    method: "GET",
    url: "/api/role",
  });

  return data;
};

// add new account role\
export const _add_account_role = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/role",
      data: { ...data },
    });

    if (!res.status === 200) {
      throw Error("Add failed");
    }

    return res;
  } catch (error) {
    throw Error(error);
  }
};
