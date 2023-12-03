import React from "react";
import small_loading from '../../assets/small_loading.json'
import Lottie from "lottie-react";
export default function SmallLoading() {
  return (
    <div className="w-full  h-full flex justify-center items-center">
      <Lottie className="h-96" animationData={small_loading}></Lottie>
    </div>
  );
}
