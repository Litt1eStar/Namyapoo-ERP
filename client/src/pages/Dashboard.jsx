import { Stack, Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import {useNavigate} from 'react-router-dom'
import BarChart from "../components/Graph/BarChart";

const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <>
      <Stack height="100%" alignItems="center" justifyContent="flex-start">
        <Button color="inherit" onClick={()=>navigate("/")}>
          <HomeIcon />
        </Button>
        <BarChart />
      </Stack>
    </>
  );
};

export default Dashboard;
