import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  const [form, setForm] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form) return;

    try {
      const res = await fetch("/api/auth/login", {
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

      setAuthUser(data);
      setForm(null);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Box pt="10%">
      <Stack width="80%" mx="auto" gap="30px">
        <Typography mx="auto" variant="h3">
          Login
        </Typography>
        <TextField
          id="username"
          placeholder="Username"
          value={form?.username}
          onChange={(e) => setForm({ ...form, [e.target.id]: e.target.value })}
        />
        <TextField
          id="password"
          placeholder="Password"
          type="password"
          value={form?.password}
          onChange={(e) => setForm({ ...form, [e.target.id]: e.target.value })}
        />
        <Button onClick={handleSubmit}>
          <Typography>Login</Typography>
        </Button>
        <Typography mx="auto">
          ยังไม่มีบัญชี
          <span
            className="text-blue-400 font-medium underline"
            onClick={() => navigate("/signup")}
          >
            คลิกเพื่อสมัคร
          </span>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Login;
