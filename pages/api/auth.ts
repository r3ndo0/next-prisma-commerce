import type { NextApiRequest, NextApiResponse } from "next";
import { Admin } from "../../node_modules/.prisma/client/index";
import jwt from "jsonwebtoken";
import { setCookies } from "cookies-next";

// import { prisma } from "../../db/prisma";
import { PrismaClient } from "@prisma/client";

type Data = {
  // username?: string;
  // password?: string;
  message: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username, password } = req.body;
  if (req.method === "POST") {
    const admin = await prisma.admin.findUnique({
      where: {
        credentials: {
          username,
          password,
        },
      },
    });
    if (admin) {
      const token = jwt.sign(
        { userId: admin.id },
        process.env.TOKEN_SECRET as string,
        {
          expiresIn: "1d",
        }
      );
      setCookies("token", token, {
        req,
        res,
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });
      res.status(200).json({ message: "Success" });
    }
  }
}
