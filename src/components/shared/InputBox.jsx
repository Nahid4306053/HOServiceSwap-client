import React from "react";

export default function InputBox({
  Placeholder,
  Type,
  Name,
  customcss,
  ...rest
}) {
  return (
    <div className={`form-control ${customcss}`}>
      <label className="label">
        <span className="text-lg text-green-600 capitalize">{Placeholder}</span>
      </label>
      <input
        type={Type}
        placeholder={Placeholder}
        name={Name}
        {...rest}
        className="input focus:outline-none input-bordered border-green-700"
        required
      />
    </div>
  );
}
