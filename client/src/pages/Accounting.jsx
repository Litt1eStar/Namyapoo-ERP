import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Stack,
  Box,
  Typography,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCard from "../components/Account/AccountCard";
import toast from "react-hot-toast";

const monthData = [
  { display: "มกราคม", value: "January" },
  { display: "กุมภาพันธ์", value: "February" },
  { display: "มีนาคม", value: "March" },
  { display: "เมษายน", value: "April" },
  { display: "พฤษภาคม", value: "May" },
  { display: "มิถุนายน", value: "June" },
  { display: "กรกฎาคม", value: "July" },
  { display: "สิงหาคม", value: "August" },
  { display: "กันยายน", value: "September" },
  { display: "ตุลาคม", value: "October" },
  { display: "พฤศจิกายน", value: "November" },
  { display: "ธันวาคม", value: "December" },
];

const Accounting = () => {
  const [accountItems, setAccountItems] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const handleFilter = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/accounting/filterDate/${month}/${year}`);
      const data = await res.json();

      if (data.error) throw new Error(data.error);
      setAccountItems(data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await fetch(`/api/accounting/getAll`);
        const data = await res.json();
        if (data.error) throw new Error(`Failed to fetch Data`);

        setAccountItems(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchTransaction();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Button
          color="inherit"
          sx={{ width: "50px", mx: "45%", mb: "10px" }}
          onClick={() => navigate("/")}
        >
          <HomeIcon />
        </Button>
        <Stack width="100%" mx="15%" mb={5}>
          <Typography variant="h5">บัญชีรายได้ร้าน Namyapoo Maesri</Typography>
        </Stack>
        <Stack width="40%" textAlign="center" mx="auto" mb={5} direction="row">
          <FormControl fullWidth>
            <InputLabel id="filter-month">เดือน</InputLabel>
            <Select
              labelId="filter-month"
              id="filter-month-select"
              value={month}
              label="Month"
              onChange={(e) => setMonth(e.target.value)}
              sx={{ pt: 0 }}
            >
              {monthData.map((data) => (
                <MenuItem key={data.value} value={data.value}>
                  {data.display}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="ปี"
            type="number"
            value={year}
            sx={{ width: "350px" }}
            onChange={(e) => setYear(e.target.value)}
          ></TextField>
          <Button sx={{ ml: 5, width: 200 }} onClick={handleFilter}>
            ค้นหา
          </Button>
        </Stack>
        <Stack>
          {accountItems?.map((item) => (
            <AccountCard
              key={item._id}
              date={item.date}
              total_value={item.total_value}
            />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default Accounting;
