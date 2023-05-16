import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login"
import UserInfo from "./pages/UserInfo";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import CreateContent from "./pages/CreateContent";
import EditContent from "./pages/EditContent";
import VerifyEmail from "./pages/VerifyEmail";


function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-info" element={<UserInfo />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/create-content" element={<CreateContent />} />
            <Route path="/edit-content" element={<EditContent />} />
            <Route path="/verify/:token" element={<VerifyEmail />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
