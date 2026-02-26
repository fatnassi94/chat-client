import { axiosInstance } from ".";

export const getAllChats = async () => {
    try {
  const allChats = await axiosInstance.get("api/chat/get-all-chats");
    return allChats.data;
    }

    catch(err) {
     return err.response;
    }
}

export const createChat = async (chatData) => {
    try {
  const newChat = await axiosInstance.post("api/chat/create-new-chat", chatData);
    return newChat.data;
    }

    catch(err) {
     return err.response;
    }
}

export const clearUnreadMessages = async (chatId) => {
  try {
    const response = await axiosInstance.post("api/chat/clear-unread-messages", {chatId});
    return response.data;
  }
  catch(err) {
    return err.response;
  }
}