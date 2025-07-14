import { Box, Paper, TextField, Stack, Button, Typography, Alert } from '@mui/material';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["registering_users"],
    mutationFn: async (newUser: User) => {
      const response = await axios.post("https://blog-it-website-mapa.vercel.app/auth/register", newUser);
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
onSuccess: () => {
  navigate("/login")
}




  });

  function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormErrors('');
    const newUser = { firstName, lastName, email, username: userName, password };
    mutate(newUser);
  }

  return (
    <Box
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
  <form onSubmit={handleSignUp}>
    {formErrors && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {formErrors}
      </Alert>
    )}

    <Typography variant="h5" fontWeight="600" color="#37474f" mb={3}>
       Join <span style={{ color: "#819067" }}>BlogIt</span>
    </Typography>

    <Stack spacing={3}>
      <TextField
        label="First Name"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        sx={{ backgroundColor: "#f9f9f9", borderRadius: "10px" }}
      />
      <TextField
        label="Last Name"
        required
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        sx={{ backgroundColor: "#f9f9f9", borderRadius: "10px" }}
      />
      <TextField
        label="Username"
        required
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        sx={{ backgroundColor: "#f9f9f9", borderRadius: "10px" }}
      />
      <TextField
        label="Email Address"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ backgroundColor: "#f9f9f9", borderRadius: "10px" }}
      />
      <TextField
        label="Password"
        type="password"
        required
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
        {isPending ? "Signing Up..." : "Sign Up"}
      </Button>
    </Stack>
  </form>

  <Typography mt={4} fontSize="0.9rem" color="text.secondary">
    Already have an account?{" "}
    <a href="/login" style={{ color: "#819067", textDecoration: "none", fontWeight: "bold" }}>
      Login here
    </a>
  </Typography>
</Box>

  );
}

export default SignUp;
