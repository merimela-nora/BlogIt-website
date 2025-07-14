import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.authenticationToken || 
      req.header("Authorization")?.replace("Bearer ", ""); 

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;


    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
    };

    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};