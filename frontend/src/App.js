import "antd/dist/antd.css";

import { useState } from "react";
import LoginPage from "./LoginPage"
import CreateAccountPage from "./CreateAccountPage"
import MainPage from "./MainPage"

function App() {
  const [users, setUsers] = useState([]);
  const [currPage, setCurrPage] = useState([]);
  const [currUser, setCurrUser] = useState([]);

  const signInSuccess = (user) => {
    setCurrUser(user)
    setCurrPage("home")
  }

  const openCreateAccountPage = () => {
    setCurrPage("createAccountPage")
  }

  const openLoginPage = () => {
    setCurrPage("login")
  }

  switch (currPage) {
    case "home":
        return(
            <MainPage/>
        )
    case "createAccountPage":
        return(
            <CreateAccountPage signInSuccess={signInSuccess} openLoginPage={openLoginPage}/>
        )
    default:
        return (
            <LoginPage signInSuccess={signInSuccess} openCreateAccountPage={openCreateAccountPage}/>
            )
  }
}

export default App;
