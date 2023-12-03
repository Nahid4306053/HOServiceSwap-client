import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../Hooks/useAxios";
import Servicecard from "../shared/Servicecard";
import SmallLoading from "../shared/SmallLoading";
import SmallError from "../shared/smallError";
import useAos from "../../Hooks/useAos";

export default function PopularServiceSection() {
  const axios = useAxios();
  useAos()
  const {
    data: PopularServices,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popularservice"],
    queryFn: async () => {
      const res = axios.get("/popular-service");
      return res;
    },
  });

  return (
    <div className="container mx-auto my-20">
      <div data-aos="fade-right" className="title mb-24 font-Montserrat space-y-3 font-semibold">
        <span className="text-lg">Most Rated Services</span>
        <h1 className="text-5xl font-bold text-green-600">Popular Services</h1>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 lg:gap-5 gap-10 xl:gap-10">
        {isLoading ? (
          <div className="col-span-3">
            <SmallLoading></SmallLoading>
          </div>
        ) : isError ? (
          <div className="col-span-3">
            <SmallError></SmallError>
          </div>
        ) : (
          PopularServices.data.length > 0 &&
          PopularServices.data.map((ele) => {
            return <Servicecard service={ele} key={ele._id}></Servicecard>;
          })
        )}
      </div>
    </div>
  );
}
