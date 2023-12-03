import React from "react";
import { useMood } from "../Context/TemplateMoodContext";
import "../styles/footer.scss";
import logo from "/images/logo.png";
import StickyFooter from "./StickyFooter";
import { useLocation } from "react-router-dom";
export default function Footer() {
  const { Darkmood } = useMood();
  const {pathname} = useLocation()
  const paths = ['/login','/signup'];
  return (
    <footer className={`${paths.includes(pathname) ? "mt-0  pt-0" : "mt-36  pt-20"}  ${Darkmood ? "bg-base-300 " : "bg-green-100"}`}>
        { !paths.includes(pathname) &&   <StickyFooter />}
  
      <div className="grid text-[#9AAEA3] mt-10  container mx-auto lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
        <div className="about_info mt-10">
          <img className="h-14 opacity-75" src={logo} alt="" />
          <br />
          <div className="info mt-5 flex gap-4 items-center">
            <h2 className="text-4xl   text-green-600 w-10">
              <strong>
                <i className="fa-regular fa-location-dot"></i>
              </strong>
            </h2>
            <div className="location">
              <p>
                685 Market Street San Francisco, <br /> Dhaka, Bangladesh
              </p>
            </div>
          </div>
          <div className="info mt-5  flex gap-4 items-center">
            <h2 className="text-4xl  text-green-600   w-10">
              <strong>
                <i className="fa-regular fa-phone"></i>
              </strong>
            </h2>
            <div className="tel">
              <p>Call us +(880) 01954849695</p>
            </div>
          </div>
          <div className="info mt-5  flex gap-4 items-center">
            <h2 className="text-4xl  text-green-600   w-10">
              <strong>
                <i className="fa-regular fa-envelope"></i>
              </strong>
            </h2>
            <div className="tel">
              <p>Mail us ku4306053@gmail.com</p>
            </div>
          </div>
          <div className="socials flex gap-4">
            <a className="rounded-full mt-4" href="/">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a className="rounded-full mt-4" href="/">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a className="rounded-full mt-4" href="/">
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a className="rounded-full mt-4" href="/">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a className="rounded-full mt-4" href="/">
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
        <div className="links mt-10">
          <h1 className="shops mt-4 text-2xl font-bold text-green-600">
            Services
          </h1>
          <ul className="mt-8 w-auto ">
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              New Services
            </li>
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              Trending Services
            </li>
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              Sale and Special offers
            </li>
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              Best deals
            </li>
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              Cleaning Sevices
            </li>
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              Home Health and care
            </li>
          </ul>
        </div>
        <div className="links mt-10">
          <h1 className="shops mt-4 text-2xl font-bold text-green-600">
            Further Information
          </h1>
          <ul className="mt-8 w-auto ">
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              About
            </li>
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              Customer Service
            </li>
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              Reward Program
            </li>
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              Canceletions
            </li>
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              Privacy Policy
            </li>
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>
        <div className="links mt-10">
          <h1 className="shops mt-4 text-2xl font-bold text-green-600">
            Customer Service
          </h1>
          <ul className="mt-8 w-auto ">
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              Search Terms
            </li>
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              Advanced Search
            </li>
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              Book And Canceletions
            </li>
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              Contact Us
            </li>
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              Consultant
            </li>
            <li className="leading-10 hover:text-green-600 hover:underline cursor-pointer">
              Service Locations
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between"></div>
      <div
        className={`coppwright  ${
          Darkmood ? "bg-[#0e1218]" : "bg-green-200"
        }  `}
      >
        <div className="container text-center py-6 mx-auto mt-10 flex-col gap-5 lg:flex-row  justify-between items-center">
          <span className="text-sm ">
            © {new Date().getFullYear()}
            <a href="#" className="hover:underline">
              HOServiceSwap™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
