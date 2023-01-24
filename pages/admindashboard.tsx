import { GetServerSideProps, type NextPage } from "next";
import { removeCookies, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import getUser from "@/db/getUser";
import Sidebar from "@/components/admin/Sidebar";
import Products from "@/components/admin/Products";
import { type Admin } from "@prisma/client";
import Script from "next/script";
import { type optionsType } from "../components/admin/CategoriesC";
import axios from "axios";
import { Category } from "@prisma/client";
import { createContext, useState } from "react";
import { Brand } from "@prisma/client";
export type brandContextType = {
  brands: Brand[];
  categories: Category[];
  selectedCategories: optionsType[];
  setSelectedCategories: (c: optionsType[]) => void;
  selectedBrand: Brand;
  setSelectedBrand: (c: Brand) => void;
} | null;

export const BrandContext = createContext<brandContextType>(null);

const admindashboard: NextPage<{
  user: Admin;
  brandsData: Brand[];
  categoryData: Category[];
}> = ({ user, brandsData, categoryData }) => {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>(brandsData);
  const [selectedBrand, setSelectedBrand] = useState<Brand>(brandsData[0]);
  const [categories, setCategories] = useState<Category[]>(categoryData);
  const [selectedCategories, setSelectedCategories] = useState<optionsType[]>(
    []
  );
  const signOutHandler = () => {
    removeCookies("token");
    router.push("/");
  };
  return (
    <BrandContext.Provider
      value={{
        brands,
        selectedBrand,
        setSelectedBrand,
        selectedCategories,
        setSelectedCategories,
        categories,
      }}
    >
      <div className="grid grid-cols-12 grid-rows-6 gap-4 p-2 h-screen">
        <div className="row-span-1 p-4 flex justify-between items-center col-span-12 rounded-3xl bg-sky-900">
          <h1 className="font-bold text-lg py-1 px-4 rounded-lg bg-sky-200">
            Profile : {user.username}
          </h1>
          <button
            className="py-2 px-8 rounded-lg text-white bg-rose-800"
            onClick={() => signOutHandler()}
          >
            Sign Out
          </button>
        </div>
        <div className="col-span-2 row-span-5 rounded-3xl p-4 bg-sky-200">
          <Sidebar />
        </div>
        <div className="col-span-10 row-span-5 p-2 bg-sky-500 rounded-3xl ">
          <Products />
        </div>
      </div>
    </BrandContext.Provider>
  );
};

export default admindashboard;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await getUser(req, res);
  const domain = process.env.DOMAIN;
  const { data: brandsData } = await axios.get(`${domain}/api/admin/getbrands`);
  const { data: categoryData } = await axios.get(
    `${domain}/api/admin/getcategories`
  );

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin",
      },
      props: {},
    };
  }
  if (!brandsData) {
    return {
      props: {},
    };
  }
  return {
    props: {
      user,
      brandsData,
      categoryData,
    },
  };
};
