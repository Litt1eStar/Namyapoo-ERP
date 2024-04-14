import {
  Box,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const LeftOverPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState({});
    const [amount, setAmount] = useState("");
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

  const handleUpdate = async() => {
    try {
        const res = await fetch(`/api/product/updateProductAmountByType/${order._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({type: "import", newAmount: Number(amount)})
        })
        const data = await res.json();
        if(data.error) throw new Error(data.error)
    } catch (error) {
        toast.error(error.message)
    }
  }
  console.log(amount);
  
  useEffect(()=>{
    fetchProductFromDB();
  }, [])

  console.log(order);
  
  return (
    <Stack
      width="50%"
      height="100%"
      justifyContent="center"
      mx='auto'
    >
        <Button onClick={()=>navigate('/')}><HomeIcon /></Button>
      <FormControl>
        <InputLabel id="product-label">สินค้า</InputLabel>
        <Select
          labelId="product-label"
          id="product"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          placeholder="Product"
          sx={{ width: '100%'}}
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
      <TextField placeholder="จำนวน" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
      <Button onClick={handleUpdate}>Update</Button>
    </Stack>
  );
};

export default LeftOverPage;
