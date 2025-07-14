import { Request, Response, NextFunction } from "express";
import zxcvbn from "zxcvbn";

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
export default validatePasswordStrength;
