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
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StockHistory = () => {
  const [stockHistorys, setStockHistorys] = useState([]);
  const navigate = useNavigate();

  const fetchProductFromDb = async () => {
    try {
      const res = await fetch("/api/stock-history/getAll");
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setStockHistorys(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProductFromDb();
  }, []);

  return (
    <>
      <Button
        variant="text"
        color="inherit"
        onClick={() => navigate("/")}
        sx={{ width: "100%", marginBottom: "20px" }}
      >
        <HomeIcon />
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ชื่อสินค้า</TableCell>
              <TableCell align="right">ประเภท</TableCell>
              <TableCell align="right">จำนวณ</TableCell>
              <TableCell align="right">วันที่สร้าง</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockHistorys.map((history) => (
              <TableRow
                key={history._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  ":hover": {
                    border: "2px solid black",
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {history.product_name}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: `${
                      history.stock_type === "Import" ? "green" : "red"
                    }`,
                  }}
                >
                  {history.stock_type}
                </TableCell>
                <TableCell align="right">{history.amount}</TableCell>
                <TableCell align="right">{history.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StockHistory;
