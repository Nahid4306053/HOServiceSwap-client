import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/AuthnicationContext";
import useAxios from "../../Hooks/useAxios";
import InputBox from "../shared/InputBox";

export default function ServiceBookingModal({ data }) {
  const { Cureentuser } = useAuth();
  const [Errors, setErrros] = useState([]);
  const axios = useAxios();
  const fromref = useRef();
  const closemodel = () => {
    document.getElementById("bookingModal").close();
    fromref.current.reset();
  };

  const mutation = useMutation({
    mutationFn: async (daatfordatabase) => {
      const res = await axios.post(`/booking/${data._id}`, daatfordatabase);
      return res;
    },
    onError: (error) => setErrros([`${error.message}`]),
    onSuccess: () => (
      closemodel(),
      toast.success("Congratulation you purchase the service successFully")
    ),
  });

  const handelPurchase = (e) => {
    e.preventDefault();
    const err = [];
    const takingDate = e.target.TakingDate.value;
    const instruction = e.target.instruction.value;

    if (new Date() > new Date(takingDate)) {
      err.push("Please select a valid date form today");
    }
    if (instruction.trim() === "") {
      err.push("Please give your address and any Instruction You have");
    }
    setErrros(err);
    //     booking
    if (err.length === 0) {
      const daatfordatabase = {
        takingDate,
        instruction,
        provider: data.provider,
        consumer: {
          uid: Cureentuser.uid,
          photoURL: Cureentuser.photoURL,
          name: Cureentuser.displayName,
          email: Cureentuser.email,
        },
      };
      mutation.mutate(daatfordatabase);
    }
  };
  return (
    <div>
      <dialog
        style={{ zIndex: "!important 10" }}
        id="bookingModal"
        className="modal z-[10] bg-[#00000079]"
      >
        <div className="modal-box overflow-x-hidden relative z-10 bg-green-100 w-11/12 max-w-7xl">
          <div method="dialog">
            <button
              onClick={closemodel}
              className="btn btn-sm btn-circle z-[50] bg-red-400 text-white btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </div>
          <div className="relative z-10 w-full ">
            {Errors.length > 0 && (
              <div className="col-span-3 my-7 bg-red-200 p-5 rounded-lg text-red-600">
                <ul className="list-disc ml-5">
                  {Errors.map((ele, ind) => {
                    return <li key={ind}>{ele}</li>;
                  })}
                </ul>
              </div>
            )}
            <form
              ref={fromref}
              onSubmit={handelPurchase}
              className="grid gap-10 grid-cols-1 lg:grid-cols-2"
            >
              <div className="details editable">
                <div className="bannerpreviw overflow-hidden w-full h-72 border-2 rounded-lg border-green-400 border-dashed">
                  <img
                    className="h-full w-full object-cover"
                    src={data.thumbnailurl}
                    alt=""
                  />
                </div>
                <div className="mt-5 space-y-1">
                  <h1 className="text-2xl font-Montserrat font-medium">
                    Editable area:
                  </h1>
                  <InputBox
                    Type="date"
                    name="TakingDate"
                    Placeholder="Service Taking Date"
                  />
                  <div className="form-control">
                    <label className="label">
                      <span className="text-lg text-green-600 capitalize">
                        Special instruction (like address , area, about service
                        plan)
                      </span>
                    </label>
                    <textarea
                      required
                      name="instruction"
                      className="textarea  border-green-700 focus:outline-none text-sm textarea-bordered"
                      placeholder="Special instruction"
                      rows={4}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="noteditable space-y-5">
                <h1 className="text-2xl font-Montserrat font-medium">
                  Not Editable area:
                </h1>
                <InputBox
                  Type="text"
                  value={data.servicename}
                  name="servicename"
                  readOnly
                  Placeholder="Service Name"
                />
                <InputBox
                  Type="text"
                  value={data.provider.name}
                  name="servicename"
                  readOnly
                  Placeholder="Provider Name"
                />
                <InputBox
                  Type="text"
                  value={data.provider.email}
                  name="servicename"
                  readOnly
                  Placeholder="Provider Email"
                />
                <InputBox
                  Type="text"
                  value={data.price}
                  name="servicename"
                  readOnly
                  Placeholder="Price ($)"
                />

                <div className="col-span-2">
                  <button
                    disabled={mutation.isPending}
                    type="submit"
                    className="btn mt-7 w-full bg-green-600  hover:bg-green-600 text-white"
                  >
                    {mutation.isPending ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      "Purchase this Service"
                    )}
                  </button>
                </div>
              </div>
              <div></div>
            </form>
          </div>
          <div className="hidden lg:block clipshape  z-[0] bg-green-200 w-full h-full absolute top-0"></div>
        </div>
      </dialog>
    </div>
  );
}
