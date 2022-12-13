import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileTab() {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const [emailModal, setEmailModal] = useState(false);
  const [email, setEmail] = useState();
  const [confirmEmail, setConfirmEmail] = useState("");

  const [passwordModal, setPasswordModal] = useState(false);
  const [password, setPassword] = useState();
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  /**
   * Fetch the user info on page load
   */
  useEffect(async () => {
    const response = await fetch(`/user/${localStorage.getItem("id")}`);
    const json = await response.json();
    setUser(json);
    setEmail(json.email);
    setPassword(json.password);
  }, []);

  const closeEmailModal = () => {
    setEmailModal(false);
    setEmail(user.email);
    setConfirmEmail("");
  };

  const closePasswordModal = () => {
    setPasswordModal(false);
    setPassword(user.password);
    setNewPassword("");
    setConfirmPassword("");
  };

  const updateUser = async () => {
    const response = await fetch(`/user/${localStorage.getItem("id")}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        email: email,
        password: newPassword || password,
      }),
    });

    closeEmailModal();
    closePasswordModal();
    const resp = await fetch(`/user/${localStorage.getItem("id")}`);
    const json = await resp.json();
    setUser(json);
    setEmail(json.email);
    setPassword(json.password);
  };

  const deleteAccount = async () => {
    const response = await fetch(`/user/${localStorage.getItem("id")}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setDeleteModal(false);
    navigate("/createAccount");
  };

  return (
    <Container maxWidth="xs">
      {/* Form component */}
      <Box
        component="form"
        sx={{
          marginTop: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <Grid container spacing={4} sx={{ alignItems: "center" }}>
          <Grid item xs={12} sx={{ display: "flex" }}>
            {/* Back Button */}
            <IconButton
              onClick={() => navigate("/")}
              sx={{ alignSelf: "start" }}
            >
              <ArrowBackIcon></ArrowBackIcon>
            </IconButton>

            {/* Title */}
            <Box sx={{ flexGrow: 0.9 }}>
              <Typography variant="h5">Settings</Typography>
            </Box>
          </Grid>

          {/* Change Email */}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              component="label"
              onClick={() => setEmailModal(true)}
            >
              Change Email
            </Button>
          </Grid>

          {/* Email Modal */}
          <Modal open={emailModal} onClose={closeEmailModal}>
            <Box sx={style}>
              <TextField
                margin="normal"
                fullWidth
                label="New Email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Confirm Email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
              <Button
                sx={{ marginRight: 2, marginTop: 2 }}
                variant={email === confirmEmail ? "contained" : "disabled"}
                color="error"
                onClick={updateUser}
              >
                Update
              </Button>
              <Button
                sx={{ marginLeft: 2, marginTop: 2 }}
                variant="contained"
                color="secondary"
                onClick={closeEmailModal}
              >
                Cancel
              </Button>
            </Box>
          </Modal>
          {/* End Email Modal */}

          {/* Change Password */}
          <Grid item xs={12}>
            <Button
              onClick={() => setPasswordModal(true)}
              fullWidth
              variant={"contained"}
              component="label"
            >
              Change Password
            </Button>
          </Grid>

          {/* Password Modal */}
          <Modal open={passwordModal} onClose={closePasswordModal}>
            <Box sx={style} component="form">
              <TextField
                type="password"
                autoComplete="off"
                margin="normal"
                fullWidth
                label="Current Password"
                autoFocus
                value={currPassword}
                onChange={(e) => setCurrPassword(e.target.value)}
              />
              <TextField
                type="password"
                autoComplete="off"
                margin="normal"
                fullWidth
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                type="password"
                autoComplete="off"
                margin="normal"
                fullWidth
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                sx={{ marginRight: 2, marginTop: 2 }}
                variant={
                  newPassword === confirmPassword &&
                  newPassword.length > 3 &&
                  currPassword === user.password
                    ? "contained"
                    : "disabled"
                }
                color="error"
                onClick={updateUser}
              >
                Update
              </Button>
              <Button
                sx={{ marginLeft: 2, marginTop: 2 }}
                variant="contained"
                color="secondary"
                onClick={closePasswordModal}
              >
                Cancel
              </Button>
            </Box>
          </Modal>
          {/* End Password Modal */}

          {/* Delete Account */}
          <Grid item xs={12}>
            <Button
              onClick={() => setDeleteModal(true)}
              fullWidth
              variant="outlined"
              component="label"
            >
              Delete Account
            </Button>
          </Grid>

          {/* Delete Account Modal */}
          <Modal open={deleteModal} onClose={() => setDeleteModal(false)}>
            <Box sx={style} component="form">
              <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
                Are you sure you want to delete your account?
              </Typography>
              <Typography
                variant="button"
                sx={{ marginBottom: 2, marginLeft: 8, marginRight: 8 }}
              >
                This action is permanent!!!
              </Typography>
              <Button
                sx={{ marginRight: 2, marginTop: 2 }}
                variant="contained"
                color="error"
                onClick={deleteAccount}
              >
                Delete
              </Button>
              <Button
                sx={{ marginLeft: 2, marginTop: 2 }}
                variant="contained"
                color="secondary"
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </Button>
            </Box>
          </Modal>
          {/* End Delete Account Modal */}
        </Grid>
      </Box>
    </Container>
  );
}
