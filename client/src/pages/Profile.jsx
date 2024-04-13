import React from "react";
import { Avatar, Stack, Typography, Button } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();
 
  const handleLogout = () => {
    setAuthUser(null)
    Cookies.remove("token");
    navigate('/login')
  }
  return (
    <Stack width="100%" height="100%" direction="column">
      <Button
        variant="text"
        color="inherit"
        onClick={() => navigate("/")}
        sx={{ width: "100%", marginBottom: "40px" }}
      >
        <HomeIcon />
      </Button>
      <Avatar
        src={`https://avatar.iran.liara.run/public/boy?username=${authUser.username}`}
        sx={{ width: 400, height: 400, marginX: "auto" }}
      />
      <Typography variant="h5" sx={{ marginX: "auto", marginTop: 10 }}>
        Hi, {authUser ? authUser.username : Cookies.get("token").username}
      </Typography>
      <Button
        color="warning"
        variant="contained"
        sx={{ width: "20%", marginX: "auto", marginTop: 10 }}
        onClick={handleLogout}
      >
        Log Out
      </Button>
      <Button
        color="secondary"
        variant="contained"
        sx={{ width: "20%", marginX: "auto", marginTop: 5}}
        onClick={()=>navigate('/accountment')}
      >
        บัญชีร้านค้า
      </Button>
      <Button
        color="inherit"
        variant="contained"
        sx={{ width: "22%", marginX: "auto", marginTop: 5}}
        onClick={()=>navigate('/history/workspace')}
      >
        ประวัติธุรกรรม
      </Button>
      <Button
        color="success"
        variant="contained"
        sx={{ width: "23%", marginX: "auto", marginTop: 5}}
        onClick={()=>navigate('/dashboard/accounting')}
      >
        Dashboard (การเงิน)
      </Button>
      <Button
        color="primary"
        variant="contained"
        sx={{ width: "23%", marginX: "auto", marginTop: 5}}
        onClick={()=>navigate('/dashboard/stock')}
      >
        Dashboard (สินค้า)
      </Button>

    </Stack>
  );
};

export default Profile;
