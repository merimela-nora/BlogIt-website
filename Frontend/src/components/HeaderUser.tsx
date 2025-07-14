 
import { AppBar, Toolbar, Typography, Button, Stack,IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#B1AB86", color: "#fff" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/userPage"
          sx={{ textDecoration: "none", color: "#fff" }}
        >
          BlogIt 
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
            <>
            <IconButton 
            color="inherit" 
            component={Link}
             to="/userPage">
                <HomeIcon/> 
            </IconButton>
            <Button color="inherit" component={Link} to="/blogs">
                Posts
              </Button>
              <Button color="inherit" component={Link} to="/newBlog">
                New Blog
              </Button>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              <Button color="inherit"  onClick={handleLogout}>
                Logout
              </Button>
            </>
          
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
