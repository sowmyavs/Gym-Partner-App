import React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Container from "@mui/material/Container";
import { Button, Input, InputLabel, TextField } from "@mui/material";

export default function Survey() {
  return (
    <div>
      <Container>
        <form>
          <TextField name="name" label="Name" type="text"></TextField>
          {/* <FormControl>
            <FormLabel> Name</FormLabel>
            <Input  type="text" />
          </FormControl> */}
          <FormControl>
            <Button variant="contained" component="label">
              Add Images
              <input type="file" hidden />
            </Button>
          </FormControl>
        </form>
      </Container>
    </div>
  );
}
