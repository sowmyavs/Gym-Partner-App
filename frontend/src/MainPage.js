import * as React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Stack, Container, Button } from "@mui/material";
import { positions } from '@mui/system';

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LogoutIcon from "@mui/icons-material/Logout";

import ProfileTab from "./ProfileTab.js";
import MatchTab from "./MatchTab.js";
import ChatTab from "./ChatTab.js";
import LogoutTab from "./LogoutTab.js";
import { Navigate } from "react-router-dom";

export default function MainPage() {
  // CR: rename value to more clear var
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return localStorage.getItem("id") ? (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: "100vh", display: "flex" }}
    >
      <Box width={100}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          textColor="inherit"
          sx={{ 
            borderRight: 1, 
            borderColor: "divider",
            height: "100vh",
            position: "absolute",
            left: 0,
          }}
          TabIndicatorProps={{
            style: 
              { backgroundColor: "#c5050c", 
                width: 4 
              }
          }}
        >
          <Tab
            label="Profile"
            icon={<AccountCircleIcon fontSize="large" />}
          />
          <Tab
            label="Match"
            icon={<FitnessCenterIcon fontSize="large" />}
          />
          <Tab
            label="Chat"
            icon={<ChatBubbleIcon fontSize="large" />}
          />
          <Tab
            label="Logout"
            icon={<LogoutIcon fontSize="large" />}
            sx={{ position: "absolute", bottom: 0 }}
          />
        </Tabs>
      </Box>
        {value === 0 && <ProfileTab/>}
        {value === 1 && <MatchTab/>}
        {value === 2 && <ChatTab/>}
        {value === 3 && <LogoutTab/>}
    </Container>
  ) : (
    <Navigate replace={true} to="/login"></Navigate>
  );
}
