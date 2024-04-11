import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import { Stack, Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCard from "../components/Account/AccountCard";
import toast from 'react-hot-toast'
const Accounting = () => {
  const [accountItems, setAccountItems] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchTransaction = async () => {
      try {
        const res = await fetch(`/api/accounting/getAll`);
        const data = await res.json();
        if(data.error) throw new Error(`Failed to fetch Data`)
        
        setAccountItems(data)
      } catch (error) {
        toast.error(error.message);
      }
    }
    
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
        <Button color="inherit" sx={{ width: '50px', mx: '45%', mb: '10px'}} onClick={()=>navigate('/')}>
          <HomeIcon />
        </Button>
        <Stack width="100%" mx="15%" mb={5}>
          <Typography variant="h5">บัญชีรายได้ร้าน Namyapoo Maesri</Typography>
        </Stack>
        
        <Stack>
          {accountItems?.map((item)=> (
            <AccountCard key={item._id} date={item.date} total_value={item.total_value}/>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default Accounting;
