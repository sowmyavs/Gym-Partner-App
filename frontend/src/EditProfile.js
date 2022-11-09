import React from "react";
import Container from "@mui/material/Container";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Slider,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const experienceLevels = [
    {
      value: 0,
      label: "Novice",
    },
    {
      value: 5,
      label: "Intermediate",
    },
    {
      value: 10,
      label: "Experienced",
    },
  ];

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid container spacing={4} sx={{ alignItems: "center" }}>
          <IconButton onClick={() => navigate("/")} sx={{ alignSelf: "start" }}>
            <ArrowBackIcon></ArrowBackIcon>
          </IconButton>
          <Grid item xs={12}>
            <h1>Complete Your Profile</h1>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="zip-code"
              label="Zip Code"
              type="text"
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" component="label">
              Add Images <AddPhotoAlternateIcon sx={{ ml: 2 }} />
              <input
                name="images"
                required
                type="file"
                hidden
                multiple
                accept=".png,.jpg,"
              />
            </Button>
          </Grid>
          <Grid item xs={6}>
            <p>1-6 Profile Photos Required (JPEG or PNG)</p>
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              minRows={2}
              required
              fullWidth
              name="bio"
              label="Bio"
              type="text"
              placeholder="Write about yourself... (max: 140 characters)"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <h3>Experience Level:</h3>
            <Slider
              name="experience-level"
              defaultValue={3}
              step={1}
              marks={experienceLevels}
              min={0}
              max={10}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="fav-gym"
              label="Favorite Gym"
              type="text"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained">
              COMPLETE
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
