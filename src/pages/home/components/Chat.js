import React from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  createNewMessage,
  getAllMessages as getAllMessagesAPI,
} from "../../../apiCalls/messages";
import { clearUnreadMessages } from "../../../apiCalls/chat";
import { showLoader, hideLoader } from "../../../redux/loaderSlice";

export default function Chat() {
  const dispatch = useDispatch();

  const { selectedChat, user, allChats } = useSelector((state) => state.user);

  const [message, setMessage] = React.useState("");
  const [allMessages, setAllMessages] = React.useState([]);

  // Get the other user in the chat
  const selectedUser = selectedChat?.members?.find(
    (member) => member._id !== user?._id,
  );

  // ✅ Send Message
  const sendMessage = async () => {
    if (!message.trim()) return;
    if (!selectedChat?._id) return;

    try {
      dispatch(showLoader());

      const newMessage = {
        chatId: selectedChat._id,
        senderId: user._id,
        text: message.trim(),
      };

      const response = await createNewMessage(newMessage);

      if (response.success) {
        toast.success("Message sent successfully!");
        setMessage("");

        // Refresh messages after sending
        fetchAllMessages();
      } else {
        toast.error(
          response.message || "Failed to send message. Please try again.",
        );
      }
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      dispatch(hideLoader());
    }
  };

  // ✅ Fetch All Messages
  const fetchAllMessages = async () => {
    if (!selectedChat?._id) return;

    try {
      dispatch(showLoader());

      const response = await getAllMessagesAPI(selectedChat._id);

      if (response.success) {
        setAllMessages(response.messages || []);
      } else {
        toast.error(
          response.message || "Failed to fetch messages. Please try again.",
        );
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while fetching messages.",
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  // ✅ clear UnreadMessages
  const clearAllUnread = async () => {
    if (!selectedChat?._id) return;

    try {
      dispatch(showLoader());

      const response = await clearUnreadMessages(selectedChat._id);

      if (response.success) {
        allChats.map((chat) => {
          if (chat._id === selectedChat._id) {
            return response.data;
          }
          return chat;
        });
      } else {
        toast.error(
          response.message || "Failed to fetch messages. Please try again.",
        );
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while fetching messages.",
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  // ✅ Fetch messages when selectedChat changes
  React.useEffect(() => {
    if (selectedChat?._id) {
      fetchAllMessages();
        clearAllUnread();
    } else {
      setAllMessages([]);
    }
  }, [selectedChat]);

  return (
    <div className="app-chat-area">
      {/* Chat Header */}
      <div className="app-chat-area-header">
        {selectedUser
          ? `${selectedUser.firstName} ${selectedUser.lastName}`
          : "Select a chat"}
      </div>

      {/* Messages Area */}
      <div className="main-chat-area">
        {allMessages.length === 0 ? (
          <div className="no-messages">No messages yet</div>
        ) : (
          allMessages.map((msg) => (
            <div
              key={msg._id}
              className={`message ${
                msg.senderId === user._id ? "sent" : "received"
              }`}
            >
              <p>{msg.text}</p>
              <span>{new Date(msg.updatedAt).toLocaleTimeString()}</span>
            </div>
          ))
        )}
      </div>

      {/* Send Message Area */}
      {selectedChat && (
        <div className="send-message-div">
          <input
            type="text"
            className="send-message-input"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="fa fa-paper-plane send-message-btn"
            aria-hidden="true"
            onClick={sendMessage}
          />
        </div>
      )}
    </div>
  );
}
