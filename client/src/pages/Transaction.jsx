import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Transaction = () => {
  const { transaction_id } = useParams();
  const [transactions, setTransactions] = useState(null);
  const [sales, setSales] = useState("");
  const [expenses, setExpenses] = useState("");
  const navigate = useNavigate();
  const fetchTransactoin = async () => {
    try {
      const res = await fetch(`/api/transaction/${transaction_id}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setTransactions(data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDone = async () => {
    try {
      const res = await fetch(
        `/api/workspace/updateStatus/${transactions.workspace_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isDone: true }),
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const currentDate = new Date();

      const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      const acc_res = await fetch(`/api/accounting/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formattedDate,
          total_value: Number(sales),
          total_margin: Number(transactions.totalMargin) + Number(expenses),
        }),
      });
      const acc_data = await acc_res.json();
      if (acc_data.error) throw new Error(acc_data.error);

      const transaction_res = await fetch(
        `/api/transaction/${transactions._id}`,
        {
          method: "PUT",
        }
      );
      const transaction_data = await transaction_res.json();
      if (transaction_data.error)
        throw new Error("Failed to update status of Transaction");

      const transaction_sales_res = await fetch(
        `/api/transaction/sales/${transactions._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sale: Number(sales), other_expenses: expenses }),
        }
      );
      const transaction_sales_data = await transaction_sales_res.json();
      if (transaction_sales_data.error)
        throw new Error(transaction_sales_data.error);

      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };
  console.log(transactions);
  useEffect(() => {
    fetchTransactoin();
  }, []);
  return (
    <>
      <Button
        variant="text"
        color="inherit"
        onClick={() => navigate("/")}
        sx={{ width: "100%", marginBottom: "40px" }}
      >
        <HomeIcon />
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ชื่อสินค้า</TableCell>
              <TableCell align="right">จำนวน</TableCell>
              <TableCell align="right">ต้นทุนต่อหน่วย</TableCell>
              <TableCell align="right">ต้นทุนอิงจากจำนวณ</TableCell>
            </TableRow>
          </TableHead>
          {transactions && (
            <Typography pl={2} pt={2}>
              ค่าพื้นที่: {transactions.area_price}
            </Typography>
          )}
          <TableBody>
            {transactions?.orders.map((order) => (
              <TableRow
                key={order._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.product_name}
                </TableCell>
                <TableCell align="right">{order.quantity}</TableCell>
                <TableCell align="right">{order.margin_per_unit}</TableCell>
                <TableCell align="right">{order.totalMargin}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell component="th" scope="row">
                ต้นทุนทั้งหมด
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right">{transactions?.totalMargin}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {!transactions?.status && (
        <Stack width="50%" mt={10} mx="auto" gap={5}>
          <TextField
            label="ยอดขาย"
            value={sales}
            onChange={(e) => setSales(e.target.value)}
          />
          <TextField
            label="ค่าใช้จ่ายอื่นๆ"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
          />
          <Button variant="contained" color="success" onClick={handleDone}>
            DONE
          </Button>
        </Stack>
      )}

      {transactions?.status && (
        <Box width="100%" mx="10%" mt={10}>
          <Typography variant="h4" color="darkorange">
            Transaction นี้สำเร็จแล้ว
          </Typography>
          <Typography variant="h5" color="black" fontWeight={500}>
            ยอดขาย: {transactions.sale.toLocaleString()} บาท
          </Typography>
          <Typography variant="h6" color="black" fontWeight={400}>
            ต้นทุนทั้งหมด: {transactions.totalMargin.toLocaleString()} บาท
          </Typography>
          <Typography variant="h6" color="black" fontWeight={400}>
            กำไร:{" "}
            {(transactions.sale - transactions.totalMargin).toLocaleString()}{" "}
            บาท
          </Typography>
          <Typography variant="h6" color="black" fontWeight={400}>
            ค่าใช้จ่ายอื่นๆ: {transactions.other_expenses.toLocaleString()} บาท
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Transaction;
