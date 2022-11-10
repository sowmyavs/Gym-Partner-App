import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const [desiredExercise, setDesiredExercise] = useState([]);
  const [images, setImages] = useState([]);
  const [favGym, setFavGym] = useState();
  const gyms = ["The Nick", "The Shell", "Off Campus Gym"];
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

  /**
   * State manager for desiredExercise checkboxes.
   */
  const handleCheckbox = (event) => {
    const exercise = event.target.labels[0].innerText;
    if (desiredExercise.includes(exercise)) {
      setDesiredExercise((prev) =>
        prev.filter((toRemove) => toRemove !== exercise)
      );
    } else {
      setDesiredExercise([...desiredExercise, exercise]);
    }
  };

  const uploadImage = async (image) => {
    let blob = image.slice(0, image.size, "image/jpg");
    let newFile = new File([blob], "1.jpg", { type: "image/jpg" });
    let formData = new FormData();
    formData.append("imgfile", newFile);
    const response = await fetch(`/image/${localStorage.getItem("id")}`, {
      method: "POST",
      body: newFile,
    });
    if (response.status == 201) {
      console.log("Image uploaded");
    } else {
      console.log("Error uploading image");
      console.log(response);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const bio = data.get("bio");
    const experienceLevel = data.get("experience-level");
    Array.from(images).forEach((image) => uploadImage(image));

    // TODO waiting on backend PUT to be updated
    // const response = await fetch(`/user/${localStorage.getItem("id")}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     bio: bio,
    //     experience_level: experienceLevel,
    //     desired_exercise: desiredExercise,
    //     favorite_gym: favGym,
    //   }),
    // });
    // console.log(response);
  };

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
        onSubmit={handleSubmit}
      >
        <Grid container spacing={4} sx={{ alignItems: "center" }}>
          <Grid item xs={12} sx={{ display: "flex" }}>
            <IconButton
              onClick={() => navigate("/")}
              sx={{ alignSelf: "start" }}
            >
              <ArrowBackIcon></ArrowBackIcon>
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
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
                onChange={(e) => {
                  setImages(e.target.files);
                }}
              />
            </Button>
            {images.length > 0 && (
              <>
                {Array.from(images).map((image) => {
                  return <code key={image.name}>{image.name},</code>;
                })}
              </>
            )}
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
              step={0.01}
              marks={experienceLevels}
              min={0}
              max={10}
              track={false}
            />
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <h3>Desired Exercise:</h3>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <FormGroup>
                <FormControlLabel
                  onChange={handleCheckbox}
                  control={<Checkbox />}
                  label="Cardio"
                />
                <FormControlLabel
                  onChange={handleCheckbox}
                  control={<Checkbox />}
                  label="Cycling"
                />
                <FormControlLabel
                  onChange={handleCheckbox}
                  control={<Checkbox />}
                  label="Strength Training"
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  onChange={handleCheckbox}
                  control={<Checkbox />}
                  label="Yoga"
                />
                <FormControlLabel
                  onChange={handleCheckbox}
                  control={<Checkbox />}
                  label="Crossfit"
                />
                <FormControlLabel
                  onChange={handleCheckbox}
                  control={<Checkbox />}
                  label="Sports"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              value={favGym || null}
              onChange={(event, newValue) => {
                setFavGym(newValue);
              }}
              fullWidth
              required
              options={gyms}
              name="fav-gym"
              label="Favorite Gym"
              renderInput={(params) => (
                <TextField {...params} label="Preferred Gym*" />
              )}
            ></Autocomplete>
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={
                images.length === 0 || desiredExercise.length === 0 || !favGym
              }
              type="submit"
              fullWidth
              variant="contained"
            >
              COMPLETE
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
