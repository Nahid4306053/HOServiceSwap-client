import React from "react";
import { Link } from "react-router-dom";
import Pagetitle from "../Hooks/Pagetitle";
import ScrollTop from "../Hooks/ScrollTop";
import AboutUs from "../components/Home/AboutUs";
import BannerSection from "../components/Home/BannerSection";
import ClientTestimonial from "../components/Home/CLientReviews";
import CategoreySection from "../components/Home/CategoreySection";
import ContactSection from "../components/Home/ContactSection";
import Faq from "../components/Home/Faq";
import NewsLetter from "../components/Home/NewsLetter";
import OurCountDown from "../components/Home/OurCouwndown";
import PopularServiceSection from "../components/Home/PopularServiceSection";
export default function Home() {
  ScrollTop(0, 0);
  return (
    <>
      <Pagetitle>Home | HOServiceSwap</Pagetitle>
      <BannerSection></BannerSection>
      <AboutUs></AboutUs>
      <CategoreySection></CategoreySection>
      <PopularServiceSection></PopularServiceSection>
      <div className="container mx-auto">
        <div className="flex justify-end">
          <Link to="/services">
            <button className="btn mt-5 lg:btn-lg hover:scale-105 hover:bg-green-600  bg-green-600 text-white">
              view all service <i className="fa-solid fa-arrow-right"></i>
            </button>
          </Link>
        </div>
      </div>
      <OurCountDown></OurCountDown>
      <ClientTestimonial></ClientTestimonial>
      <Faq></Faq>
      <ContactSection></ContactSection>
      <NewsLetter></NewsLetter>
    </>
  );
}
