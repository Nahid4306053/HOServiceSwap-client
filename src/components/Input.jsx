import React from "react";

export default function Input({label,type,placeholder,customcss,...rest}) {
  return (

      <div className="form-control">
        <label className="label">
          <span className="label-text text-xl">{label}</span>
        </label>
        <input
        {...rest}
          type={type}
          placeholder={placeholder}
          className={` ${customcss} input input-bordered  `}
          required
        />
      </div>
  
  
  );
}
