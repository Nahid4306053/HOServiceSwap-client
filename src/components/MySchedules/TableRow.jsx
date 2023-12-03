import React from "react";
import { Link } from "react-router-dom";

export default function TableRow({ele , people , children}) {
  return (
    <tr className="text-lg">
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask bg-white rounded-lg  w-32 h-20">
              <img src={ele.servicedata.thumbnailurl} alt="service banner" />
            </div>
          </div>
        </div>
      </td>
      <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={ele[people].photoURL} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{ele[people].name}</div>
              <div className="text-sm opacity-50">{ele[people].email}</div>
            </div>
          </div>
        </td>
      <td>{ele.servicedata.servicename}</td>  
      <td className="whitespace-nowrap font-Montserrat font-medium">
        ${ele.servicedata.price}
      </td>
      <td> <div className={`badge badge-outline  ${ele.status.toLowerCase() === "pending" ? "badge-secondary" : ele.status.toLowerCase() === "progress" ? "badge-primary" : "badge-success"} capitalize` }>{ele.status}</div> </td>
      <th className="grid lg:flex   lg:mt-5 gap-2 items-center">
        {children}            
        <Link to={`/service-details/${ele.servicedata._id}`}>
          <button
            data-tip="View details"
            className="btn-info ml-2  tooltip btn btn-sm"
          >
            <i className="fa-solid fa-eye"></i>
          </button>
        </Link>
      </th>
    </tr>
  );
}
