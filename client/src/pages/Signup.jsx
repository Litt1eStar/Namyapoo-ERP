import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form) return;

    try {
      const res = await fetch("/api/auth/signup", {
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
      navigate('/login')
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Box pt="10%">
      <Stack width="80%" mx="auto" gap="30px">
        <Typography mx="auto" variant="h3">
          Sign Up
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
        <TextField
          id="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          value={form?.confirmPassword}
          onChange={(e) => setForm({ ...form, [e.target.id]: e.target.value })}
        />
        <Button onClick={handleSubmit}>
          <Typography>Signup</Typography>
        </Button>
        <Typography mx="auto">
          มีบัญชีแล้ว
          <span
            className="text-blue-400 font-medium underline"
            onClick={() => navigate("/login")}
          >
            คลิกเพื่อเข้าสู่ระบบ
          </span>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Signup;
