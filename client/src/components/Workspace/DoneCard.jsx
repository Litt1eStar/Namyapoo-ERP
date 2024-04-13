import React from "react";
import {
  Button,
  Typography,
  CardActions,
  CardContent,
  Stack,
} from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DoneCard = ({
  workspace_name,
  status,
  workspace_id,
  date
}) => {
  const navigate = useNavigate();

  async function handleNavigateToTransactionPage(workspace_id){
    const transaction_res = await fetch(
      `/api/transaction/getFrom/${workspace_id}`
    );
    const transaction = await transaction_res.json();
    if (transaction.error) throw new Error(transaction.error);
    navigate(`/transaction/${transaction._id}`);
  }

  const handleClick = async () => {
    try {
      const res = await fetch(`/api/workspace/${workspace_id}`);
      const workspace = await res.json();
      if (workspace.error) throw new Error(workspace.error);

      handleNavigateToTransactionPage(workspace._id);

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography sx={{ fontSize: 50 }} color="text.secondary" gutterBottom>
            สถานะ:{" "}
            <span className={`text-base text-green-500`}>
              {status==="done" && "สำเร็จ"}
              {status==="not_done" && "ไม่สำเร็จ"}
              {status==="in_progress" && "ระหว่างดำเนินการ"}
            </span>
          </Typography>
          <Typography variant="h6">{date}</Typography>
        </Stack>
        <Typography sx={{ mb: 1.5, fontSize: 70 }} color="text.secondary">
          {workspace_name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" onClick={handleClick}>
          เปิด
        </Button>
      </CardActions>
    </>
  );
};

export default DoneCard;
