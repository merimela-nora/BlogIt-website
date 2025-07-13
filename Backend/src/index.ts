import express, { Express, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import zxcvbn from "zxcvbn";

const app: Express = express();
const client = new PrismaClient();

app.use(express.json());

function verifyUserInformation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { firstName, lastName, email, username, password } = req.body;

  if (!firstName) {
    res.status(400).json({ message: "first name is required" });
    return;
  }
  if (!lastName) {
    res.status(400).json({ message: "last name is required" });
    return;
  }
  if (!email) {
    res.status(400).json({ message: "email address is required" });
    return;
  }
  if (!username) {
    res.status(400).json({ message: "username is required" });
    return;
  }
  if (!password) {
    res.status(400).json({ message: "password is required" });
    return;
  }
  next();
}

function validatePasswordStrength(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { password } = req.body;
  const result = zxcvbn(password);

  if (result.score < 3) {
    res.status(400).json({ message: "please choose strong password" });
    return;
  }
  next();
}

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

app.post(
  "/auth/register",
  verifyUserInformation,
  CheckUserNameAndEmail,
  validatePasswordStrength,
  async (req, res) => {
    try {
      const { firstName, lastName, email, username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await client.user.create({
        data: {
          firstName,
          lastName,
          email,
          username,
          password: hashedPassword,
        },
      });
      res.status(201).json({ message: "user created successfully" });
    } catch (error) {
      res.status(500).json({ message: "user not found" });
    }
  },
);

// home route
app.get("/", (_req, res) => {
  res.send("<h1> welcome to BlogIt api</h1>");
});

// server
const port = process.env.PORT || 5454;

app.listen(port, () => console.log(`the app is running on ${port}`));
