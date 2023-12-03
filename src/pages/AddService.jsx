import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthnicationContext";
import Pagetitle from "../Hooks/Pagetitle";
import useAxios from "../Hooks/useAxios";
import InputBox from "../components/shared/InputBox";

export default function AddService() {
  const [Errors, setErrros] = useState([]);
  const { Cureentuser } = useAuth();
  const [Areas, setAreas] = useState([]);
  const Navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { catgoreys, areas } = useLoaderData();
  const [prevImg, setprevimg] = useState();
  const axios = useAxios();
  const fromref = useRef();
  const mutaion = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("/add-service", data);
      return res;
    },
    onSuccess: () => {
      toast.success("Service  added Successfully");
      fromref.current.reset();
      setprevimg();
      setAreas([]);
    },
    onError: () => {
      toast.error("Service add failed due to server side error");
    },
  });
  useEffect(() => {
    if (!catgoreys) {
      const erortime = setTimeout(() => {
        toast.error(
          "There is a server side error while visiting add service page"
        );
        Navigate("/");
      }, 500);

      return () => erortime;
    }
  }, [catgoreys]);

  const handelcategory = (e, id) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      setAreas((old) => [...old, id]);
    } else {
      console.log(id);
      const remaining = [...Areas].filter((ele) => ele !== id);
      setAreas(remaining);
    }
  };

  const handelAddservice = (e) => {
    e.preventDefault();
    let err = [];
    const servicename = e.target.servicename.value.trim();
    const thumbnailurl = e.target.thumbnailurl.value.trim();
    const category = e.target.category.value.trim();
    const price = e.target.price.value.trim();
    const rating = e.target.rating.value.trim();
    const description = e.target.description.value.trim();

    if (!category) {
      err.push("Please select a service category");
    }
    if (parseInt(price) < 0) {
      err.push("Please set a service price");
    }
    if (
      isNaN(parseFloat(rating)) ||
      parseFloat(rating) < 0 ||
      parseFloat(rating) > 5
    ) {
      err.push("Rating Should be 1 to 5 ");
    }
    if (Areas.length === 0) {
      err.push(
        "Please select Service area, which areas will you provide services"
      );
    }

    if (description.length < 100) {
      err.push("Minimam description length sholud 100 character");
    }
    if(!imageLoaded){
      err.push("Please Provide a valid img url");
    }
    setErrros(err);

    if (err.length === 0) {
      const serviceareas = areas.filter((ele) => Areas.includes(ele.id));
      const provider = { uid: Cureentuser?.uid, name: Cureentuser?.displayName, email: Cureentuser?.email, photoURL: Cureentuser?.photoURL, };
      const ServicedataForDatabase = { servicename, thumbnailurl, category, price, description, rating, serviceareas, provider, };
      mutaion.mutate(ServicedataForDatabase);
    }
  };
  return (
    <form
      ref={fromref}
      onSubmit={handelAddservice}
      className="container mx-auto mt-48 lg:grid gap-10 grid-cols-3 mb-14 rounded-lg bg-green-100 p-10"
    >
      <Pagetitle>Add Service | HoServiceSwap</Pagetitle>
      {Errors.length > 0 && (
        <div className="col-span-3 bg-red-200 p-5 rounded-lg text-red-600">
          <ul className="list-disc ml-5">
            {Errors.map((ele, ind) => {
              return <li key={ind}>{ele}</li>;
            })}
          </ul>
        </div>
      )}

      <div>
        <div className="img-preview relative overflow-hidden h-72 flex justify-center items-center   border-2 border-green-400 rounded-lg  border-dashed ">
          <h1 className="text-xl  text-green-600">Service Banner Preview</h1>
          {prevImg && (
            <img
              onLoad={() => (setImageLoaded(true) , setErrros([]))}
              onError={() => (setErrros(["Please provide a valid img url"]) , setImageLoaded(false))}
              className="absolute h-full w-full object-cover"
              src={prevImg}
              alt="Service Banner Preview"
            />
          )}
        </div>
        <br />
        <InputBox Type="text" defaultValue={Cureentuser?.displayName} Placeholder="Your Name" readOnly />
        <InputBox Type="email" defaultValue={Cureentuser?.email} Placeholder="Your Email" readOnly />
      </div>
      <div className="col-span-2 gap-5 lg:grid  grid-cols-2">
        <InputBox Type="text" name="servicename" Placeholder="Service Name" />
        <InputBox
          Type="url"
          onInput={(e) => setprevimg(e.target.value)}
          onBlur={(e) => setprevimg(e.target.value)}
          name="thumbnailurl"
          Placeholder="Service Banner Url"
        />
        <div className="form-control">
          <label className="label">
            <span className="text-lg text-green-600 capitalize">
              Select a Service category
            </span>
          </label>

          <select
            name="category"
            required
            className="select focus:outline-none text-lg border-green-700 text-gray-400  select-bordered w-full "
          >
            <option disabled value="" selected>
              Select a Service category
            </option>
            {catgoreys.length > 0 &&
              catgoreys.map((ele) => {
                return (
                  <option value={ele?.categoryName}>{ele?.categoryName}</option>
                );
              })}
          </select>
        </div>

        <div className="grid  grid-cols-2 gap-5">
          <InputBox Name="price" Type="number" Placeholder="Price ($)" />
          <InputBox Name="rating" Type="text" Placeholder="Rating" />
        </div>
        <div className="grid col-span-2 grid-cols-1 lg:gap-6 lg:grid-cols-3">
          <div className="form-control col-span-2 lg:order-0 order-1">
            <label className="label">
              <span className="text-lg text-green-600 capitalize">
                Service Description
              </span>
            </label>
            <textarea
              required
              name="description"
              className="textarea  border-green-700 focus:outline-none text-lg textarea-bordered"
              placeholder="Service Description"
              rows={5}
            ></textarea>
          </div>

          <div className="form-control col-span-1 lg:order-1 order-0">
            <label className="label">
              <span className="text-lg text-green-600 capitalize">
                {Areas.length > 0
                  ? "Selected Service area"
                  : "Select Service areas"}
                {Areas.length > 0 && `(${Areas.length})`}
              </span>
            </label>

            <div className="h-40 rounded-lg overflow-auto border border-green-700">
              {areas.length > 0 &&
                areas.map((ele) => {
                  return (
                    <div
                      key={ele.id}
                      className="form-control bg-white p-3 border-b border-green-200"
                    >
                      <label className="cursor-pointer flex items-center gap-4">
                        <input
                          onClick={(e) => handelcategory(e, ele.id)}
                          type="checkbox"
                          className="checkbox checkbox-success"
                        />
                        <span className="text-lg">{ele.name}</span>
                      </label>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <button
            disabled={mutaion.isPending}
            type="submit"
            className="btn mt-5 lg:mt-0 w-full bg-green-600  hover:bg-green-600 text-white"
          >
            {mutaion.isPending ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Add Service"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
