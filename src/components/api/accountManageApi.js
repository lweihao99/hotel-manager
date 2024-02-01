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

// delete role
export const _delete_role = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `/api/role/${id}`,
    });
    // console.log("clicked", res);
  } catch (error) {
    console.error(error);
  }
};

// patch account
export const _edit_role = async (id, oldData) => {
  try {
    const update = await axios({
      method: "PATCH",
      url: `/api/role/${id}`,
      data: oldData,
    });

    return update;
  } catch (error) {
    console.error(error);
  }
};
