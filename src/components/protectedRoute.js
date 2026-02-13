import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getLoggedUser } from "../apiCalls/users";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const logUser = async () => {
      try {
        const response = await getLoggedUser();

        if (response.success) {
          setUser(response.user);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      logUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <div>
    <p>Welcome, {user?.firstName || "Guest"}!</p>
    {children}</div>;
}

export default ProtectedRoute;
