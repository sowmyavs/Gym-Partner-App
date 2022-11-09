import "antd/dist/antd.css";

import { useState } from "react";
import LoginPage from "./LoginPage";
import CreateAccountPage from "./CreateAccountPage";
import MainPage from "./MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditProfile from "./EditProfile";

function App() {
  const [currUser, setCurrUser] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createAccount" element={<CreateAccountPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/editProfile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
