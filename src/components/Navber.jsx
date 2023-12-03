import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthnicationContext";
import { useMood } from "../Context/TemplateMoodContext";
import "../Styles/Navbar.scss";
import UserAvatar from "./UserAvatar";
import logo from "/images/logo.png";
export default function Navber() {
  const { Cureentuser } = useAuth();
  const { Darkmood } = useMood();
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/services">Services</NavLink>
      </li>
      <li className="DropParent">
        <a className="">
          Dashborder
          <i className="lg:block hidden fa-regular fa-angle-right fa-rotate-90 "></i>
          <i className="lg:hidden  fa-regular fa-angle-right "></i>
        </a>
        <ul
          tabIndex={10}
          className="desktop_dropmanue w-52 lg:bg-green-100 p-0 lg:border-t-2 border-green-700 lg:shadow-2xl"
        >
          <li className="hover:bg-green-200">
            <NavLink className=" whitespace-nowrap text-lg" to="/my-services">
              My Services
            </NavLink>
          </li>
          <li className="hover:bg-green-200">
            <NavLink className=" whitespace-nowrap text-lg" to="/add-service">
              Add Service
            </NavLink>
          </li>
          <li className="hover:bg-green-200">
            <NavLink className=" whitespace-nowrap text-lg" to="/my-schedules">
              My Schedules
            </NavLink>
          </li>
        </ul>
      </li>
    </>
  );

  return (
    <header
      className={`${
        Darkmood ? "bg-base-300" : "bg-green-100"
      }  shadow-lg fixed  top-14 w-full z-[100]`}
    >
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col container mx-auto">
          {/* Navbar */}
          <div className="w-full flex justify-between px-0   mx-auto navbar ">
            <div className="flex-1  capitalize text-2xl font-bold">
              <Link to="/">
                <img
                  className="lg:h-20 opacity-75 dark:g h-14"
                  src={logo}
                  alt=""
                />
              </Link>
            </div>

            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal  mr-5 font-semibold text-lg">
                {/* Navbar menu content here */} {links}
              </ul>
            </div>
            {!Cureentuser?.displayName && (
              <li>
                <NavLink className="text-lg font-bold" to="/login">
                  Log In
                </NavLink>
              </li>
            )}
            {Cureentuser?.displayName && <UserAvatar />}
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#F45C35"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
          </div>
        </div>
        <div className="drawer-side lg:hidden">
          <label htmlFor="my-drawer-3" className="drawer-overlay "></label>
          <ul className="menu text-xl relative font-bold text-center   p-4 w-80 min-h-full bg-base-300">
            <div className="close z-50 absolute right-0 pr-5">
              <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-3">
                  <i className="fa-solid fa-xmark"></i>
                </label>
              </div>
            </div>
            {links}
          </ul>
        </div>
      </div>
    </header>
  );
}
