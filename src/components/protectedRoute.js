import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getLoggedUser, getAllUsers } from "../apiCalls/users";
import { getAllChats } from "../apiCalls/chat";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../redux/loaderSlice";
import {setUser, setAllUsers, setAllChats} from "../redux/userSlice";

function ProtectedRoute({ children }) {
    const{ user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const logUser = async () => {
      try {
        dispatch(showLoader());

        const response = await getLoggedUser();

        if (response.success) {
            
          dispatch(setUser(response.user));
          const getAllUsersResponse = await getAllUsers();
            dispatch(setAllUsers(getAllUsersResponse.users));
              const getAllChatsResponse = await getAllChats();
              dispatch(setAllChats(getAllChatsResponse.chats));
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        localStorage.removeItem("token");
      } finally {
        dispatch(hideLoader());
        setChecked(true);
      }
    };

    if (token) {
      logUser();
    } else {
      setChecked(true);
    }
  }, [token, dispatch]);

  // No token → redirect
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Still verifying → render nothing (global loader visible)
  if (!checked) {
    return null;
  }

  // Token invalid after verification
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {children}
    </>
  );
}

export default ProtectedRoute;
