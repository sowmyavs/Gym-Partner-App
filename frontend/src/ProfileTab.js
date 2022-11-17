import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit'
import SettingsIcon from '@mui/icons-material/Settings'
import UserCard from "./UserCard";

import logo from './logo192.png';

export default function ProfileTab() {
  const navigate = useNavigate();

  return (
    <Stack sx={{ m: "auto", pl: "100px" }}>
      <UserCard
        name="Reid Stricker"
        gender="Male"
        age={21}
        bio="I like to lift in the mornings, looking for gym bud."
        image={logo}
        gym="Nick"
        exercise={["Cardio", "Strength", "Crossfit", "Soccer"]}
        experience={5}
      />
      <Stack direction="row" spacing={10} sx={{m: "auto"}}>
        <IconButton onClick={() => navigate("/survey")}><EditIcon fontSize="large"/></IconButton>
        <IconButton><SettingsIcon fontSize="large"/></IconButton>
      </Stack>
    </Stack>
  );
}
