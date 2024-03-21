import {
  Stack,
  Card,
} from "@mui/material";
import WorkspaceModal from "../components/Workspace/WorkspaceModal";
import CustomCard from "../components/Workspace/card";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [form, setForm] = useState({name: ""});
  const fetchWorkspaceFromDB = async() => {
    try {
      const res = await fetch('/api/workspace/getAllWorkspace');
      const data = await res.json();
      if(data.error){
        throw new Error(data.error)
      }
      setWorkspaces(data)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const createWorkspace = async() => {
    if(form.name==="") return

    try {
      const res = await fetch('/api/workspace/create', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })  
      const data = await res.json();
      if(data.error){
        throw new Error(data.error)
      }
      fetchWorkspaceFromDB()
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    fetchWorkspaceFromDB()
  }, [])
  return (
    <>
      <WorkspaceModal createWorkspace={createWorkspace} setForm={setForm} form={form}/>
      <Stack height="auto" pt="30px" overflow="auto" gap='40px'>
        {workspaces?.map((workspace) => (          
          <Card variant="outlined" key={workspace._id} >
            <CustomCard workspace_name={workspace.name} status={workspace.status} workspace_id={workspace._id} fetchWorkspaceFromDB={fetchWorkspaceFromDB}/>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default Home;
