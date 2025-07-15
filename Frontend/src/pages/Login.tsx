import { useState } from "react";
import {
  Box,
  TextField,
  Stack,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios"; 

interface LoginDetails {
  identifier: string;
  password: string;
}

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["login_users"],
    mutationFn: async (loginDetails: LoginDetails) => {
      const response = await axiosInstance.post("https://blogit-website-5.onrender.com/auth/login", loginDetails);
      return response.data;
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || "Unknown error occurred";
        setFormErrors(msg);
      } else {
        setFormErrors("Something went wrong");
      }
    },
    onSuccess: (data) => {
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        localStorage.removeItem("user");
      }
      navigate("/UserPage");
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors("");
    mutate({ identifier, password });
  };

  return (
    <Box
  component="section"
  sx={{
    margin: "4rem auto",
    maxWidth: "500px",
    background: "linear-gradient(145deg, #f5f5f5, #ffffff)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    borderRadius: "20px",
    p: 5,
    textAlign: "center",
  }}
>
  <form onSubmit={handleLogin}>
    {formErrors && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {formErrors}
      </Alert>
    )}

    <Typography variant="h5" fontWeight="600" color="#37474f" mb={3}>
       Welcome back to <span style={{ color: "#819067" }}>BlogIt</span>
    </Typography>

    <Stack spacing={3}>
      <TextField
        label="Username or Email"
        required
        fullWidth
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        sx={{ backgroundColor: "#f9f9f9", borderRadius: "10px" }}
      />
      <TextField
        label="Password"
        type="password"
        required
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ backgroundColor: "#f9f9f9", borderRadius: "10px" }}
      />

      <Button
        variant="contained"
        type="submit"
        disabled={isPending}
        sx={{
          mt: 1,
          py: 1.5,
          fontWeight: "bold",
          borderRadius: "12px",
          backgroundColor: "#819067",
          transition: "all 0.3s",
          '&:hover': {
            backgroundColor: "#6d7b59",
          },
        }}
      >
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </Stack>
  </form>

  <Typography mt={4} fontSize="0.9rem" color="text.secondary">
    No account?{" "}
    <a href="/signUp" style={{ color: "#819067", textDecoration: "none", fontWeight: "bold" }}>
      Create one
    </a>
  </Typography>
</Box>

  );
}

export default Login;
