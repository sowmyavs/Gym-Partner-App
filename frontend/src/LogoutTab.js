import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";

export default function LogoutTab() {
  const navigate = useNavigate();

  return (
    <Container>
      <Button
        onClick={() => {
          localStorage.removeItem("id");
          navigate("/login");
        }}
        variant="contained"
      >
        Log Out
      </Button>
    </Container>
  );
}
