import {
    Box,
    Button,
    TextField,
    Typography,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Stack,
  } from "@mui/material";
  import HomeIcon from '@mui/icons-material/Home';
  import Modal from "@mui/material/Modal";
  import { useEffect, useState } from "react";
  import toast from "react-hot-toast";
  import { useNavigate } from "react-router-dom";
  
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
  
  const InventoryModal = ({ fetchProductFromDb }) => {
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState([]);

    const [name, setName] = useState("");
    const [margin_per_unit, setMarginPerUnit] = useState("");
  
    const navigate = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
    }
    const handleSubmit = async() => {
      setOpen(false);
      setName("")
      setMarginPerUnit("")
      try {
          await createProduct();
        
          await fetchProductFromDb();
          toast.success("Create new Product")
        } catch (error) {
          toast.error(error.message)
      }
    };
  
    const createProduct = async () => {
      try {
        const res = await fetch('/api/product/create',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, margin_per_unit })
        })
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        
        toast.success(`Create new Order`)
      } catch (error) {
        toast.error(error.message);
      }
    };
  
    const fetchProductFromDB = async () => {
      try {
        const res = await fetch("/api/product/getAllProduct");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setProducts(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
  
    useEffect(() => {
      if (open) fetchProductFromDB();
    }, [open]);
    return (
      <>
        <Stack direction='row'>
          <Button variant="text" color="inherit" onClick={()=>navigate('/')} sx={{ width: '50%', marginBottom: '30px'}}>
            <HomeIcon />
          </Button>
          <Button color="inherit" sx={{ width: '50%'}} onClick={()=>navigate('/history/stock')}>History</Button>
        </Stack>
      
        <Button variant="outlined" color="info" onClick={handleOpen} sx={{ width: '100%'}}>
          Create
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Stack sx={style}>
            
            <TextField
              placeholder="ชื่อสินค้า"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              placeholder="ต้นทุนต่อหน่วย"
              value={margin_per_unit}
              onChange={(e) => setMarginPerUnit(e.target.value)}
            />
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
          </Stack>
        </Modal>
      </>
    );
  };
  
  export default InventoryModal;
  