import "antd/dist/antd.css";

import { useState } from "react";
import LoginPage from "./LoginPage";
import CreateAccountPage from "./CreateAccountPage";
import MainPage from "./MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditProfile from "./EditProfile";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  const [currUser, setCurrUser] = useState([]);

  const theme = createTheme({
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            "&, &:hover": {
              color: "#c5050c",
              textDecorationColor: "#c5050c",
            },
          },
        },
      },
    },
    palette: {
      primary: {
        main: "#c5050c",
      },
      secondary: {
        main: "#757575",
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/createAccount" element={<CreateAccountPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/editProfile" element={<EditProfile />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
