import React from "react";
import { ThreeCircles } from "react-loader-spinner";

export default function Bigloading() {
  return (
    <div className="w-full bg-green-200 min-h-screen flex justify-center items-center">
      <ThreeCircles
        height="200"
        width="200"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperclassName=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="#3498db"
        innerCircleColor="#e67e22"
        middleCircleColor="#e74c3c"
      />
    </div>
  );
}
