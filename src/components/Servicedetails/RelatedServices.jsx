import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../Hooks/useAxios";
import SmallLoading from "../shared/SmallLoading";
import SmallError from "../shared/smallError";
import Servicecard from "../shared/Servicecard";
import notfounddata from '../../assets/No Data-Found.json'
import Lottie from "lottie-react";
export default function RelatedServices({ reldata }){
  const axios = useAxios();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["relatedservice", reldata.category],
    queryFn: async () => {
      const res = await axios.get(`/related-services/${reldata.id}?category=${reldata.category}`);
      return res;
    },
    enabled: reldata.category ? true : false,
  });
  console.log(data);
  return (
    <>
      {reldata.category && (
        <div className="grid mt-14 grid-cols-2 gap-10 lg:grid-cols-3 md:grid-cols-2">
          {isLoading ? (
            <div className="colspan-3">
              <SmallLoading></SmallLoading>
            </div>
          ) : isError ? (
            <div className="colspan-3">
              <SmallError></SmallError>
            </div>
          ) : data.data && data.data.length > 0 ? (
            data.data.map((ele) => {
              return <Servicecard service={ele}></Servicecard>;
            })
          ) : (
            <div className="col-span-3  flex flex-col justify-center items-center">
              <Lottie className="max-w-3xl md:-mt-10 mx-auto" animationData={notfounddata}></Lottie>
             <h1 className="text-3xl  md:-mt-14  mx-auto">No data found </h1>
            </div>
          )}
        </div>
      )}
    </>
  );
}
