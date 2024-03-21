import { Box, Button, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const WorkspaceModal = ({createWorkspace, setForm, form}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () =>{ 
    createWorkspace();
    setOpen(false)
    setForm({name: ""})
  }
  return (
    <>
      <Button onClick={handleOpen} sx={{ marginLeft: "90%" }}>
        Create
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField sx={{ width: "100%" }} placeholder="พิมพ์ชื่อ workspace" value={form.name} onChange={(e)=>setForm({name: e.target.value})} />
          <Button
            variant="contained"
            color="inherit"
            sx={{
              width: "30%",
              marginTop: "20px",
              marginLeft: "35%",
              marginRight: "30%",
            }}
            onClick={handleSubmit}
          >
            ยืนยัน
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default WorkspaceModal;
