import React from "react";
import Container from "@mui/material/Container";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Slider,
  TextField,
  Typography,
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
  const desiredExercise = [
    {
      value: 0,
      label: "Cardio"
    },
    {
      value: 10,
      label: "Strength Training"
    }
  ]
  const gyms = [
    {
      label: "The Nick"
    }, 
    {
      label: "The Shell"
    }, 
    {
      label: "Off Campus Gym"
    }
  ]

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
          <Grid item xs={12} sx={{display: 'flex'}}>
            <IconButton onClick={() => navigate("/")} sx={{ alignSelf: "start" }}>
              <ArrowBackIcon></ArrowBackIcon>
            </IconButton>
            <Box sx={{flexGrow: 1}}>
              <Typography variant="h5">Complete Your Profile</Typography>
            </Box>
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
              defaultValue={5}
              step={.01}
              marks={experienceLevels}
              min={0}
              max={10}
              track={false}
            />
          </Grid>
          <Grid item xs={12}>
            <h3>Desired Exercise:</h3>
            <Slider
              name="desired-exercise"
              defaultValue={5}
              step={.01}
              marks={desiredExercise}
              min={0}
              max={10}
              track={false}
              color="secondary"
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              required
              options={gyms}
              name="fav-gym"
              label="Favorite Gym"
              renderInput={(params) => <TextField {...params} label="Preferred Gym*" />}
            ></Autocomplete>
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
