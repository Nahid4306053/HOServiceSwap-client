import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useAxios from "../../Hooks/useAxios";

export default function ChangeStatus({ currentStatus, BookingID }) {
  const [status, setstatus] = useState(currentStatus);
  const axios = useAxios();
  const queryClient = useQueryClient();
  const mutaion = useMutation({
    mutationFn: async () => {
      const res = axios.patch(`/booking-status/${BookingID}`, {
        status: status,
      });
      return res;
    },
    onError: () => {
      toast.error("There is a server side error");
    },
    onSuccess: () => {
      toast.success("The service status change successfully");
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
  const handelsatatus = () => {
    if (status !== currentStatus) {
      mutaion.mutate();
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={5}
        data-tip="Change Status"
        className="btn-warning text-white ml-2  tooltip btn btn-sm"
      >
        <i className="fa-regular fa-signal-bars"></i>
      </button>
      <div
        tabIndex={5}
        className="dropdown-content bg-green-200 z-[1]  shadow  rounded-lg w-72 p-5"
      >
        <select
          value={status}
          onChange={(e) => setstatus(e.target.value)}
          className="select text-lg focus:outline-none border-green-700 text-green-600 bg-transparent select-bordered w-full max-w-xs"
        >
          <option value="pending">Pending</option>
          <option value="progress">Progress</option>
          <option value="completed">Completed</option>
        </select>
        <div className="w-full flex justify-end">
          <button
            onClick={handelsatatus}
            disabled={currentStatus === status}
            className="btn bg-green-600 text-white hover:bg-green-600 mt-3"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
