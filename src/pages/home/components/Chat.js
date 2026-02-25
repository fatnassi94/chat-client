import React from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createNewMessage } from "../../../apiCalls/messages";
import { showLoader, hideLoader } from "../../../redux/loaderSlice";

export default function Chat() {
  const [message, setMessage] = React.useState("");
  const { selectedChat, user } = useSelector((state) => state.user);
  const selectedUser = selectedChat?.members?.find(
    (member) => member._id !== user._id,
  );
  const dispatch = useDispatch();

  const sendMessage = async () => {
    try {
      const newMessage = {
        chatId: selectedChat._id,
        senderId: user._id,
        text: message,
      };
      dispatch(showLoader());
      const response = await createNewMessage(newMessage);
      dispatch(hideLoader());
      if (response.success) {
        toast.success("Message sent successfully!");
        setMessage("");
      } else {
        toast.error(
          response.message || "Failed to send message. Please try again.",
        );
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };
  return (
    <div className="app-chat-area">
      <div className="app-chat-area-header">
        {selectedUser?.firstName} {selectedUser?.lastName}
      </div>
      <div  className="main-chat-area">CHAT AREA</div>
      <div className="send-message-div">
        <input
          type="text"
          className="send-message-input"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="fa fa-paper-plane send-message-btn"
          aria-hidden="true"
          onClick={sendMessage}
        ></button>
      </div>
    </div>
  );
}
