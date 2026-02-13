import React, {useState} from 'react'
import Search from '../../../components/search'
import UserList from '../../../components/userList'
export default function Sidebar() {
    const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="app-sidebar">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <UserList searchTerm={searchTerm} />
</div>
  )
}
