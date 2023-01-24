import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/prisma";
import { Brand } from "../../../node_modules/.prisma/client/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Brand[]>
) {
  if (req.method === "GET") {
    try {
      const brands = await prisma.brand.findMany();
      res.status(200).json(brands);
    } catch (error) {
      console.log(error);
    }
  }
}
