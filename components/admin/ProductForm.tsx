import Image from "next/image";
import { GetServerSideProps, type NextPage } from "next";
import { useState, useEffect } from "react";
import openWidget from "./cloudinaryWidget";
import handleUpload from "./cloudinaryWidget";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import { useContext } from "react";
import { optionsType } from "./CategoriesC";
import { Category, Image as ImageType } from "@prisma/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrandContext,
  type brandContextType,
} from "../../pages/admindashboard";
import { Brand } from "@prisma/client";
import BrandsAC from "./BrandsAC";
import CategoriesAC from "./CategoriesAC";
import CategoriesC from "./CategoriesC";
export type imageRemove = {
  url: string;
};
export type Data = {
  images: ImageType[];
  name: string;
  price: number;
  quantity: number;
  color: string;
  brandData: Brand[];
  categories: string[];
};

const ProductForm = () => {
  const notify = () =>
    toast.success("Product Added ", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const error = () =>
    toast.error("Something went Wront !", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const data = useContext(BrandContext);
  const categories = data?.selectedCategories;
  const brandData = data?.selectedBrand;
  const [images, setImages] = useState<any>([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState<number | undefined>(0);
  const [price, setPrice] = useState<number | undefined>(0);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const chainRequests = () => {
      console.log("func ran !");
      // const { data } = imagesInfo;
      // const imagesId = getImagesId(data);
      const categoriesId = getCategoriesId(categories as optionsType[]);
      const { id: brandId } = brandData as Brand;
      const productRequest = axios.post("/api/admin/addproduct", {
        name,
        price,
        color,
        quantity,
        brandId,
        categoriesId,
      });
      productRequest
        .then((productInfo) => {
          const { data } = productInfo;
          const pId = data.id;
          return axios.post("/api/admin/addimages", { images, pId });
        })
        .then((res) => (res.status === 200 ? notify() : error()));
      return;
    };
    chainRequests();
  };
  async function removeImage(image: { url: string; imageId: string }) {
    const publicId = image.imageId;
    try {
      const res = await axios.post("/api/admin/imageremove", {
        publicId,
      });
      // console.log(res);
      if (res.status === 200) {
        setImages((prev: any) =>
          prev.filter((img: any) => img.imageId !== image.imageId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  function openWidgetHandler() {
    handleUpload(setImages, images);
    // console.log(images);
  }
  // async function getBrands() {
  // }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between h-full"
    >
      <div className="mb-8 text-sm mt-2 w-full h-full flex gap-8 justify-between items-center">
        <div className="flex w-full  flex-col gap-4 justify-between items-center">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Product Name ..."
            className="px-4 w-full rounded-lg h-10"
          ></input>
          <CategoriesC />
          <BrandsAC />
          <input
            onChange={(e) => setColor(e.target.value)}
            type="text"
            placeholder="Product Color..."
            className="px-4 w-full rounded-lg h-10"
          ></input>
          <input
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            type="text"
            placeholder="Product Quantity..."
            className="px-4 w-full rounded-lg h-10"
          ></input>
          <input
            onChange={(e) => setPrice(parseInt(e.target.value))}
            type="text"
            placeholder="Produce Price ..."
            className="px-4 w-full rounded-lg h-10"
          ></input>
        </div>
        <div className="w-full  flex-col gap-4 rounded-3xl text-xl  p-4 flex justify-center items-center bg-sky-200">
          <h1>{images.length > 2 ? "3 is Maximum !" : " Select Images"}</h1>
          <button
            type="button"
            disabled={images.length > 2}
            onClick={() => openWidgetHandler()}
          >
            <Image src={"/plus.png"} alt="plus" width={100} height={100} />
          </button>
          <div className="bg-sky-600 flex justify-center items-center min-h-[150px] gap-8 rounded-3xl py-2  w-full">
            {images.map((image: any, index: any) => {
              return (
                <div>
                  <div
                    onClick={() => removeImage(image)}
                    className="absolute cursor-pointer text-rose-700"
                  >
                    <CgClose size={30} />
                  </div>
                  <img
                    className="w-[100px] h-[100px] rounded-lg"
                    key={index}
                    src={image.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="  font-bold  text-gray-900 hover:bg-green-200  rounded-xl bg-green-300  w-full h-12"
      >
        Submit Product
      </button>
      <ToastContainer />
    </form>
  );
};
export default ProductForm;

function getCategoriesId(arr: optionsType[]): { id: string }[] {
  const newArr = arr.map((a) => {
    return { id: a.id };
  });
  return newArr;
}

// function getImagesId(arr: ImageType[]): { id: string }[] {
//   const newArr = arr.map((a) => {
//     return { id: a.id };
//   });
//   return newArr;
// }
