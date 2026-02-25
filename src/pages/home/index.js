import React from 'react'
import { useSelector } from 'react-redux';
import Header from './components/header'
import Sidebar from './components/sidebar'
import ChatArea from './components/Chat'
export default function Index() {
  const {selectedChat} = useSelector(state => state.user);
  return (
<div className="home-page">
  <Header />
  
    <div className="main-content">
      <Sidebar />
      {selectedChat && <ChatArea />}
    </div>
</div>
    
  )
}
