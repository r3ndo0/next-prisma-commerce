import { getCookie } from "cookies-next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "./prisma";
import { type Admin } from "@prisma/client";

// import { type CookieValueTypes } from "../node_modules/cookies-next/lib/index";

export default async function getUser(req: any, res: any) {
  const token = getCookie("token", { res, req }) as string;
  if (token) {
    try {
      const { userId } = jwt.verify(
        token,
        process.env.TOKEN_SECRET as string
      ) as JwtPayload;

      let user = await prisma.admin.findUnique({
        where: {
          id: userId,
        },
      });
      user = JSON.parse(JSON.stringify(user)) as Admin;
      const { password, ...userData } = user;

      return userData;
    } catch (error) {
      console.log(error);
      return null;
    }
  } else {
    return;
  }
}
