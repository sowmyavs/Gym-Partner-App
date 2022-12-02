import * as React from 'react';
import {Stack} from "@mui/material";
import UserCard from "./UserCard";

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
  }, [])

  const nextUser = () => {
    // TODO what if currentProfile is the last possible?
    // TODO make sure profile being shown isn't current users
    setCurrentProfile(currentProfile + 1)
  }

  return(
    <Stack sx={{ m: "auto" }}>
      {potentialMatches != null &&
      <UserCard
      name={potentialMatches[currentProfile].name}
      experience={potentialMatches[currentProfile].experience_level}
      gym={potentialMatches[currentProfile].favorite_gym}
      exercise={potentialMatches[currentProfile].desired_exercise}
      bio={potentialMatches[currentProfile].bio}
      images={potentialMatches[currentProfile].images}
      />
     };
    </Stack>
  )
}