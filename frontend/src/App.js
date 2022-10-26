import "antd/dist/antd.css";

import { useState } from "react";
import LoginPage from "./LoginPage"

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

  switch (currPage) {
    case "home":
        return(
            <h1>TODO make home page</h1>
        )
    case "createAccountPage":
        return(
            <h1>TODO make create account page</h1>
        )
    default:
        return (
            <LoginPage signInSuccess={signInSuccess} openCreateAccountPage={openCreateAccountPage}/>
            )
  }
}

export default App;
