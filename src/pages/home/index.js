import React from 'react'
import Header from './components/header'
import Sidebar from './components/sidebar'
import ChatArea from './components/Chat'
export default function index() {
  return (
<div className="home-page">
  <Header />
  
    <div className="main-content">
      <Sidebar />
      <ChatArea />
    </div>
</div>
    
  )
}
