import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, IconButton, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit'
import SettingsIcon from '@mui/icons-material/Settings'
import UserCard from "./UserCard";

export default function ProfileTab() {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = React.useState(null);

  // TODO: get this to stop infinite looping lmao
  React.useEffect(() => {
    const fetchUser = async () => {
      let response = await fetch("/user/" + localStorage.getItem("id"));
      const user = await response.json();
      setUserProfile(user);
      console.log(user);
    }
    fetchUser();
  }, [])

  return (
    <Stack sx={{ m: "auto" }}>
      {userProfile != null &&
        <UserCard
        name={userProfile.name}
        experience={userProfile.experience_level}
        gym={userProfile.favorite_gym}
        exercise={userProfile.desired_exercise}
        bio={userProfile.bio}
        images={userProfile.images}
        />
      }
      {userProfile == null &&
        <Paper elevation={4} sx={{height: 470, width: 360, mb: 2}}/>
      }
      <Stack direction="row" spacing={10} sx={{m: "auto"}}>
        <IconButton onClick={() => navigate("/survey")}><EditIcon fontSize="large"/></IconButton>
        <IconButton><SettingsIcon fontSize="large"/></IconButton>
      </Stack>
    </Stack>
  );
}
