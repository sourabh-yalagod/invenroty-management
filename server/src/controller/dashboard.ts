import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

interface Item {
  date: Date;
  expenseSummaryId: string;
  expenseByCategoryId: string;
  category: string;
  amount: bigint;
}
export const getDashboardMatrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const popularProducts = await prisma.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: "desc",
      },
    });
    const salesSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const purchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
      {
        take: 5,
        orderBy: {
          date: "desc",
        },
      }
    );
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
      (item: Item) => ({
        ...item,
        amount: item.amount.toString(),
      })
    );

    res.status(201).json({
      popularProducts,
      salesSummary,
      expenseByCategorySummary,
      expenseSummary,
      purchaseSummary,
    });
    return;
  } catch (error) {
    res.status(501).json({ message: "Dashboard Query failed....!" });
  }
};
