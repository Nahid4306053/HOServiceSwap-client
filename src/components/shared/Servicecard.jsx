import React from "react";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import "../../Styles/Servicecard.scss";
export default function Servicecard({ service }) {
  return (
    <div className="card service_card overflow-hidden  bg-green-100 card-compact   shadow-xl">
      <div className="p-2">
        <figure className="rounded-lg overflow-hidden">
          <img
            className="h-72 w-full object-cover"
            src={service.thumbnailurl}
            alt={service.servicename}
          />
        </figure>
      </div>
      <div className="card-body z-[2] relative mt-3 text-center">
        <div>
          <div className="main_info absolute -top-12 w-10/12 left-[8%]  text-xl font-bold text-green-600   my-2">
            <div className="author text-base z-4 h-28 pt-2 bg-white w-full absolute left-0 ">
              <div className="avatar  rounded-full  overflow-hidden h-16 w-16">
                <img
                  className=" w-full object-top object-cover "
                  src={service?.provider?.photoURL}
                  alt=""
                />
              </div>
              <div className="provider">
                Provider: {service?.provider?.name.slice(0, 10)}
              </div>
            </div>
            <div className="details h-18 z-10 shadow-lg  rounded-lg   p-5 bg-white relative  xl:text-lg text-sm flex justify-between w-full">
              <div className="price font-Montserrat">${service.price}</div>
              <div className="rating">
                <Rating
                  className=""
                  initialRating={service.rating}
                  emptySymbol={<i className="fa-regular fa-star"></i>}
                  fullSymbol={<i className="fa-solid fa-star"></i>}
                  readonly
                />
                <div>
                  <div className="px-2 ml-2  bg-green-600 text-white xl:mt-1 rounded-sm text-sm font-bold">
                    {service.rating}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main_details space-y-2 relative z-10">
            <h2 className="text-2xl font-bold mt-7 ">{service.servicename}</h2>
            <p className="text-lg">{service.description.slice(0, 100)}</p>
            <div>
              <Link to={`/service-details/${service._id}`}>
                <button className="btn mt-2  hover:scale-105 hover:bg-green-600  bg-green-600 text-white">
                  <i className="fa-solid fa-eye"></i> view details
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="clipshape z-[1] h-full w-full absolute top-0 bg-green-200 left-0"></div>
      </div>
    </div>
  );
}
