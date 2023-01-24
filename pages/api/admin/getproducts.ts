import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/prisma";
import { Product } from "../../../node_modules/.prisma/client/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
    }
  }
}
