const cloudinary = require("cloudinary").v2;
import { type imageRemove } from "@/components/admin/ProductForm";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  publicId: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { publicId } = req.body;
    try {
      await cloudinary.uploader.destroy(publicId);
      res.status(200).json({ publicId });
    } catch (error) {
      console.log(error);
    }
  }
}
