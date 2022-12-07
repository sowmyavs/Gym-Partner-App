import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Fab, Grid, Modal, Typography } from "@mui/material";
import { useState } from "react";

export default function ImagePreview(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  const deleteImage = async () => {
    const imageIndex = props.image.charAt(props.image.length - 5);
    const resp = await fetch(
      `/image/${localStorage.getItem("id")}/${imageIndex}`,
      { method: "DELETE" }
    );   
    props.setImages(props.imageArr.filter((img, idx) => idx !== props.index));
  };

  return (
    <Grid item xs={4}>
      <img
        alt="profile image"
        src={props.image}
        style={{ width: 120, margin: 2 }}
      />
      <Fab sx={{ bottom: 100, left: 50 }} size="small" onClick={handleOpen}>
        <ClearIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: 2 }}
          >
            Remove this image from your profile?
          </Typography>
          <Grid item xs={12}>
            <img
              alt="profile image"
              src={props.image}
              style={{ width: 120, marginHorizontal: 100 }}
            />
          </Grid>
          <Button
            sx={{ marginRight: 2, marginTop: 2 }}
            variant="contained"
            color="error"
            onClick={deleteImage}
          >
            Remove
          </Button>
          <Button
            sx={{ marginLeft: 2, marginTop: 2 }}
            variant="contained"
            color="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
}
