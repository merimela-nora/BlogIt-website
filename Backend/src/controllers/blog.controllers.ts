import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cloudinary from "../utilis/cloudinary"; 

const client = new PrismaClient();
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, synopsis, content } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let featuredImg = "";

    
    if (req.file) {
      const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "blogs",
            resource_type: "image",
          },
          (error, result) => {
            if (error || !result) return reject(error);
            resolve(result as { secure_url: string });
          }
        );

        stream.end(req.file!.buffer);
      });

      featuredImg = result.secure_url;
    } else {
      return res.status(400).json({ message: "Image file is required." });
    }

    
    const blog = await client.blog.create({
      data: {
        title,
        synopsis,
        content,
        featuredImg,
        authorId: userId,
      },
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).json({ message: "Failed to create blog" });
  }
};


export const getAllBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await client.blog.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        dateCreated: "desc",
      },
    });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};


export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const blog = await client.blog.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog" });
  }
};


export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    const existing = await client.blog.findUnique({
      where: { id },
    });

    if (!existing || existing.authorId !== userId) {
      return res.status(403).json({ message: "Unauthorized or blog not found" });
    }

    const updatedBlog = await client.blog.update({
      where: { id },
      data: {
        ...req.body,
        lastUpdated: new Date(),
      },
    });

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog" });
  }
};


export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    const existing = await client.blog.findUnique({
      where: { id },
    });

    if (!existing || existing.authorId !== userId) {
      return res.status(403).json({ message: "Unauthorized or blog not found" });
    }

    await client.blog.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog" });
  }
};
