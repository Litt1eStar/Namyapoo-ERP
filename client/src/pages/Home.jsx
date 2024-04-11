import { Stack, Card, Button, Divider } from "@mui/material";
import WorkspaceModal from "../components/Workspace/WorkspaceModal";
import CustomCard from "../components/Workspace/card";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const fetchWorkspaceFromDB = async () => {
    try {
      const res = await fetch("/api/workspace/getAllWorkspace");
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setWorkspaces(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const createWorkspace = async () => {
    if (form.name === "") return;

    try {
      const res = await fetch("/api/workspace/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      await fetchWorkspaceFromDB();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      sessionStorage.removeItem('loggedIn');
      window.location.reload();
    }

    fetchWorkspaceFromDB();
  }, []);

  return (
    <>
      <Stack width='100%' direction='row'>
        <Button color="inherit" sx={{ width: "40%"}} onClick={()=>navigate('/profile')}>{authUser.username}</Button>
        <Button sx={{ width: "50%" }} onClick={()=>navigate('/inventory')}>Inventory Manager</Button>
      </Stack>
      <Divider sx={{ marginBottom: 3, backgroundColor: "lightgray" }}></Divider>
      <WorkspaceModal
        createWorkspace={createWorkspace}
        setForm={setForm}
        form={form}
      />
      <Stack height="auto" pt="30px" overflow="auto" gap="40px">
        {workspaces?.map((workspace) => (
          <Card variant="outlined" key={workspace._id}>
            <CustomCard
              workspace_name={workspace.name}
              status={workspace.status}
              workspace_id={workspace._id}
              fetchWorkspaceFromDB={fetchWorkspaceFromDB}
            />
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default Home;
