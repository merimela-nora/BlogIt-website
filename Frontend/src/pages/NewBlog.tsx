import {
  TextField,
  Typography,
  Button,
  Stack,
  Container,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewBlog() {
  const [form, setForm] = useState({
    title: "",
    synopsis: "",
    content: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("synopsis", form.synopsis);
    formData.append("content", form.content);
    formData.append("image", selectedFile); 

    try {
      const response = await axios.post("http://localhost:5454/blogs", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        
        },
      });

      if (response.status === 201) {
        navigate("/blogs");
      }
    } catch (err) {
      console.error("Error submitting blog:", err);
      alert("Error creating blog");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h4" mb={2}>
        Create a New Blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Synopsis"
            name="synopsis"
            value={form.synopsis}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Content"
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            fullWidth
            multiline
            minRows={7}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ maxHeight: "200px", borderRadius: "8px" }}
            />
          )}
          <Button type="submit" variant="contained" size="large">
            Publish Blog
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default NewBlog;
