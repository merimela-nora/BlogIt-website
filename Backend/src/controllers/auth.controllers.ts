import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const client = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
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
};

export const loginUser = async (req:Request, res: Response) =>
{
    try {
        const {identifier, password} = req.body;
      const user= await client.user.findFirst({
     where: {
        OR: [{username: identifier}, {email:identifier}]
     } })
     if (!user) {
        res.status(401).json({message: "incorrect logins"})
        return;
     }
   const passwordsMatch= await bcrypt.compare(password, user.password);

   if (passwordsMatch === false) {
    res.status(401).json({message: "wrong password"})
    return;
   }
   const{password:userPassword, DateJoined,isDeleted , ...userDetails}=user;
   const token = jwt.sign(userDetails, process.env.JWT_SECRET!)
         res.cookie("authenticationToken", token).json(userDetails)
    } catch (error) {
        res.status(500).json({message: "login was unsuccessful"});
    }
}