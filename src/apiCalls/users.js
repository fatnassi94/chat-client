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