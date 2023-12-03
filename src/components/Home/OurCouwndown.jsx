import React from "react";
import CountUp from "react-countup";
import useAos from "../../Hooks/useAos";

export default function OurCountDown() {
  useAos()
  return (
    <div data-aos="zoom-in-down" className="rounded-lg container font-Montserrat mx-auto">
      <div className="text-green-600 rounded-lg relative mt-40 mb-10 bg-green-100  p-10 py-20   w-full">
      <div  className="relative px-14 z-10 grid-cols-1 grid md:grid-cols-2 gap-8 lg:grid-cols-4" > <div className="coundonw_item font-bold text-center"> <CountUp className="text-8xl" start={0} suffix="k+" duration={10} end={15} enableScrollSpy={true} triggerOnce={true} /> <p className="font-bold">Work completed</p> </div> <div className="coundonw_item font-bold text-center"> <CountUp className="text-8xl" start={0} suffix="k+" duration={10} end={5} enableScrollSpy={true} triggerOnce={true} /> <p className="font-bold">Happy CLients</p> </div> <div className="coundonw_item font-bold text-center"> <CountUp className="text-8xl" start={0} suffix="+" duration={10} end={45} enableScrollSpy={true} triggerOnce={true} /> <p className="font-bold">Team Members</p> </div> <div className="coundonw_item font-bold text-center"> <CountUp className="text-8xl" start={0} suffix="+" duration={10} end={15} enableScrollSpy={true} triggerOnce={true} /> <p className="font-bold">Years Expreiance</p> </div> </div>
      <div className="absolute clipshape5 h-full w-full bg-green-200 top-0 left-0"></div>
      </div >
     
    </div>
  );
}
