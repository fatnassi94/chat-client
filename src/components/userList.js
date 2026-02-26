import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { createChat } from "../apiCalls/chat";
import { showLoader, hideLoader } from "../redux/loaderSlice";
import { setAllChats, setSelectedChat } from "../redux/userSlice";
import { getAllChats } from "../apiCalls/chat";

export default function UserList({ searchTerm }) {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers);
  const user = useSelector((state) => state.user.user);
  const allChats = useSelector((state) => state.user.allChats);
    const {selectedChat} = useSelector(state => state.user);
  
  useEffect(() => {

    setUsers(allUsers);
  }, [allUsers]);

  const createNewChat = async (userId) => {
    
    try {
      dispatch(showLoader());

      const response = await createChat({
        members: [user._id, userId],
      });

      if (response.success) {
        toast.success("Chat created successfully!");
        const newChat = response.chat;

        const chatsResponse = await getAllChats();
      
        if (chatsResponse.success) {
          dispatch(setAllChats(chatsResponse.chats));
          dispatch(setSelectedChat(newChat));
        }
      } else {
        toast.error(response.message);
      }

      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      toast.error("Something went wrong");
    }
  };
  const openChat = (userId) => {
    const chat = allChats.find(chat => chat.members.map(el => el._id).includes(userId) && chat.members.map(el => el._id).includes(user._id));
    if (chat) {
      dispatch(setSelectedChat(chat));
    }
  }
  const findInChat = userId => {
    return allChats.find(chat => chat.members.map(el => el._id).includes(userId));
  }

  const isSelectedChat = user => {
    if (selectedChat) {
      return selectedChat.members.map(el => el._id).includes(user._id);
    }
    return false
  }

  const getLastMessage = user => {
    const chat = allChats.find(chat => chat.members.map(el => el._id).includes(user._id) && chat.members.map(el => el._id).includes(user._id));
    if (!chat) return "";
    return chat?.lastMessage[0]?.text?.length > 30 ? chat?.lastMessage[0]?.text.substring(0, 30) + "..." : chat?.lastMessage[0]?.text;
  }
  return (
    <div class="user-search-filter" >
      <div class="filtered-user">
        {users
          .filter((user) => {
            const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase());
          })
          .map((user) => (
            <div class={isSelectedChat(user) ? "filter-user-display selected-user" : "filter-user-display"} key={user._id} onClick={() => openChat(user._id)}>
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile Pic"
                  class="user-profile-image"
                />
              ) : (
                <div class="user-default-profile-pic">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </div>
              )}
              <div class="filter-user-details">
                <div class="user-display-name">
                  {user.firstName} {user.lastName}
                </div>
                <div class="user-display-email">{getLastMessage(user) || user.email}</div>
              </div>
              <div class="user-start-chat">
               { !findInChat(user._id) && <button
                  class="user-start-chat-btn"
                  onClick={() => createNewChat(user._id)}
                >
                  Start Chat
                </button>}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
