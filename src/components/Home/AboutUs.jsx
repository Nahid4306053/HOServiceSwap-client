import Lottie from "lottie-react";
import React from "react";
import CountUp from "react-countup";
import Home_services from "../../assets/Home_services.json";
import about_2 from "/images/about_us-1.jpg";
import about_1 from "/images/about_us-2.jpg";
import useAos from "../../Hooks/useAos";
export default function AboutUs() {
  useAos()
  return (
    <div className="container mx-auto grid items-center grid-cols-1 mt-40 my-20 lg:grid-cols-2  lg:gap-20">
      <div className="ourFacinate relative">
        <div className="main_img h-[500px] relative">
          <img
            data-aos="zoom-in"
            className="md:w-8/12 w-10/12 mx-auto  h-full  object-cover"
            src={about_2}
            alt=""
          />
          <div className="sub_img  absolute -bottom-20 right-0 h-1/2 w-2/3 md:w-1/2">
            <img
              data-aos="fade-up"
              className="h-full object-cover border-8 border-white "
              src={about_1}
              alt=""
            />
          </div>
        </div>
        <div data-aos="fade-right" className="expreance  absolute top-20 py-5 md:py-10 space-y-2 rounded-lg px-5 bg-green-200">
          <h1 className="text-3xl md:text-6xl  text-green-600 font-bold font-Montserrat">
            <CountUp
              start={0}
              suffix="+"
              scrollSpyOnce={true}
              enableScrollSpy={true}
              end={15}
            ></CountUp>
          </h1>
          <p className=" md:text-2xl capitalize text-cen">
            years <br /> Expreance
          </p>
        </div>
        <div data-aos="zoom-in" className="animations bg-green-100 rounded-full top-1/3 right-0 h-32 absolute">
          <Lottie className="h-32" animationData={Home_services}></Lottie>
        </div>
      </div>
      <div   data-aos="fade-left" className="aboutus  lg:mt-0  mt-20">
        <div  className="introduct space-y-5">
          <span className="text-2xl text-green-600">Introduction</span>
          <h1 className="text-4xl  text-green-600  font-Montserrat font-bold">
            HoServiceSwap Your Trusted Partner in Home Services
          </h1>
          <p className="text-lg leading-8">
            HOServiceSwap is a leading online platform that connects homeowners
            with trusted service providers for a wide range of home-related
            tasks. Whether you need plumbing repairs, electrical work, cleaning
            services, or any other home maintenance task, HOServiceSwap
            simplifies the process of finding reliable professionals.
          </p>
          <div>
            <button className="btn mt-5 lg:btn-lg hover:scale-105 hover:bg-green-600  bg-green-600 text-white">
              Explore more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
