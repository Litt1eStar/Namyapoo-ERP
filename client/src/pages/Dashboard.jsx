import { Stack, Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import {useNavigate} from 'react-router-dom'
// Define a styled component with the blur effect
const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <>
      <Stack height="100%" alignItems="center" justifyContent="flex-start">
        <Button color="inherit" onClick={()=>navigate("/")}>
          <HomeIcon />
        </Button>

        <Stack direction="row" width="90%" gap={5} mt={5}>
          {/* Apply blur effect to this container */}
          <Stack
            width="40%"
            height='200px'
            borderRadius={16}
            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
            bgcolor="rgba(255, 255, 255, 0.53)"
            border="1px solid rgba(255, 255, 255, 0.3)"
            display="flex"
            alignItems="center"
            pt={7}
            sx={{
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
            }}
          >
            <Typography variant="h6" color="InfoText">
              จำนวน SKU : 17
            </Typography>
          </Stack>

          <Stack
            width="60%"
            height='300px'
            borderRadius={16}
            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
            bgcolor="rgba(255, 255, 255, 0.53)"
            border="1px solid rgba(255, 255, 255, 0.3)"
            display="flex"
            alignItems="center"
            pt={4}
            sx={{
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
            }}
          >
            <Typography variant="h5" color="InfoText">
              ยอดขาย : 15,000 ฿
            </Typography>
            <Stack direction='row' gap={1} mt={2}>
                <Button variant="contained" color="inherit">Day</Button>
                <Button variant="contained" color="inherit">Week</Button>
                <Button variant="contained" color="inherit">Month</Button>
                <Button variant="contained" color="inherit">Year</Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Dashboard;
