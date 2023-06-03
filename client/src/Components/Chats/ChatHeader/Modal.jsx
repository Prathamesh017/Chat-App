import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import "../chat.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: 200,
    sm: 400,
  },
  height: {
    xs: 200,
    sm: 400,
  },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

export function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let loggedUser = JSON.parse(localStorage.getItem("user"));
  React.useEffect(() => {
    fetchImage();
  }, []);

  async function fetchImage() {
    let image = loggedUser.image;
    if (image.includes("anonymous-avatar")) {
      return setImage(image);
    }
    const res = await fetch(image);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImage(imageObjectURL);
  }

  return (
    <div>
      <Button variant="outlined" size="small" onClick={handleOpen}>
        <span>{<AccountBoxIcon fontSize="25px" />}</span>Profile
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} st>
          <div className="modal">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{
                textAlign: "center",
                marginTop: "-20px",
                marginBotton: "20px",
                textTransform: "capitalize",
              }}
            >
              {loggedUser.name}
            </Typography>
            <img src={image} className="profile-image" alt="pt"></img>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Email:<br></br>
              {loggedUser.email}
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;
