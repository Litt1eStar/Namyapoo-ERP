import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Stack, Card, Button, Divider } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import DoneCard from "../components/Workspace/DoneCard";
import toast from 'react-hot-toast'

const WorkspaceHistory = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const navigate = useNavigate();
  const fetchWorkspaceFromDB = async () => {
    try {
      const res = await fetch("/api/workspace/getAllWorkspace");
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      const workspace_Done = data.filter(data => {return data.status === 'done'})
      setWorkspaces(workspace_Done);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    fetchWorkspaceFromDB();
  }, [])
  
  return (
    <>
      <Stack width="100%" direction="row" justifyContent='center'>
        <Button
          color="inherit"
          sx={{ width: "40%" }}
          onClick={() => navigate("/")}
        >
          <HomeIcon />
        </Button>
      </Stack>
      <Divider sx={{ marginBottom: 3, backgroundColor: "lightgray" }}></Divider>
      <Stack height="auto" pt="30px" overflow="auto" gap="40px">
        {workspaces?.map((workspace) => (
          <Card variant="outlined" key={workspace._id}>
            <DoneCard
              workspace_name={workspace.name}
              status={workspace.status}
              workspace_id={workspace._id}
              date={
                new Date(workspace.createdAt).toLocaleDateString('th-TH', {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                })
              }
            />
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default WorkspaceHistory;
