import Image from "next/image";
import ProductForm from "./ProductForm";
import { useQuery } from "react-query";
import { Product } from "@prisma/client";

const Products = () => {
  const { data, status } = useQuery("Products", () =>
    fetch("/api/admin/getproducts").then((res) => res.json())
  );

  return (
    <div className="flex h-full gap-4 justify-between items-center">
      {status === "loading" ? (
        "Loading..."
      ) : (
        <div className=" sb rounded-3xl py-4 p-2 overflow-y-scroll h-full w-[25%] bg-sky-700 items-start  gap-4">
          <ul>
            <button className="flex py-1 bg-sky-200 rounded-3xl justify-center items-center w-full mb-4">
              <Image src={"/plus.png"} alt="plus" width={40} height={40} />
            </button>
            {data.map((item: Product, index: number) => {
              return (
                <li
                  className="rounded-xl text-center my-2 bg-sky-300 w-full px-4 py-2"
                  key={index}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="w-full p-4 h-full bg-sky-700 rounded-3xl">
        <ProductForm />
      </div>
    </div>
  );
};

export default Products;
