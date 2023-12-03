import React, { useState } from "react";
// Import Swiper React components
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../styles/ClientTestimonial.scss";

// import required modules
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import useAxios from "../../Hooks/useAxios";
import SmallLoading from "../shared/SmallLoading";
import SmallError from "../shared/smallError";
import useAos from "../../Hooks/useAos";

export default function ClientTestimonial() {
  useAos()

  const [thumbsSwiper, setThumbsSwiper] = useState();
  //   const { ClientReviews } = useLoadClientReviews();
  const axios = useAxios();
  // import useLoadClientReviews from "../../Hooks/LoadClientReviws";
  const fetchCLientRiviews = async () => {
    const res = await axios.get("/client-riviews");
    return res;
  };
  const { data: ClientReviews, isLoading, isError, error, } = useQuery({ queryKey: ["ClientReviews"], queryFn: () => fetchCLientRiviews(), });

  return (
    <>
      <div className="container relative mx-auto">
        <div    className=" relative p-0 bg-green-100 rounded-xl">
          <div className=" bg_gradiand bg  relative overflow-hidden lg:border-green-200 lg:border-8 rounded-lg   z-10  mx-auto my-28   md:p-10  ">
            <div className="desc_cons grid  grid-cols-1 lg:grid-cols-2 gap-10">
              <div  data-aos="fade-right" className="desc lg:p-0  p-5 grid lg:text-start text-center items-center">
                <div className="grid gap-4 ">
                  <h1 className="sub_tile text-xl font-Montserrat font-bold">
                    What our client say
                  </h1>
                  <h1 className="sub_tile text-green-600 text-5xl font-bold font-Montserrat">
                    Happy Clients
                  </h1>
                  <p className="text-lg leading-9">
                    Immerse yourself in the inspiring stories of our delighted
                    clients, sharing their remarkable experiences with our
                    exceptional home services. From expert repairs to
                    transformative renovations, our team delivers unmatched
                    quality and dedication. Let their testimonials guide you
                    toward a brighter, more beautiful home. Discover the
                    unparalleled craftsmanship and customer satisfaction that
                    await you on your next home improvement journey.
                  </p>
                  <div>
                    <Link to="services">
                      <button className="btn bg-green-600 text-white hover:bg-green-600 mt-5 capitalize text-lg btn-lg">
                        View our Services
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              {isLoading ? (
                <SmallLoading> </SmallLoading>
              ) : isError ? (
                <SmallError>Try again: {error.message}</SmallError>
              ) : (
                <div className="verticle_slide   h-[700px] flex justify-end">
                  <Swiper loop={true} watchOverflow={true} direction="vertical" slidesPerView={"auto"} spaceBetween={10} grabCursor={true} coverflowEffect={{ rotate: 50, stretch: 0, depth: 20, modifier: 1, slideShadows: true, }} centeredSlides={true} autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true, }} pagination={{ clickable: true }} modules={[ Autoplay, EffectCoverflow, Pagination, Navigation, ]} className="mySwiper   mx-auto flex justify-end  slides_items  w-[100%] overflow-hidden   gap-10  relative" >
                    {ClientReviews.data.map((ele, ind) => (
                      <SwiperSlide
                        className="h-40"
                        style={{ height: "320px" }}
                        key={ind}
                      >
                        <div className="cradrs_items  ">
                          <div className="crads h-50 p-10 bg-green-200 rounded-md relative ">
                            <div className="absolute h-16 overflow-hidden w-16 top-[-32px] left-[-32px] border-zinc-100 border-4 rounded-full box-border ">
                              <img src={ele.imageURL} alt="" />
                            </div>
                            <div className="content">
                              <p className=" md:text-lg text-xs leading-7 ">
                                {ele?.testimonial.slice(0, 150) + "..."}
                              </p>
                              <h1 className="font-bold text-green-600 leading-7 mt-5  capitalize">
                                {ele.clientName}
                              </h1>
                              <h1 className="font-semibold leading-7 text-gray-500 capitalize">
                                Businessman
                              </h1>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>
          </div>
          <div  data-aos="fade-right"  className='clipshape6 lg:block hidden absolute z-4 top-2 p-21 md:p-10  left-0 h-full w-full bg-green-200'> 

          </div>
        </div>
      </div>
    </>
  );
}

// Import Swiper styles
