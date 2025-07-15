import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function CheckUserNameAndEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, email } = req.body;

  console.log(" Checking username and email uniqueness:", { username, email });

  try {
    const [userFirst, emailFirst] = await Promise.all([
      client.user.findFirst({ where: { username } }),
      client.user.findFirst({ where: { email } }),
    ]);

    if (userFirst) {
      console.log("Username already in use:", username);
      return res.status(400).json({ message: "username already in use" });
    }

    if (emailFirst) {
      console.log(" Email already in use:", email);
      return res.status(400).json({ message: "email address already in use" });
    }

    console.log(" Username and email are unique");
    next();
  } catch (err) {
    console.error(" Error in CheckUserNameAndEmail:", err);
    return res.status(500).json({
      message: "Internal error in CheckUserNameAndEmail",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

export default CheckUserNameAndEmail;
