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

const OrderModal = ({ workspace_id, fetchOrderFromDb }) => {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  }
  const handleSubmit = async() => {
    setOpen(false);
    setQuantity("");
    try {
      await createOrder();
      await fetchOrderFromDb();
    } catch (error) {
      toast.error(error.message)
    }
  };

  const createOrder = async () => {
    try {
      const res = await fetch(`/api/order/create/${workspace_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: order._id,
          product_name: order.name,
          margin_per_unit: order.margin_per_unit,
          quantity: Number(quantity),
        }),
      });
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
      <Button variant="text" color="inherit" onClick={()=>navigate('/')} sx={{ width: '100%', marginBottom: '20px'}}>
        <HomeIcon />
      </Button>
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
          <FormControl>
            <InputLabel id="product-label">สินค้า</InputLabel>
            <Select
              labelId="product-label"
              id="product"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              label="Product"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {products?.map((product) => (
                <MenuItem value={product} key={product._id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            placeholder="จำนวนสินค้า"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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

export default OrderModal;
