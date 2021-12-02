import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function MarketInfo(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Market Info</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.name.slice(4)}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Address: {props.details.Address}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Products: {props.details.Products}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Schedule: {props.details.Schedule}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
