import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { Toaster } from "react-hot-toast";
import Loader from "./components/loader";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ProtectedRoute from "./components/protectedRoute";
import { useSelector } from "react-redux";

import "./App.css";

function App() {
  const loader = useSelector((state) => state.loader.isLoading);
  return (
    <div>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      {loader && <Loader />}
      <BrowserRouter>
        <Routes>
          {" "}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/signup" element={<Signup />} />{" "}
        </Routes>{" "}
      </BrowserRouter>
      `{" "}
    </div>
  );
}

export default App;
