import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function LogoutTab() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        localStorage.removeItem("id");
        navigate("/login");
      }}
      variant="contained"
    >
      Log Out
    </Button>
  );
}
