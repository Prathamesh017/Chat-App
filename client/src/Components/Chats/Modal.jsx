import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

export function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let loggedUser = JSON.parse(localStorage.getItem("user"));

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
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              textAlign: "center",
              marginTop: "-20px",
              marginBotton: "20px",
            }}
          >
            {loggedUser.name}
          </Typography>
          <img src={loggedUser.image} width="50px" alt="pt"></img>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Email:<br></br>
            {loggedUser.email}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

// export default BasicModal;
