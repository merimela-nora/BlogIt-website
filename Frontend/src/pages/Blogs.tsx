import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Avatar,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

type Blog = {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  featuredImg: string;
  dateCreated: string; 
  author: {
    firstName: string;
    lastName: string;
  };
};

function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5454");
        setBlogs(res.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

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
        <Typography
          variant="h5"
          fontWeight="medium"
          mb={3}
          fontFamily="cursive"
          color="black"
        >
          All Blogs
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap"
          gap={3}
          useFlexGap
          justifyContent="flex-start"
        >
         {blogs.map((blog) => {
  const initials = `${blog.author.firstName[0]}`;
  const date = new Date(blog.dateCreated).toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

            return (
              <Box
                key={blog.id}
                sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}
              >
                <Card sx={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={blog.featuredImg}
                    alt={blog.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{blog.title}</Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {blog.synopsis}
                    </Typography>

                    <Stack direction="row" spacing={1} mt={2} alignItems="center">
                      <Avatar sx={{ bgcolor: "#6d4c41", width: 40, height: 40 }}>
                        {initials}
                      </Avatar>
                      <Box>
                        <Typography variant="caption" display="block">
                          By {blog.author.firstName} {blog.author.lastName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {date}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      component={Link}
                      to={`/blogsDetails/${blog.id}`}
                      variant="outlined"
                    >
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}

export default Blogs;
