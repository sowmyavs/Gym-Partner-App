import * as React from 'react';
import {Stack, IconButton, Paper} from "@mui/material";
import UserCard from "./UserCard";
import Box from '@mui/material/Box';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

export default function MatchTab() {
    
  const [currentProfile, setCurrentProfile] = React.useState(0);
  const [potentialMatches, setPotentialMatches] = React.useState(null)

  React.useEffect(() => {
    const fetchUsers = async () => {
      // TODO alter this to search for likely to match users
      let response = await fetch("/users");
      setPotentialMatches(await response.json());
      console.log(potentialMatches);
    }
    fetchUsers();
    console.log(currentProfile)
  }, [])

  const nextProfile = () => {
    // If all potential matches are exhausted, loop through them again
    if(currentProfile + 1 === potentialMatches.length) {
      setCurrentProfile(0)
    }
    // increment profile
    else {
      setCurrentProfile(currentProfile + 1)
    }
    // make sure profile being shown isn't current users
    if(potentialMatches[currentProfile]._id === localStorage.getItem("id")) {
      if(currentProfile + 1 === potentialMatches.length) {
        // reset profile loop
        setCurrentProfile(0)
      }
      else {
        // increment profile
        setCurrentProfile(currentProfile + 1)
      }
    }
  }

  const likeProfile = () => {
    async function updatedLikedUsers() {
      // get current user
      let response = await fetch(`/user/${localStorage.getItem("id")}`);
      let user = await response.json();
      console.log(user)
    
      // update liked_users locally
      user.liked_users.push(potentialMatches[currentProfile]._id)
      // push changes to liked users to the database
      // TODO make api function to add one user to liked_users
      await fetch(`/user/${localStorage.getItem("id")}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password,
            bio: user.bio,
            images: user.images,
            experience_level: user.experience_level,
            desired_exercise: user.desired_exercise,
            favorite_gym: user.favorite_gym,
            liked_users: user.liked_users,
            matched_users: user.matched_users,
            blocked_users: user.blocked_users
          })
      })
      // log new data in console
      let newresponse = await fetch("/user/" + localStorage.getItem("id"));
      let newuser = await newresponse.json();
      console.log(newuser);
    }
    updatedLikedUsers()
    nextProfile()
  }

  return(
    <Stack sx={{ m: "auto" }} direction={"row"} spacing={10} alignItems="center">
      <Box>
        <IconButton onClick={nextProfile}><ThumbDownAltOutlinedIcon fontSize="large" style={{color: "#c5050c"}}/></IconButton>
      </Box>
      {potentialMatches === null &&
      <Paper elevation={4} sx={{height: 500, width: 413, mb: 2}}/>}
      {potentialMatches != null &&
      <UserCard
        name={potentialMatches[currentProfile].name}
        experience={potentialMatches[currentProfile].experience_level}
        gym={potentialMatches[currentProfile].favorite_gym}
        exercise={potentialMatches[currentProfile].desired_exercise}
        bio={potentialMatches[currentProfile].bio}
        images={potentialMatches[currentProfile].images}
        />
      }
      <Box>
        <IconButton onClick={likeProfile}><ThumbUpAltOutlinedIcon fontSize="large" style={{color: "#c5050c"}}/></IconButton>
      </Box>
    </Stack>
  )
}