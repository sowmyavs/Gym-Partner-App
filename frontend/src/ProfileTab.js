import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function ProfileTab() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate("/survey")} variant="contained">
      Edit Profile
    </Button>
  );
}
