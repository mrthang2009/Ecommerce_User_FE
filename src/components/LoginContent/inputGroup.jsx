import React from "react";

function InputGroup({
  label,
  type = "text",
  name,
  placeholder = `Vui lòng nhập thông tin ${label}`,
  validation,
}) {
  const { values, handleChange, handleBlur, errors, touched } = validation;
  return (
    <div>
      <label className="block mb-1 text-gray-700">{label}:</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
      />
      {errors[name] && touched[name] && (
        <div className="text-red-500 mt-1">{errors[name]}</div>
      )}
    </div>
  );
}

export default InputGroup;