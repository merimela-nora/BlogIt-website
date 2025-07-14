import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function CheckUserNameAndEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, email } = req.body;
  const userFirst = await client.user.findFirst({ where: { username } });

  if (userFirst) {
    res.status(400).json({ message: "username already in use" });
    return;
  }

  const emailFirst = await client.user.findFirst({ where: { email } });

  if (emailFirst) {
    res.status(400).json({ message: "email address already in use" });
    return;
  }

  next();
}

export default CheckUserNameAndEmail;
