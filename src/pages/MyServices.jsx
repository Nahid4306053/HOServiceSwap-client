import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Lottie from "lottie-react";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Pagetitle from "../Hooks/Pagetitle";
import ScrollTop from "../Hooks/ScrollTop";
import useAxios from "../Hooks/useAxios";
import notfounddata from "../assets/No Data-Found.json";
import SmallLoading from "../components/shared/SmallLoading";
import SmallError from "../components/shared/smallError";
export default function MyServices() {
  ScrollTop(0, 0);
  const queryClient = useQueryClient();
  const axios = useAxios();
  const {
    data: myServices,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["my-services"],
    queryFn: async () => {
      const res = axios.get("/my-services");
      return res;
    },
  });
  const deleteService = useMutation({
    mutationFn: async (dsid) => {
      const res = await axios.delete(`/my-service/${dsid}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-services"] });
      Swal.fire({
        title: "Deleted!",
        text: "Your service has been deleted.",
        icon: "success",
      });
    },
    onError: () => {
      toast.error("Data Delete failed Due to servcer side error");
    },
  });

  const handeldelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "If you delete this service all of your this service bookings will be cancel",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteService.mutate(id);
      }
    });
  };
  return (
    <div className="container mx-auto mt-40">
      <Pagetitle>My Services | HoServiceSwap</Pagetitle>
      <h1 className="text-4xl  text-green-600  mt-20 font-Montserrat font-semibold">
        My services:
      </h1>
      {isLoading ? (
        <div className="my-20">
          <SmallLoading></SmallLoading>
        </div>
      ) : isError ? (
        <div className="my-20">
          <SmallError></SmallError>
        </div>
      ) : myServices.data && myServices.data.length > 0 ? (
        <div className={`overflow-x-auto p-10 my-20 bg-green-100  rounded-lg`}>
          {/* bg-sky-200 */}
          <table className="table">
            {/* head */}
            <thead className="text-xl">
              <tr>
                <th>Service Banner</th> <th>Ctegorey</th> <th>Name</th>
                <th>Price</th> <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myServices.data.map((ele) => {
                return (
                  <tr className="text-lg">
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask bg-white rounded-lg  w-32 h-20">
                            <img src={ele.thumbnailurl} alt="service banner" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{ele.category}</td>
                    <td>{ele.servicename}</td>
                    <td className="whitespace-nowrap font-Montserrat font-medium">
                      ${ele.price}
                    </td>
                    <th className="grid lg:flex   lg:mt-5 gap-2 items-center">
                      <Link to={`/service-details/${ele._id}`}>
                        <button
                          data-tip="View details"
                          className="btn-info ml-2  tooltip btn btn-sm"
                        >
                          <i className="fa-solid fa-eye"></i>
                        </button>
                      </Link>
                      <Link to={`/update-service/${ele._id}`}>
                        <button
                          data-tip="Update Details"
                          className="btn-secondary ml-2 tooltip btn btn-sm"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </Link>
                      <a>
                        <button
                          onClick={() => handeldelete(ele._id)}
                          data-tip="Delete"
                          className="btn-error ml-2 tooltip btn btn-sm"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </a>
                    </th>
                  </tr>
                );
              })}
            </tbody>
            {/* foot */}
          </table>
        </div>
      ) : (
        <div className="mb-20 text-center">
          <Lottie
            className="max-w-3xl md:-mt-20 mx-auto"
            animationData={notfounddata}
          ></Lottie>
          <h1 className="text-3xl  md:-mt-14  mx-auto">No data found </h1>
          <Link to="/add-service">
            <button className="btn bg-green-600 hover:bg-green-600 mt-5 text-white px-10">
              Add service
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
