import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../Hooks/useAxios";
import CategoreyCard from "../shared/CategoreyCard";
import SmallLoading from "../shared/SmallLoading";
import SmallError from "../shared/smallError";
import useAos from "../../Hooks/useAos";

export default function CategoreySection() {
  const axios = useAxios();
  useAos()
  const fetchcategory = async () => {
    const res = await axios.get("/categories");
    return res;
  };
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchcategory(),
  });
  return (
    <div className="mt-32 mb-10 container mx-auto">
      <div data-aos="fade-right" className="title mb-28 font-Montserrat space-y-3 font-semibold">
        <span className="text-lg">Our Home Service Categorys</span>
        <h1 className="text-5xl font-bold text-green-600">
          You need it, we've got
        </h1>
      </div>
      {isLoading ? (
        <SmallLoading> </SmallLoading>
      ) : isError ? (
        <SmallError>Try again: {error.message}</SmallError>
      ) : (
        <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          {categories.data.map((ele) => {
            return <CategoreyCard data={ele} key={ele._id}></CategoreyCard>;
          })}
        </div>
      )}
    </div>
  );
}
