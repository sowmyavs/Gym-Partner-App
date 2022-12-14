import * as React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Container, Modal, Typography, Button } from "@mui/material";
import { positions } from '@mui/system';

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LogoutIcon from "@mui/icons-material/Logout";

import ProfileTab from "./ProfileTab.js";
import MatchTab from "./MatchTab.js";
import ChatTab from "./ChatTab.js";
import { Navigate, useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    if (newValue != 3)
      setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            onClick={handleOpen}
            icon={<LogoutIcon fontSize="large" />}
            sx={{ position: "absolute", bottom: 0 }}
          />
        </Tabs>
      </Box>
      {value === 0 && <ProfileTab/>}
      {value === 1 && <MatchTab/>}
      {value === 2 && <ChatTab/>}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box 
          sx={{
            position: "absolute", 
            top: "50%", left: "50%", 
            width: 200, 
            transform: "translate(-50%, -50%)", 
            bgcolor: "white", 
            border: "2px solid #000", 
            boxShadow: 24, 
            p: 4
          }}
        >
          <Typography variant="h6">Are you sure?</Typography>
          <Button 
            variant="contained"
            onClick={() => {
              localStorage.removeItem("id");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Box>
      </Modal>
    </Container>
  ) : (
    <Navigate replace={true} to="/login"></Navigate>
  );
}
