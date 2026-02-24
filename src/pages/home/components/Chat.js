import React from 'react'
import { useSelector } from 'react-redux';
export default function Chat() {
    const {selectedChat} = useSelector(state => state.user);
  return (
    <div>
      chat area
      <h2>{selectedChat ? selectedChat._id : "No chat selected"}</h2>
    </div>
  )
}
