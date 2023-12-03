import React from "react";
import useAos from "../../Hooks/useAos";
import InputBox from "../shared/InputBox";

export default function ContactSection() {
  useAos();
  return (
    <div className="container mx-auto  mt-10 mb-24">
      <div className="box_container mx-auto">
        <div
          data-aos="zoom-out-up"
          className="sec_title max-w-3xl mx-auto text-center"
        >
          <h1 className="mb-5 text-5xl text-head font-Montserrat text-green-600  font-bold">
            Reach out to us!
          </h1>
          <p className="mb-5 text-xl leading-7 text-grey font-medium">
            To learn more about our team and initiatives, feel free to get in
            touch with us. Our dedicated team of professionals is here to help
            and provide support to your queries.
          </p>
        </div>
        <div className="contact_items grid grid-cols-1 gap-12 mt-24 lg:grid-cols-[1.7fr_1.3fr]">
          <div className="contact_cards gap-12 grid grid-cols-1 md:grid-cols-2">
            <div data-aos="fade-up" className="crad_items  rounded-none">
              <div className="card bg-green-100  mb-2   shadow-xl ">
                <figure className="text-6xl text-green-600  mt-14">
                  <i className="fa-light fa-location-dot"></i>
                </figure>
                <div className="card-body text-center">
                  <h2 className="text-head text-4xl text-green-600 font-bold capitalize">
                    adress
                  </h2>
                  <p className="text-lg   mt-2   text-grey font-light">
                    685 Market Street San Francisco,
                  </p>
                  <p className="text-lg text-grey font-light">
                    Dhaka, Bangladesh
                  </p>
                  <div className="card-actions justify-center"></div>
                </div>
              </div>
            </div>
            <div data-aos="fade-up" className="crad_items  rounded-none">
              <div className="card bg-green-100   mb-2   shadow-xl ">
                <figure className="text-6xl text-green-600 mt-14 ">
                  <i className="fa-light fa-phone-volume"></i>
                </figure>
                <div className="card-body text-center">
                  <h2 className="text-head text-4xl text-green-600 font-bold capitalize">
                    Call US
                  </h2>
                  <p className="text-lg  mt-2 font-light  text-grey ">
                    0190921755
                  </p>
                  <p className="text-lg text-grey font-light">
                    6463-222-22-8888-22
                  </p>
                  <div className="card-actions justify-center"></div>
                </div>
              </div>
            </div>
            <div data-aos="fade-up" className="crad_items  rounded-none">
              <div className="card bg-green-100   mb-2   shadow-xl ">
                <figure className="text-6xl text-green-600 mt-14 ">
                  <i className="fa-regular fa-envelope"></i>
                </figure>
                <div className="card-body text-center">
                  <h2 className="text-head text-4xl text-green-600 font-bold capitalize">
                    Mail us
                  </h2>
                  <p className="text-lg  mt-2  break-words  text-grey font-light">
                    ku4306053@gmail.com
                  </p>
                  <p className="text-lg text-grey break-words font-light">
                    Ku@yahoo.com
                  </p>
                  <div className="card-actions justify-center"></div>
                </div>
              </div>
            </div>
            <div data-aos="fade-up" className="crad_items  rounded-none">
              <div className="card bg-green-100   mb-2   shadow-xl ">
                <figure className="text-6xl text-green-600 mt-14 ">
                  <i className="fa-regular fa-headphones"></i>
                </figure>
                <div className="card-body text-center">
                  <h2 className="text-head text-4xl text-green-600 font-bold capitalize">
                    Helpline
                  </h2>
                  <p className="text-lg  mt-2   text-grey font-light">
                    24/7 6584557
                  </p>
                  <p className="text-lg text-grey font-light">
                    Gazipur ,Dhaka ,Bangladesh
                  </p>
                  <div className="card-actions justify-center"></div>
                </div>
              </div>
            </div>
          </div>

          <div data-aos="zoom-in-up" className="bg-green-100  p-10 rounded-lg">
            <form
              action="#"
              method="post"
              className="flex flex-col gap-4 justify-between h-full"
            >
              <InputBox Placeholder="Name"></InputBox>
              <InputBox Placeholder="Email"></InputBox>
              <InputBox Placeholder="Subject"></InputBox>
              <div className="form-control ">
                <label className="label">
                  <span className="text-lg text-green-600 capitalize">
                    Message
                  </span>
                </label>
                <textarea
                  required
                  name="description"
                  className="textarea  border-green-700 focus:outline-none text-base textarea-bordered"
                  placeholder="Message"
                  rows={4}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn mt-5 lg:mt-0 w-full bg-green-600  hover:bg-green-600 text-white"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
