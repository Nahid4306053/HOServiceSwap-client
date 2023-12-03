import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import React from "react";
import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import notfounddata from "../../assets/No Data-Found.json";
import SmallLoading from "../../components/shared/SmallLoading";
import SmallError from "../../components/shared/smallError";
import TableRow from "./TableRow";
export default function MyBookings() {
  const axios = useAxios();
  const {
    data: mybookings,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const res = axios.get("/my-bookings");
      return res;
    },
  });

  return (
    <div className="container mx-auto mt-40">
      <h1 className="text-4xl  text-green-600  font-Montserrat font-semibold">
        My Bookings:
      </h1>
      {isLoading ? (
        <div className="my-20">
          <SmallLoading></SmallLoading>
        </div>
      ) : isError ? (
        <div className="my-20">
          <SmallError></SmallError>
        </div>
      ) : mybookings.data && mybookings.data.length > 0 ? (
        <div className={`overflow-x-auto p-10 my-20 bg-green-100  rounded-lg`}>
          {/* bg-sky-200 */}
          <table className="table">
            {/* head */}
            <thead className="text-xl text-green-600">
              <tr>
                <th>Service Banner</th> <th>Provider</th> <th>Service Name</th>
                <th>Price</th> <th>Status</th> <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {mybookings.data.map((ele) => {
                if (
                  ele.servicedata &&
                  Object.keys(ele?.servicedata).length > 0
                ) {
                  return <TableRow ele={ele} people="provider"></TableRow>;
                }
              })}
            </tbody>
            {/* foot */}
          </table>
        </div>
      ) : (
        <div className="my-20 text-center">
          <Lottie className="max-w-3xl md:-mt-20 mx-auto" animationData={notfounddata}></Lottie>
          <h1 className="text-3xl  md:-mt-14  mx-auto">No data found </h1>
          <Link to="/services">
            <button className="btn bg-green-600 hover:bg-green-600 mt-5 text-white px-10">
              Visit services Page
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
