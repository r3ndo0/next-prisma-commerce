import React, { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useContext } from "react";
import {
  BrandContext,
  type brandContextType,
} from "../../pages/admindashboard";
import { Category } from "@prisma/client";

const CategoriesC = () => {
  const data = useContext(BrandContext);
  const categories = data?.categories as Category[];
  // const selectedCategories = data?.selectedBrand
  const convertedData = refactorCategories(categories);
  const setSelectedCategories = data?.setSelectedCategories as (
    c: optionsType[]
  ) => void;
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelectedCategories(selected);
  }, [selected]);
  return (
    <div className=" h-10 w-full max-w-full">
      {/* <pre>{JSON.stringify(selected)}</pre> */}
      <MultiSelect
        hasSelectAll={false}
        options={convertedData}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
};

export default CategoriesC;
export type optionsType = {
  label: string;
  value: string;
  id: string;
};

function refactorCategories(categories: Category[]): optionsType[] {
  const singleCategory = categories.map((category) => {
    return {
      label: category.name,
      value: category.name,
      id: category.id,
    };
  });
  return singleCategory;
}
