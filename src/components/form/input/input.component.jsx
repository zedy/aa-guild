// libs
import React from "react";

const InputField = ({ formik, name, label, children }) => {
  return (
    <div
      className={`field ${
        formik.errors[name] && formik.touched[name] ? "error" : ""
      }`}
    >
      <label htmlFor="signup-email">{label}</label>
      {children}
      {formik.errors[name] && formik.touched[name] ? (
        <div>{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default InputField;
