import React from "react";
import { useMood } from "../Context/TemplateMoodContext";
import { useAuth } from "../Context/AuthnicationContext";

export default function TopHeader() {
  const {Cureentuser} = useAuth()
  const { Darkmood } = useMood();
  return (
    <div
      className={`w-full fixed top-0 text-xs md:text-base  text-white ${
        Darkmood ? "bg-[#0f1318]" : "bg-[#9AAEA3] z-[100]"
      } `}
    >
      {/* bg-pink-400 */}
      <div className="container  mx-auto md:py-2 ">
        <div className="md:flex-row gap-2 py-2   flex-col items-center flex  text-center justify-between">
          <div className="contactinfo flex gap-5 cursor-pointer">
            <span>
              <i className="fa-sharp fa-regular fa-location-dot"></i> Our
              service areas
            </span>
            <span>
              <i className="fa-light fa-envelope"></i> ku4306053@gmail.com
            </span>
          </div>
          <div className="contactinfo flex gap-5 cursor-pointer">
            <span>Contact</span>
            <span>Help</span>
            <span>Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
