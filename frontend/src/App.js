import "antd/dist/antd.css";

import { useState } from "react";
import LoginPage from "./LoginPage";
import CreateAccountPage from "./CreateAccountPage";
import MainPage from "./MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Survey from "./Survey";
import GlobalStyle from "./GlobalStyle";

function App() {
  const [currUser, setCurrUser] = useState([]);

  return (
    <div>
      <GlobalStyle />{" "}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createAccount" element={<CreateAccountPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/survey" element={<Survey />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
