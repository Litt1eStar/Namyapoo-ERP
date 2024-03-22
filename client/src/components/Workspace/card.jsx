import React from "react";
import {
  Button,
  Typography,
  CardActions,
  CardContent,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CustomCard = ({ workspace_name, status, workspace_id, fetchWorkspaceFromDB }) => {
    const navigate = useNavigate();
    const handleDelete = async() => {
        try {
            const res = await fetch(`/api/workspace/delete/${workspace_id}`, {
                method: "DELETE"
            })

            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            fetchWorkspaceFromDB();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleClick = async() => {
      try {
        const res = await fetch(`/api/workspace/${workspace_id}`);
        const workspace = await res.json();
        if(workspace.error) 
          throw new Error(workspace.error)

        if(workspace.status){
          const transaction_res = await fetch(`/api/transaction/getFrom/${workspace._id}`);
          const transaction = await transaction_res.json();
          if(transaction.error)
            throw new Error(transaction.error)
          navigate(`/transaction/${transaction._id}`)
        }
        else if(!workspace.status)
          navigate(`/workspace/${workspace_id}`)
        
      } catch (error) {
        toast.error(error.message)
      }
    }
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
            <span className={`text-${status ? "green" : "red"}-500 text-base`}>
              {status ? "สำเร็จ" : "ไม่สำเร็จ"}
            </span>
          </Typography>
          <Button sx={{ marginRight: "20px", width: "100px" }} color="inherit" onClick={handleDelete}>
            <DeleteIcon />
          </Button>
        </Stack>
        <Typography sx={{ mb: 1.5, fontSize: 70 }} color="text.secondary">
          {workspace_name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" onClick={handleClick}>เปิด</Button>
      </CardActions>
    </>
  );
};

export default CustomCard;
