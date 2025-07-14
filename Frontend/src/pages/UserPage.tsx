import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  Stack,
  Container,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function UserPage() {
  const dummyBlogs = [
    {
      id: "1",
      title: "Embrace Simplicity",
      synopsis:
        "Discover how slowing down and focusing on what matters can transform your daily life.",
      featuredImg: "https://placeimg.com/300/180/nature",
      author: { firstName: "stewart", lastName: "rumble" },
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "How to Stay Inspired as a Writer",
      synopsis:
        "Tips and habits to help you stay creative and consistent in your writing journey.",
      featuredImg: "https://placeimg.com/300/180/tech",
      author: { firstName: "mastig", lastName: "Drec" },
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "The Art of Meaningful Routines",
      synopsis:
        "Explore the power of daily rituals and how they build momentum in your personal growth.",
      featuredImg: "https://placeimg.com/300/180/branch",
      author: { firstName: "Jae", lastName: "sig" },
      createdAt: new Date().toISOString(),
    },
  ];

 
  const guest = {
    firstName: "Guest",   
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) setUser(storedUser);
  }, []);


  const activeUser = user || guest;
  
  const initials = `${activeUser.firstName[0]}`;

  return (
    <Box
      sx={{
        minHeight: "70vh",
        backgroundImage: "linear-gradient(to right, white, white)",
        px: 4,
        py: 4,
      }}
    >
      <Container>
      
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Avatar sx={{ bgcolor: "#6d4c41", width: 40, height: 40 }}>
            {initials}
          </Avatar>
          <Typography
            variant="h6"
            fontWeight="bold"
            fontFamily="cursive"
            color="black"
          >
            Welcome back, {activeUser.firstName}
          </Typography>
        </Box>


        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          mb={4}
          sx={{ fontFamily: "cursive" }}
        >
          <Card sx={{ flex: 1, bgcolor: "#f5f5f5", borderRadius: "16px" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="black" fontFamily={'cursive'}>
                <ArticleIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Continue writing, let your creative juices flow
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/newBlog"
                sx={{
                  mt: 2,
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: "12px",
                  textTransform: "none",
                  backgroundColor: "#819067",
                }}
              >
                Create New Blog
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/Blogs"
                sx={{
                  mt: 2,
                  marginLeft: "30px",
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: "12px",
                  textTransform: "none",
                  backgroundColor: "#819067",
                }}
              >
                Check out all blogs
              </Button>
            </CardContent>
          </Card>
        </Stack>

        <Box>
          <Typography
            variant="h5"
            fontWeight="medium"
            mb={3}
            fontFamily="cursive"
            color="black"
          >
            Recent Blogs
          </Typography>

          <Stack
            direction="row"
            flexWrap="wrap"
            gap={3}
            useFlexGap
            justifyContent="flex-start"
          >
            {dummyBlogs.map((blog) => (
              <Box
                key={blog.id}
                sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}
              >
                <BlogCard blog={blog} />
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default UserPage;
