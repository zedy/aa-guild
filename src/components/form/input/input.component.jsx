import React from "react";

const InputField = ({ formik, name, type, label }) => {
  return (
    <div
      className={`field ${
        formik.errors[name] && formik.touched[name] ? "error" : ""
      }`}
    >
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={label}
        value={formik.values[name]}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      {formik.errors[name] && formik.touched[name] ? (
        <div>{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default InputField;
