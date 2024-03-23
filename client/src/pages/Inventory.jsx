import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import InventoryModal from "../components/Inventory/InventoryModal";

const Inventory = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [products, setProducts] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [modalProductName, setModalProductName] = useState("");
  const [modalProductAmount, setModalProductAmount] = useState("");
  const [modelProductMargin, setModalProductMargin] = useState("");
  const [editingProductId, setEditingProductId] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchProductFromDb = async () => {
    try {
      const res = await fetch("/api/product/getAllProduct");
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setProducts(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleOpenModal = async (product) => {
    handleOpen();
    setModalProductName(product.name);
    setModalProductAmount(product.amount);
    setEditingProductId(product._id);
    setModalProductMargin(product.margin_per_unit);
  };

  const handleEdit = async () => {
    try {
      const res = await fetch(`/api/product/edit/${editingProductId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          n_name: modalProductName,
          n_margin: Number(modelProductMargin),
          n_amoung: Number(modalProductAmount),
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      handleClose();
      await fetchProductFromDb();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProductFromDb();
  }, []);

  return (
    <>
      <InventoryModal fetchProductFromDb={fetchProductFromDb} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>สินค้า</TableCell>
              <TableCell align="right">ต้นทุนต่อหน่วย</TableCell>
              <TableCell align="right">จำนวณ</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.margin_per_unit}</TableCell>
                <TableCell align="right">{product.amount}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleOpenModal(product)}>
                    แก้ไข
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            label="ชื่อสินค้า"
            value={modalProductName}
            onChange={(e) => setModalProductName(e.target.value)}
            sx={{ width: "100%", marginBottom: 5 }}
          />
          <TextField
            label="ต้นทุนต่อหน่วย"
            placeholder="ชื่อสินค้า"
            value={modelProductMargin}
            onChange={(e) => setModalProductMargin(e.target.value)}
            sx={{ width: "100%", marginBottom: 5 }}
          />
          <TextField
            label="จำนวน"
            value={modalProductAmount}
            onChange={(e) => setModalProductAmount(e.target.value)}
            sx={{ width: "100%", marginBottom: 5 }}
          />
          <Button
            variant="outlined"
            color="info"
            sx={{ width: "100%" }}
            onClick={handleEdit}
          >
            ยืนยัน
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Inventory;
