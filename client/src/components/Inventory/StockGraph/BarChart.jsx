import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import SearchIcon from "@mui/icons-material/Search";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Button,
  TextField,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box
} from "@mui/material";
import toast from "react-hot-toast";

import { options } from "./BarChart_options";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

const BarChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState("January");
  const [accData, setAccData] = useState({
    total_value: [],
    total_margin: [],
    total_profit: [],
  });
  const [product, setProduct] = useState("all");
  const [products, setProducts] = useState([]);
  const [accDataMonth, setAccDataMonth] = useState(null);
  const [graphType, setGraphType] = useState("year");
  const yearData = {
    labels: [
      "ม.ค",
      "ก.พ",
      "มี.ค",
      "เม.ย",
      "พ.ค",
      "มิ.ย",
      "ก.ค",
      "ส.ค",
      "ก.ย",
      "ต.ค",
      "พ.ย",
      "ธ.ค",
    ],
    datasets: [
      {
        label: "จำนวนสินค้าที่ขาย (หน่วย)",
        data: accData ? accData : null,
        backgroundColor: ["#99CCFF"], // Blue color for positive margin, pink for negative margin
        borderColor: ["#99CCFF"],
        borderWidth: 4,
      },
    ],
  };

  const month_data = {
    labels: ["สัปดาห์ที่ 1", "สัปดาห์ที่ 2", "สัปดาห์ที่ 3", "สัปดาห์ที่ 4"],
    datasets: [
      {
        label: "จำนวนสินค้าที่ขาย (หน่วย)",
        data: accDataMonth ? accDataMonth : null,
        backgroundColor: ["#99CCFF"], // Blue color for positive margin, pink for negative margin
        borderColor: ["#99CCFF"],
        borderWidth: 4,
      },
    ],
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

  const fetchYearData = async () => {
    try {
      const res = await fetch(`/api/stock-history/getData/${Number(year)}/${product}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAccData(data);
    } catch (error) {
      toast.error(error);
    }
  };
  const fetchMonthData = async () => {
    try {
      const res = await fetch(
        `/api/stock-history/getDataFromMonthAndYear/${month}/${year}/${product}`
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAccDataMonth(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log(accDataMonth)
  const handleSearch = (e) => {
    e.preventDefault();
    switch (graphType) {
      case "year":
        fetchYearData();
        break;
      case "month":
        fetchMonthData();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    fetchProductFromDB();
    switch (graphType) {
      case "year":
        fetchYearData();
        break;
      case "month":
        fetchMonthData();
        break;
      default:
        break;
    }
  }, []);

  useEffect(()=>{
    fetchProductFromDB();
    switch (graphType) {
      case "year":
        fetchYearData();
        break;
      case "month":
        fetchMonthData();
        break;
      default:
        break;
    }
  }, [product, graphType])
  return (
    <>
      <div style={{ height: "1500px", width: "100%" }}>
        <Stack direction="row" mt={3} mx={"40%"} width="100%">
          {graphType === "year" ? (
            <TextField
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              sx={{
                width: 150,
              }}
            />
          ) : (
            <>
              <TextField
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                sx={{
                  width: 150,
                }}
              />
              <FormControl>
                <InputLabel id="product-label">Month</InputLabel>
                <Select
                  labelId="month-label"
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  label="Month"
                  sx={{ width: 200 }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {monthData?.map((month) => (
                    <MenuItem key={month.value} value={month.value}>
                      {month.display}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          <Button
            variant="outlined"
            color="inherit"
            sx={{ ml: 3 }}
            onClick={handleSearch}
          >
            <SearchIcon />
          </Button>
          <ToggleButtonGroup
            color="primary"
            value={graphType}
            exclusive
            onChange={(e) => setGraphType(e.target.value)}
            aria-label="Platform"
          >
            <ToggleButton value="year" onClick={() => setMonth("")}>
              Year
            </ToggleButton>
            <ToggleButton value="month">Month</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Box sx={{ width: '30%', mx: 'auto', mt: 5 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Product</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={product}
              label="Age"
              onChange={(e)=>{
                setProduct(e.target.value)
              }}
              sx={{ pt: 2}}
            >
                <MenuItem value="all">ทั้งหมด</MenuItem>
              {products?.map(product => (
                <MenuItem key={product._id} value={product.name} >{product.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {graphType === "year" && <Bar options={options} data={yearData} />}
        {graphType === "month" && <Bar options={options} data={month_data} />}
      </div>
    </>
  );
};

export default BarChart;
