import { axiosInstance } from "./index";


export const getLoggedUser = async () => {
    try {
  const loggedUser = await axiosInstance.get("api/user/get-logged-user");
    return loggedUser.data;
    }

    catch(err) {
     return err.response;
    }
}

export const getAllUsers = async () => {
    try {
  const allUsers = await axiosInstance.get("api/user/get-all-users");
    return allUsers.data;
    }

    catch(err) {
     return err.response;
    }
}