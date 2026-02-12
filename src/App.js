import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login";
import Signup from "./pages/signup";
import "./App.css";

function App() {
  return (
    <div>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <BrowserRouter>
        <Routes>
          {" "}
          <Route path="/" element={<Home />} />{" "}
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/signup" element={<Signup />} />{" "}
        </Routes>{" "}
      </BrowserRouter>
      `{" "}
    </div>
  );
}

export default App;
