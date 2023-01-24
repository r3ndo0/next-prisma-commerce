import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/prisma";
import { Category } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category[]>
) {
  if (req.method === "GET") {
    try {
      const categories = await prisma.category.findMany();
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
    }
  }
}
