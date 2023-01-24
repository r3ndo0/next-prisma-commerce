import { prisma } from "@/db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [i1, i2, i3] = req.body.images;
  const { pId } = req.body;
  if (req.method === "POST") {
    try {
      const firstImage = await prisma.image.create({
        data: {
          url: i1.url,
          productId: pId,
        },
      });
      const secondImage = await prisma.image.create({
        data: {
          url: i2.url,
          productId: pId,
        },
      });
      const lastImage = await prisma.image.create({
        data: {
          url: i3.url,
          productId: pId,
        },
      });
      res.status(200).json({ firstImage, secondImage, lastImage });
    } catch (e) {
      console.log(e);
    }
  }
}
