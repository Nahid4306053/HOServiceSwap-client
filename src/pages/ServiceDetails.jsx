import { useQuery } from "@tanstack/react-query";
import React from "react";
import Rating from "react-rating";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthnicationContext";
import Pagetitle from "../Hooks/Pagetitle";
import useAxios from "../Hooks/useAxios";
import OtherServices from "../components/Servicedetails/OtherServices";
import RelatedServices from "../components/Servicedetails/RelatedServices";
import ServiceAreas from "../components/Servicedetails/ServiceAreas";
import ServiceBookingModal from "../components/Servicedetails/ServiceBookingModal";
import SmallLoading from "../components/shared/SmallLoading";
import SmallError from "../components/shared/smallError";

export default function ServiceDetails() {
  const { id } = useParams();
  const axios = useAxios();
  const { Cureentuser } = useAuth();
  const ServiceDetails = useQuery({
    queryKey: ["ServiceDetails", id],
    queryFn: async () => {
      const res = await axios.get(`service-details/${id}`);
      return res;
    },
    enabled: id ? true : false,
  });
  return (
    <>
      {ServiceDetails.isLoading ? (
        <div className="mt-40">
          <SmallLoading></SmallLoading>
        </div>
      ) : ServiceDetails.isError ? (
        <div className="mt-40">
          <SmallError></SmallError>
        </div>
      ) : Object.keys(ServiceDetails.data.data).length > 0 ? (
        <>
          <Pagetitle>
            {ServiceDetails.data.data.servicename} | HoServiceSwap
          </Pagetitle>
          <div
            className="hero min-h-[60vh] lg:mt-[150px] mt-32"
            style={{
              backgroundImage: `url(${ServiceDetails.data.data.thumbnailurl})`,
            }}
          >
            <div className="bg-black h-full w-full bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-2xl -mt-20">
                <h1 className="mb-5 text-5xl font-bold">
                  {ServiceDetails.data.data.servicename}
                </h1>
              </div>
            </div>
          </div>
          <div className="container rounded-lg mx-auto mb-20 -mt-20">
            <div className="bg-green-100 p-10 rounded-lg">
              <div className="grid lg:gap-6 grid-cols-12 ">
                <div className="lg:col-span-7 col-span-full">
                  <div className="provider_details">
                    <h2 className="text-2xl mb-4 font-medium font-Montserrat">
                      Provider:
                    </h2>
                    <div className="provider flex items-center gap-4">
                      <img
                        className="avatra h-20 w-20 object-cover rounded-full"
                        src={ServiceDetails.data.data?.provider?.photoURL}
                        alt={ServiceDetails.data.data?.provider?.name}
                      />
                      <div className="text-xl">
                        <h3 className="name ">
                          {ServiceDetails.data.data?.provider?.name}
                        </h3>
                        <h3 className="name text-lg opacity-50">
                          {ServiceDetails.data.data?.provider?.email}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="maindetails mt-10">
                    <h2 className="text-2xl mb-4 font-medium font-Montserrat">
                      Details:
                    </h2>
                    <div className="space-y-3">
                      <h3 className="text-2xl opacity-75">
                        <strong className="font-Montserrat">
                          Service Name:
                        </strong>
                        {ServiceDetails.data.data.servicename}
                      </h3>
                      <h3 className="text-xl opacity-75">
                        <strong className="font-Montserrat">Category: </strong>
                        {ServiceDetails.data.data.category}
                      </h3>
                      <div className="flex  gap-5 md:gap-10">
                        <div className="price text-xl text-green-600 font-Montserrat font-medium">
                          <strong>Price:</strong> $
                          {ServiceDetails.data.data.price}
                        </div>
                        <div className="rating">
                          <Rating
                            className="text-green-600"
                            initialRating={ServiceDetails.data.data.rating}
                            emptySymbol={<i className="fa-regular fa-star"></i>}
                            fullSymbol={<i className="fa-solid fa-star"></i>}
                            readonly
                          />
                          <div>
                            <div className="px-2 ml-2  bg-green-600 text-white  rounded-sm text-sm font-bold">
                              {ServiceDetails.data.data.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="description ">
                        <h1 className="text-2xl mt-12 font-Montserrat font-medium">
                          What We provide in this service:
                        </h1>
                        <p className="text-lg leading-8 mt-4">
                          {ServiceDetails.data.data.description}
                        </p>
                      </div>

                      <div>
                        <button
                          disabled={
                            ServiceDetails.data.data.provider.uid ===
                            Cureentuser?.uid
                          }
                          onClick={() =>
                            document.getElementById("bookingModal").showModal()
                          }
                          className="btn mt-5   bg-green-600 max-w-xs w-full hover:bg-green-600 text-white"
                        >
                          Book now
                        </button>
                        {ServiceDetails.data.data.provider.uid ===
                          Cureentuser?.uid && (
                          <p className="max-w-xs opacity-60 mt-2">
                            <strong>
                              Note: You view the button Disabled because it is
                              your service and you can't book your service
                            </strong>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 col-span-full lg:mt-0 mt-10">
                  <ServiceAreas
                    areas={ServiceDetails.data.data?.serviceareas}
                  ></ServiceAreas>
                </div>
              </div>
            </div>
            <div className="mt-20">
              <h1 className="Related font-Montserrat font-semibold Services text-4xl  text-green-600 ">
                Related Services:
              </h1>
              <RelatedServices
                reldata={{
                  category: ServiceDetails.data.data.category,
                  id: ServiceDetails.data.data._id,
                }}
              ></RelatedServices>
            </div>
            <div className="mt-20">
              <h1 className="Related font-Montserrat font-semibold Services text-4xl  text-green-600 ">
                Other Services:
              </h1>
              <OtherServices
                reldata={{
                  uid: ServiceDetails.data.data.provider?.uid,
                  id: ServiceDetails.data.data._id,
                }}
              ></OtherServices>
            </div>
          </div>

          <ServiceBookingModal
            data={ServiceDetails.data.data}
          ></ServiceBookingModal>
        </>
      ) : (
        <div className="mt-40 text-4xl  text-green-600  text-center container mx-auto">
          <h1>No data Found if may the owner remove the service</h1>
        </div>
      )}
    </>
  );
}
