import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Alert,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import useUser from "../hooks/UseUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const user = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (ee: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateInfo = async () => {
    try {
      const res = await axios.put("/api/auth/update", formData, {
        withCredentials: true,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      setSuccess("Info updated successfully!");
      setError("");
    } catch (err) {
      setError("Failed to update info.");
      setSuccess("");
    }
  };

  const updatePassword = async () => {
    if (!passwordData.currentPassword) {
      return setError("Please fill in current password.");
    }
    if (!passwordData.newPassword) {
      return setError("Please fill in the new password.");
    }

    try {
      await axios.patch(
        "/api/auth/update-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        { withCredentials: true }
      );
      setSuccess("Password updated!");
      setError("");
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setError("Incorrect current password.");
      setSuccess("");
    }
  };


  const initials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase()
    : "U";

  return (
    <Box maxWidth="xl" mx="20px" mt={2} mb={3}>
  <Box display="flex" alignItems="center" gap={1} mb={3}>
    <Avatar sx={{ bgcolor: "#6d4c41", width: 50, height: 50 }}>
      {initials}
    </Avatar>
    <Typography variant="h6" fontWeight="bold">
      Manage Your Account
    </Typography>
  </Box>

  
  <Stack direction="row" spacing={3} flexWrap="wrap">

    <Card sx={{ bgcolor: "#f5f5f5", borderRadius: "13px", p: 2, flex: 1, minWidth: 200 }}>
      <CardContent>
        <Typography variant="h6" mb={1}>
          <SettingsIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Update Info
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInfoChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInfoChange}
            fullWidth
          />
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInfoChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInfoChange}
            fullWidth
          />
          <Button variant="contained" onClick={updateInfo}>
            Save Changes
          </Button>
        </Stack>
      </CardContent>
    </Card>

    
    <Card sx={{ bgcolor: "#f5f5f5", borderRadius: "16px", p: 2, flex: 1, minWidth: 300 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          🔐 Change Password
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Current Password"
            name="currentPassword"
            type="password"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            fullWidth
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            fullWidth
          />
          <Button variant="contained" onClick={updatePassword}>
            Update Password
          </Button>
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 3 }}>
          {success}
        </Alert>
      )}
        
        </Stack>
      </CardContent>
    </Card>
  </Stack> 
    </Box>
  );
}

export default Profile;
