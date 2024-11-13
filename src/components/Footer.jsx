import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  p: 4,
  bgcolor: 'white',
}

export default function Footer(params) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <footer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            About us
          </Typography>
        </Box>
      </Modal>
        <div className="footer-container">
          <div className="footer-copyright">
            &#169; 2024
          </div>
          <div>
            <Link onClick={handleOpen} style={{textDecoration: 'none'}}>About Us</Link>
          </div>
          <div></div>
        </div>
      </footer>
    </>
  ) 
}
