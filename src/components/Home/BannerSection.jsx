import { useQuery } from "@tanstack/react-query";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useAxios from "../../Hooks/useAxios";
import "../../styles/Banner.scss";
import BigError from "../shared/BigError";
import Bigloading from "../shared/Bigloading";
import { Link } from "react-router-dom";

export default function BannerSection() {
  const axios = useAxios();
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
    <div className="w-full mx-auto  mt-32 lg:mt-[150px] lg:h-[700px]">
      <div className="slider_Section col-span-full order-0 lg:order-1   lg:col-span-9">
        {isLoading ? (
          <Bigloading> </Bigloading>
        ) : isError ? (
          <BigError>Try again: {error.message}</BigError>
        ) : (
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            loop={true}
            grabCursor={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="Bannerswiper  mx-auto overflow-hidden max-h-[700px] w-full h-full"
          >
            {categories.data.map((ele) => {
              return (
                <SwiperSlide
                  className=""
                  style={{
                    background: `url(${ele.thumbnail}) `,
                    backgroundPosition: "center",
                  }}
                  key={ele._id}
                >
                  <div className="banneritem md:h-[700px] py-10  flex items-center">
                    <div className="container  mx-auto">
                      <div className="max-w-3xl space-y-8 details">
                        <h1 className="md:text-7xl font-Montserrat text-4xl  text-green-600  font-bold">
                          {ele.slogan}
                        </h1>
                        <p className="text-lg leading-8 text-green-600">
                          {ele.description}
                        </p>
                      <Link className="button-serv" to="/services">  <button className="font-bold hover:bg-green-600 bg-green-600 text-green-100 rounded-lg btn-md lg:btn-lg">
                          View Services
                        </button></Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </div>
  );
}
