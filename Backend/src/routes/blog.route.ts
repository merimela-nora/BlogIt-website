import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controllers";

import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadImage"; 

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);


router.post("/", authMiddleware, upload.single("image"), createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
