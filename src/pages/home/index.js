import React from 'react'
import Header from './components/header'
import Sidebar from './components/sidebar'
export default function index() {
  return (
<div className="home-page">
  <Header />
  <Sidebar />
    <div className="main-content">
      <h1>Welcome to Chat App</h1>
    </div>
</div>
    
  )
}
