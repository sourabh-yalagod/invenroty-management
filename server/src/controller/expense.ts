import { PrismaClient, Products } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expensesraw = await prisma.expenseByCategory.findMany({
      orderBy: {
        date: "desc",
      },
    });
    const expenses = expensesraw.map((expense) => ({
      ...expense,
      amount: expense.amount.toString(),
    }));
    res.status(201).json(expenses);
    return;
  } catch (error) {
    res.send(501).json({ message: "Internal server Error.....!" });
  }
};
