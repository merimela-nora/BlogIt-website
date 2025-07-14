import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Avatar,
    Box,
    Stack,
  } from "@mui/material";
  import { Link } from "react-router-dom";

type Blog = {
  id: string;
  title: string;
  synopsis: string;
  featuredImg?: string;
  dateCreated?: string;
  createdAt?: string;
  author: {
    firstName: string;
    lastName: string;
  };
};

interface BlogCardProps {
  blog: Blog;
}

 function BlogCard({ blog }) {
    const initials =
      blog.author?.firstName?.[0]?.toUpperCase() +
      blog.author?.lastName?.[0]?.toUpperCase();
  
    return (
      <Card
        component={Link}
        to={`/blogs/${blog.id}`}
        sx={{
          textDecoration: "none",
          color: "inherit",
          borderRadius: 4,
          boxShadow: 3,
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": { boxShadow: 6 },
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={'/1.jpg'}
         
        />
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {blog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {blog.synopsis}
          </Typography>
  
          <Stack direction="row" alignItems="center" spacing={1} mt={2}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "#1976d2" }}>
              {initials}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight="medium">
                {blog.author?.firstName} {blog.author?.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(blog.dateCreated || blog.createdAt).toDateString()}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  }
  
  export default BlogCard;
