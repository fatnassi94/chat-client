import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function UserList({ searchTerm }) {
  const [users, setUsers] = useState([]);
  const allUsers = useSelector((state) => state.user.allUsers);
  useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);
  return (
    <div class="user-search-filter">
      <div class="filtered-user">
        {users
          .filter((user) => {
            const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase());
          })
          .map((user) => (
            <div class="filter-user-display" key={user._id}>
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
                <div class="user-display-email">{user.email}</div>
              </div>
              <div class="user-start-chat">
                <button class="user-start-chat-btn">Start Chat</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
