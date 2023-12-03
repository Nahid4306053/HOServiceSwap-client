import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ScrollTop from "../Hooks/ScrollTop";
import useAxios from "../Hooks/useAxios";
import nodatafound from "../assets/No Data-Found.json";
import Servicecard from "../components/shared/Servicecard";
import SmallLoading from "../components/shared/SmallLoading";
import SmallError from "../components/shared/smallError";
import { toast } from "react-toastify";
import Pagetitle from "../Hooks/Pagetitle";

export default function Services() {
  const { search } = useLocation();
  const [searchpremas, setsearchparams] = useSearchParams();
  const [sortcategory, setSortcategory] = useState(
    searchpremas.has("category") ? searchpremas.get("category") : "*"
  );
  const searchInput = useRef()
  const [sortField, setsortField] = useState(
    JSON.stringify({ sortfield: "createAt", order: "desc" })
  );
  const axios = useAxios();
  const [page, setpage] = useState(1);
  const fetchservices = async () => {
    const res = await axios.get(`/services${search}`);
    return res;
  };
  const { data: services, isLoading, isError, isSuccess, error, } = useQuery({
    queryKey: ["services", search],
    queryFn: () => fetchservices(),
  });
  
  const fetchcategory = async () => {
    const res = await axios.get("/categories");
    return res;
  };
  const categorys = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchcategory(),
  });

  useEffect(() => {
    const handelcategory = () => {
      if (sortcategory === "*") {
        setsearchparams((prev) => {
          prev.delete("category");
        });
      } else {
        setsearchparams(
          (prev) => {
            prev.set("category", sortcategory);
            return prev;
          },
          { replace: true }
        );
      }
    };

    const handelSort = () => {
      const data = JSON.parse(sortField);
      setsearchparams(
        (prev) => {
          prev.set("sortfield", data.sortfield);
          prev.set("order", data.order);
          return prev;
        },
        { replace: true }
      );
     
    };
    if (sortcategory) {
      handelcategory();
    }
    if (sortField) {
      handelSort();
    }

  }, [searchpremas, sortcategory, sortField]);

  useEffect(()=>{
    if (page) {
     window.scrollTo(0,0)
      setsearchparams(
        (prev) => {
          prev.set("page", page);
          return prev;
        },
        { replace: true }
      );
    }
  },[page])

  useEffect(()=>{
    if(sortField){
      setpage(1)
    }
    if(sortcategory){
      setpage(1)
    }
  },[sortField , sortcategory])
  

  const clearfilter = () => {
    setSortcategory("*");
    setsortField(JSON.stringify({ sortfield: "createAt", order: "desc" }));
    if(searchpremas.has('search')){
      searchInput.current.value = '';
      setsearchparams((prev)=> { prev.delete('search') ; return prev })
    }
  };
  const Pginetionclass =
    "join-item  btn text-lg font-bold hover:bg-green-600 hover:text-white font-Montserrat bg-green-200";

  const handelsearch = () =>{
  if(searchInput.current.value.trim().length > 0){
    setsearchparams((prev)=>{ 
      prev.set('search',searchInput.current.value)
      return prev;
    })
  }
  else{
    toast.error("Please type a service name for search")
  }
  }  
  return (
    <>
      <div className="mt-56"></div>
      <Pagetitle>All Service | HoServiceSwap</Pagetitle>
      <div className="container mx-auto">
        <div className="w-full font-Montserrat bg-green-100 rounded-lg p-1 md:px-3">
          <div className=" w-full rounded-lg p-4 items-center  md:flex-row flex-col gap-4 flex justify-between">
            <div className="result">
              <h1 className="md:text-xl font-Montserrat font-semibold">
                {`Total Result: ${
                  isSuccess
                    ?  services.data.data.length +
                      " out of " +
                      services.data.totalresult
                    : "0"
                }`}
              </h1>
            </div>
             <div className="filters">
             { searchInput?.current?.value.trim().length > 0 && <div className="text-xs  bg-green-200 p-2 rounded-lg compact "><strong>You Searching:</strong> {searchInput.current.value.trim().slice(0,20)+".."}</div>}
             </div>
            <div className="filterdoprions font-medium flex gap-4">
              <button
                onClick={clearfilter}
                className="btn   bg-green-600 text-white hover:bg-green-600"
              >
                Clear Search & Filter
              </button>
            </div>
          </div>
        </div>   
        <div className="search relative bg-green-100 p-7 py-9 mt-5">
           <div className="flex -translate-y-2 w-full rounded-lg overflow-hidden">
           <input ref={searchInput}  type="text" placeholder="Search services by service name" className="w-full font-Montserrat focus:outline-none font-semibold rounded-lg p-3" />
            <button onClick={handelsearch} className="p-4 bg-green-600 font-Montserrat font-semibold px-8 text-white">Search</button>
           </div>
           <h3 className="text-xs  absolute md:mt-1">Note: if your searching  anything, the search keyword is work with filter by data</h3>
         </div>
        <div className="w-full mt-5 font-Montserrat bg-green-100 rounded-lg p-1 px-7">
          <div className="bg-white w-full rounded-lg items-center p-4 md:flex justify-between">
            <div className="filter">
              <h1 className="lg:text-xl font-semibold">Filter By:</h1>
            </div>
            <div className="options md:flex md:space-y-0 space-y-4 md:mt-0 mt-4 gap-4">
              {categorys.isSuccess && (
                <div className="flex gap-4 items-center">
                  <h1 className="capitalize">category</h1>
                  <select
                    onChange={(e) => setSortcategory(e.target.value)}
                    name="category"
                    value={sortcategory}
                    className="select max-w-xs focus:outline-none text-base font-medium border-green-700   select-bordered w-full "
                  >
                    <option value="*">All category data</option> {categorys.data.data.length > 0 && categorys.data.data.map((ele,ind) => { return ( <option key={ind} value={ele?.categoryName}> {ele?.categoryName} </option> ); })}
                  </select>
                </div>
              )}

              <div className="flex gap-4 items-center">
                <h1 className="capitalize whitespace-nowrap">Sort By</h1>
                <select name="category" value={sortField} onChange={(e) => setsortField(e.target.value)} className="select max-w-xs focus:outline-none text-base font-medium border-green-700  select-bordered w-full " >
                  <option value={JSON.stringify({ sortfield: "createAt", order: "desc", })} > New Service </option>
                  <option value={JSON.stringify({ sortfield: "createAt", order: "asc", })} > Old Service </option>
                  <option value={JSON.stringify({ sortfield: "price", order: "desc", })} > Price high to low </option>
                  <option value={JSON.stringify({ sortfield: "price", order: "asc" })} > Price low to High </option>
                  <option value={JSON.stringify({ sortfield: "rating", order: "desc", })} > Rating Hight to low </option>
                  <option value={JSON.stringify({ sortfield: "rating", order: "asc", })} > Rating low to High </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 mt-10 my-20 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-3">
              <SmallLoading></SmallLoading>
            </div>
          ) : isError ? (
            <div className="col-span-3">
              <SmallError></SmallError>
            </div>
          ) : services.data.data.length > 0 ? (
            services.data.data.map((ele) => {
              return <Servicecard key={ele._id} service={ele}></Servicecard>;
            })
          ) : (
            <div className="col-span-3 h-96 flex my-20 justify-center items-center">
              <Lottie className="h-96" animationData={nodatafound}></Lottie>
            </div>
          )}
        </div>

        {isSuccess && (
          <div className="paginetion flex mb-20">
            <div className="join border-green-300 border mx-auto ">
              <button
                onClick={() => setpage((old) => old - 1)}
                disabled={1 === page}
                className={`${Pginetionclass} disabled:bg-green-100`}
              >
                «
              </button>
              {[...Array(Math.ceil(services.data.totalresult / 9)).keys()].map(
                (ele) => {
                  return (
                    <button
                      onClick={() => setpage(ele + 1)}
                      key={ele + 1}
                      className={`${Pginetionclass} ${
                        ele + 1 === parseInt(page) ? "activepage" : ""
                      } `}
                    >
                      {ele + 1}
                    </button>
                  );
                }
              )}

              <button
                onClick={() => setpage((old) => old + 1)}
                disabled={page === Math.ceil(services.data.totalresult / 9)}
                className={`${Pginetionclass} disabled:bg-green-100`}
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
