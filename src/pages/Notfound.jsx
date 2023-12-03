import Lottie from "lottie-react";
import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Pagetitle from "../Hooks/Pagetitle";
import notfound from "../assets/404-not-found.json";

export default function Notfound() {
  const { status, data, statusText } = useRouteError();
  return (
    <>
      <Pagetitle>{statusText} - TechNoWorld</Pagetitle>
      <div className="container mx-auto flex h-[90vh] text-center flex-col justify-center items-center ">
        <Lottie className="max-h-[500px]" animationData={notfound} alt="" />

        <div className="-translate-y-10">
          <p className="text-xl my-5">{data}</p>
          <Link to="/">
            <button className="btn bg-green-600 btn-lg text-white hover:bg-green-600 mt-5">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
