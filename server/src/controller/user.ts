import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany({ take: 50 });
    if (!users) {
      res.status(401).json({ message: "users not Found.", success: false });
      return;
    }
    res.status(201).json(users);
    return;
  } catch (error) {
    res.status(501).json({
      message: "Products Fetchign internal server Error......!",
      success: false,
    });
    return;
  }
};
