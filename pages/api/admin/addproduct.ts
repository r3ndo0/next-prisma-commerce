import { prisma } from "@/db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { Brand, Product } from "@prisma/client";
import { Image } from "@prisma/client";
import { type Data } from "@/components/admin/ProductForm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const images = req.body.images;
  //   const [i1, i2, i3] = images;
  //   const imagesUrls = [i1.url, i2.url, i3.url];

  const {
    name,
    color,
    quantity,
    price,
    brandId,
    categoriesId,
  }: {
    name: string;
    color: string;
    quantity: number;
    price: number;
    brandId: string;
    categoriesId: { id: string }[];
  } = req.body;

  if (req.method === "POST") {
    {
      try {
        const response = await prisma.product.create({
          data: {
            name,
            color,
            price,
            quantity,
            brandId,

            categories: {
              connect: categoriesId,
            },
          },
        });
        res.status(200).json(response);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
