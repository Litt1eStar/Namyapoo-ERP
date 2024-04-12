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
} from "@mui/material";
import toast from 'react-hot-toast'

import { options } from "./BarChart_options";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [accData, setAccData] = useState({
    total_value: [],
    total_margin: [],
    total_profit: [],
  })

  const data = {
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
        label: "ต้นทุน",
        data: accData ? accData.total_margin : null,
        backgroundColor: ["#99CCFF"], // Blue color for positive margin, pink for negative margin
        borderColor: ["#99CCFF"],  
        borderWidth: 4,
      },
      {
        label: "กำไร",
        data: accData ? accData.total_profit : null,
        backgroundColor: ["green"], // Green for positive profit, red for negative profit
        borderColor: ["green"],  
        borderWidth: 4,
      },
      {
        label: "ยอดขาย",
        data: accData ? accData.total_value : null,
        backgroundColor: "#FF6633", // Orange color for sales
        borderColor: "#FF6633",
  
        borderWidth: 4,
      },
    ],
  };


  const fetchAccountData = async() => {
    try {
      const res = await fetch(`/api/accounting/getData/all/${Number(year)}`);
      const data = await res.json();
      if(data.error) throw new Error(data.error)
      setAccData(data)
    } catch (error) {
      toast.error(error)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchAccountData();
  }
  useEffect(()=>{
    fetchAccountData();
  }, [])
  return (
    <>
      <div style={{ height: "1500px", width: '100%' }}>
        <Stack direction="row" mt={3} mx={'40%'}>
          <TextField
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            sx={{
              width: 150,
            }}
          />
          <Button variant="outlined" color="inherit" sx={{ ml: 3 }} onClick={handleSearch}>
            <SearchIcon />
          </Button>
        </Stack>
        <Bar options={options} data={data} />
      </div>
    </>
  );
};

export default BarChart;
