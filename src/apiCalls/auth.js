import { axiosInstance } from "./index";

export const signup = async (user) => {
  try {
    const response = await axiosInstance.post("api/auth/signup", user);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const login = async (user) => {
  try {
    const response = await axiosInstance.post("api/auth/login", user);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
