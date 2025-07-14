import { Request, Response, NextFunction } from "express";

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
export default verifyUserInformation;
