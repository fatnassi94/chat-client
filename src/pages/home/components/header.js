import React from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const { user } = useSelector((state) => state.user);


  function getFullName() {
   return user ? `${user.firstName} ${user.lastName}` : "Guest";
  } 

  function getinitials() {
    return user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase() : "G";
  }
   return (
    <div className="app-header">
      <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
        Quick Chat
      </div>
      <div className="app-user-profile">
        <div className="logged-user-name">{getFullName()}</div>
        <div className="logged-user-profile-pic">{getinitials()}</div>
      </div>
    </div>
  );
}
