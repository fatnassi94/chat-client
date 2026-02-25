import { axiosInstance } from ".";


export const createNewMessage = async (messageData) => {
try {
 const response = await axiosInstance.post("api/message/send-message", messageData);
 return response.data;
}

catch(error) {
  return error;
}
}


export const getAllMessages = async (chatId) => {
    try {
    const response = await axiosInstance.get(`api/message/get-messages-by-chat-id/${chatId}`);
    return response.data
    }
    catch (error) {
        return error
    }
}