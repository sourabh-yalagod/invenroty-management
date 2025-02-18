import { PrismaClient, Products } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

const getProducts = async (req: Request, res: Response) => {
  try {
    const search = req?.body?.search?.toString();
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search ? search : "",
        },
      },
    });
    if (!products) {
      res.status(401).json({ message: "Products not Found.", success: false });
      return;
    }
    res.status(201).json({
      message: "Products Found successfully",
      success: true,
      products,
    });
    return;
  } catch (error) {
    res.status(501).json({
      message: "Products Fetchign internal server Error......!",
      success: false,
    });
    return;
  }
};
const createProduct = async (req: Request, res: Response) => {
  const { name, price, rating, stockQuantity, productId } = req.body;
  const product = await prisma.products.create({
    data: { name, price, rating, stockQuantity, productId },
  });
  res.status(201).json({ product });
  return;
};
export { getProducts, createProduct };
