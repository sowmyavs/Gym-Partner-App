import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImagePreview from "./ImagePreview";

export default function EditProfile() {
  const navigate = useNavigate();

  // state to indicate image upload
  const [uploading, setUploading] = useState(false);

  // states for user object
  const [bio, setBio] = useState("");
  const [desiredExercise, setDesiredExercise] = useState([]);
  const [images, setImages] = useState([]);
  const [favGym, setFavGym] = useState();
  const [expLevel, setExpLevel] = useState(5);

  // constants
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
   * Fetch the user info on page load
   */
  useEffect(async () => {
    const response = await fetch(`/user/${localStorage.getItem("id")}`);
    const json = await response.json();
    setBio(json.bio);
    setFavGym(json.favorite_gym);
    setImages(json.images);
    setDesiredExercise(json.desired_exercise);
    setExpLevel(json.experience_level);
  }, []);

  /**
   * State manager for desiredExercise checkboxes; toggles preferences
   */
  const handleCheckbox = (event) => {
    // accessing target properties to get exercise string label
    const exercise = event.target.labels[0].innerText;
    if (desiredExercise.includes(exercise)) {
      setDesiredExercise((prev) =>
        prev.filter((toRemove) => toRemove !== exercise)
      );
    } else {
      setDesiredExercise([...desiredExercise, exercise]);
    }
  };

  /**
   * For each new image submitted, this will post to the user object with the image,
   * and will then re-fetch the user's images upon upload
   *
   * @param imageList list of new images when submiting to the form
   */
  const uploadImage = async (imageList) => {
    // show loading status
    setUploading(true);

    // upload images
    for (const image of Array.from(imageList)) {
      let blob = image.slice(0, image.size, image.type);
      let newFile = new File([blob], image.name, { type: image.type });
      let formData = new FormData();
      formData.append("imgfile", newFile);
      const response = await fetch(`/image/${localStorage.getItem("id")}`, {
        method: "POST",
        body: newFile,
      });
      if (response.status === 201) {
        console.log("Image uploaded");
      } else {
        console.log("Error uploading image");
        console.log(response);
      }
    }

    // get and set new images
    const response = await fetch(`/user/${localStorage.getItem("id")}`);
    const json = await response.json();
    setImages(json.images);

    // hide loading icon
    setUploading(false);
  };

  /**
   * Submits the form data and updates user object in db
   *
   * @param event event fired on submit press
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await fetch(
      `/user/preferences/${localStorage.getItem("id")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: bio,
          experience_level: expLevel,
          desired_exercise: desiredExercise,
          favorite_gym: favGym,
        }),
      }
    );

    // log error if failed, otherwise navigate away from page upon succsefful completion
    if (response.status != 201) {
      console.log(response);
    } else {
      navigate("/");
    }
  };

  //
  // To Render:
  //
  return (
    <Container maxWidth="xs">
      {/* Form component */}
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
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5">Complete Your Profile</Typography>
            </Box>
          </Grid>

          {/* Image Upload */}
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" component="label">
              Add Images <AddPhotoAlternateIcon sx={{ ml: 2 }} />
              <input
                name="images"
                type="file"
                hidden
                multiple
                accept=".png,.jpg,.gif"
                onChange={(e) => uploadImage(e.target.files)}
              />
            </Button>
          </Grid>
          <Grid item xs={6}>
            <p>1-6 Profile Photos Required (JPEG or PNG)</p>
          </Grid>

          {/* Images Previews and Loading Icon*/}
          {images.length > 0 && (
            <>
              <Grid container item xs={12}>
                {Array.from(images).map((image, i) => {
                  return (
                    <ImagePreview
                      key={image}
                      image={image}
                      index={i}
                      setImages={setImages}
                      imageArr={images}
                    />
                  );
                })}
                {uploading && (
                  <CircularProgress style={{ marginTop: 20, marginLeft: 40 }} />
                )}
              </Grid>
            </>
          )}

          {/* Bio Checkbox */}
          <Grid item xs={12}>
            <TextField
              multiline
              minRows={2}
              required
              fullWidth
              name="bio"
              label="Bio"
              type="text"
              value={bio}
              placeholder="Write about yourself... (max: 140 characters)"
              onChange={(event) => setBio(event.target.value)}
            ></TextField>
          </Grid>

          {/* Experience Level Slider */}
          <Grid item xs={12}>
            <h3>Experience Level:</h3>
            <Slider
              value={expLevel}
              step={1}
              marks={experienceLevels}
              min={0}
              max={10}
              track={false}
              onChange={(event, newVal) => setExpLevel(newVal)} 
            />
          </Grid>

          {/* Desired Exercise Checkboxes */}
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
              {/* Column 1 */}
              <FormGroup>
                <FormControlLabel
                  onChange={handleCheckbox}
                  control={
                    <Checkbox checked={desiredExercise.includes("Cardio")} />
                  }
                  label="Cardio"
                />
                <FormControlLabel
                  onChange={handleCheckbox}
                  control={
                    <Checkbox checked={desiredExercise.includes("Cycling")} />
                  }
                  label="Cycling"
                />
                <FormControlLabel
                  onChange={handleCheckbox}
                  control={
                    <Checkbox
                      checked={desiredExercise.includes("Strength Training")}
                    />
                  }
                  label="Strength Training"
                />
              </FormGroup>
              {/* Column 1 */}
              <FormGroup>
                <FormControlLabel
                  onChange={handleCheckbox}
                  control={
                    <Checkbox checked={desiredExercise.includes("Yoga")} />
                  }
                  label="Yoga"
                />
                <FormControlLabel
                  onChange={handleCheckbox}
                  control={
                    <Checkbox checked={desiredExercise.includes("Crossfit")} />
                  }
                  label="Crossfit"
                />
                <FormControlLabel
                  onChange={handleCheckbox}
                  control={
                    <Checkbox checked={desiredExercise.includes("Sports")} />
                  }
                  label="Sports"
                />
              </FormGroup>
            </Grid>
          </Grid>

          {/* Preferred Gym Dropdown */}
          <Grid item xs={12}>
            <Autocomplete
              value={favGym || "The Nick"}
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

          {/* Submit Button */}
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
