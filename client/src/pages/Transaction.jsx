import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
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
      const currentDate = new Date();
      // Format the date as desired (e.g., "April 10, 2024")
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      if (data.error) throw new Error(data.error);

      const acc_res = await fetch(`/api/accounting/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formattedDate,
          total_value: Number(transactions.totalMargin) + Number(sales),
          total_margin: transactions.totalMargin,
        }),
      });
      const acc_data = await acc_res.json();
      if (acc_data.error) throw new Error(acc_data.error);

      navigate("/");
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
      <Stack width="50%" mt={10} mx="auto" gap={5}>
        <TextField
          label="ยอดขาย"
          value={sales}
          onChange={(e) => setSales(e.target.value)}
        />
        <Button variant="contained" color="success" onClick={handleDone}>
          DONE
        </Button>
      </Stack>
    </>
  );
};

export default Transaction;

function formattedDate(date) {
  const dateObject = new Date(date);

  const day = dateObject.getUTCDate().toString().padStart(2, "0");
  const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = dateObject.getUTCFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}
