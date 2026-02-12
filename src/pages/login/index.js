import React from "react";
import {Link}   from "react-router-dom";
import {login} from "../../apiCalls/auth";
import {toast} from "react-hot-toast";
export default function Login() {
  const [user, setUser] = React.useState({ email: "", password: "" });

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
     const response = await login(user);
     if (response.success) {
        toast.success("Login successful! Redirecting to chat...");
        localStorage.setItem("token", response.token)
        window.location.href = "/";
     }
     else {
        toast.error(response.message || "Login failed. Please try again.");
     }
    }
    catch(err) {
        toast.error(err.message || "An error occurred. Please try again.");
    }
  };
  return (
    <div className="container">
      <div className="container-back-img"></div>
      <div className="container-back-color"></div>
      <div className="card">
        <div className="card_title">
          <h1>Login Here</h1>
        </div>
        <div className="form">
          <form onSubmit={onFormSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button>Login</button>
          </form>
        </div>
        <div className="card_terms">
          <span>
            Don't have an account yet?
            <Link to="/signup">Signup Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
