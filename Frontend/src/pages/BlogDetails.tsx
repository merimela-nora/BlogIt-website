import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Button,
  Stack,
} from "@mui/material";

type Blog = {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  featuredImg: string;
  author: {
    firstName: string;
    lastName: string;
  };
};

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://blog-it-website-mapa.vercel.app/blogs/${id}`);
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <Typography sx={{ p: 4 }}>Loading...</Typography>;

  const initials = `${blog.author.firstName[0]}${blog.author.lastName[0]}`;

  return (
    <Container sx={{ mt: 6 }}>
      <Box
        component="img"
        src={blog.featuredImg}
        alt={blog.title}
        sx={{
          width: "100%",
          maxHeight: 450,
          objectFit: "cover",
          borderRadius: 2,
          mb: 4,
        }}
      />

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {blog.title}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1} mb={3}>
        <Avatar sx={{ bgcolor: "#6d4c41" }}>{initials}</Avatar>
        <Typography variant="subtitle2">
          By {blog.author.firstName} {blog.author.lastName}
        </Typography>
      </Stack>

      <Typography
        variant="body1"
        sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}
      >
        {blog.content}
      </Typography>

      <Button
        component={Link}
        to="/blogs"
        variant="outlined"
        sx={{ mt: 5 }}
      >
        ← Back to Blogs
      </Button>
    </Container>
  );
}

export default BlogDetail;
