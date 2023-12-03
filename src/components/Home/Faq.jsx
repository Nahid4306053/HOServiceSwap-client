import React, { useEffect, useState } from "react";
import useAos from "../../Hooks/useAos";

export default function Faq() {
  const [faqs, setfaqs] = useState([]);
  useAos();
  const [currentFaq, setcurrentFaq] = useState(0);
  useEffect(() => {
    fetch("/data/faq.json")
      .then((res) => res.json())
      .then((data) => setfaqs(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="faq mb-20">
      <div className="container mx-auto">
        <div className="contents ">
          <div
            data-aos="zoom-in-up"
            className="sec_title max-w-3xl mx-auto text-center"
          >
            <h1 className="mb-5 text-5xl text-head font-Montserrat text-green-600  font-bold">
              FAQ Guide
            </h1>
            <p className="mb-5 text-xl  leading-7 text-grey font-medium">
              Empowering Your Home with Expert Answers and Hassle-Free Solutions
            </p>
          </div>
        </div>

        <div className="cintent_items mt-24  grid grid-cols-1 items-center lg:grid-cols-2 gap-10">
          <div
            data-aos="fade-up"
            className=" order-2 lg:order-1   lg:h-[750px] xl:h-[550px] flex items-center   p-5 rounded-lg"
          >
            <div>
              {faqs.length > 0 &&
                faqs.map((ele, ind) => {
                  return (
                    <div
                      key={ind}
                      className="collapse collapse-plus my-4 bg-green-100"
                    >
                      <input
                        onClick={() => setcurrentFaq(ind)}
                        defaultChecked={ind === currentFaq ? true : false}
                        type="radio"
                        name="faq"
                      />
                      <div className="collapse-title text-xl md:text-2xl bg-green-200  text-green-600 font-medium text-head  cursor-pointer font-Montserrat">
                        {ind + 1}. {ele.question}
                      </div>
                      <div className="collapse-content">
                        <p className="mb-5 md:text-lg text-sm pt-4  leading-7 text-grey font-medium">
                          {ele.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="img order-1  mx-auto">
            <img
              data-aos="zoom-out-down"
              src="images/faq.png"
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
