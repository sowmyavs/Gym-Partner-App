import * as React from "react";
import { useState } from "react";
import crc from "crc";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function CreateAccountPage({ signInSuccess, openLoginPage }) {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let id = crc.crc32(data.get("email"));
    let email = data.get("email");
    let password = data.get("password");
    let firstName = data.get("first-name");
    let lastName = data.get("last-name");
    let gender = data.get("gender-select");
    let birthday = data.get("birthday");
    console.log({
      id: id,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      birthday: birthday,
    });
    let allFilled = true;
    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === "" ||
      gender === null
    ) {
      allFilled = false;
    }

    async function createAccount() {
      await fetch("/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: firstName + " " + lastName,
          email: email,
          password: password,
          bio: "140 char max",
          images: [],
          experience_level: 0,
          desired_exercise: [],
          favorite_gym: "The Nick",
          liked_users: [],
          matched_users: [],
          blocked_users: [],
        }),
      });
      let response = await fetch("/user/" + id);
      let user = await response.json();
      console.log(user);
      localStorage.setItem("id", user._id);
      navigate("/editProfile");
    }

    if (allFilled) {
      createAccount();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Welcome
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="first-name"
                label="First Name"
                name="first-name"
                autoComplete="first-name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="last-name"
                label="Last Name"
                name="last-name"
                autoComplete="last-name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="birthday"
                name="birthday"
                label="Birthday"
                type="date"
                defaultValue="2022-10-26"
                sx={{ width: 500 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", alignItems: "center" }}
            >
              <FormControl>
                <FormLabel id="gender">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="gender"
                  name="gender-select"
                  align="center"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Account
          </Button>
        </Box>
        <Link as={RouterLink} to="/login" variant="body2">
          {"Already have an account? Sign In"}
        </Link>
      </Box>
    </Container>
  );
}
