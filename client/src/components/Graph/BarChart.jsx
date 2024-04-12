import React, { useState } from "react";
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
  const [year, setYear] = useState("");

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
        label: "Steps By Pedro",
        data: [3000, 5000, 4500, 6000, 8000, 7000, 9000],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };

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
          <Button variant="outlined" color="inherit" sx={{ ml: 3 }}>
            <SearchIcon />
          </Button>
        </Stack>
        <Bar options={options} data={data} />
      </div>
    </>
  );
};

export default BarChart;
