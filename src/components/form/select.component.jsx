// libs
import React from "react";
import { Form } from 'semantic-ui-react'

const SelectField = ({ formik, name, label, options }) => {
  return (
    <div
      className={`field ${
        formik.errors[name] && formik.touched[name] ? "error" : ""
      }`}
    >
      <label>{label}</label>
      <div className="ui fluid search selection dropdown">
        <input type="hidden" name={name} />
        <i className="dropdown icon"></i>
        <div className="default text">{label}</div>
        <div className="menu">
          {options.map((option) => {
            return (
              <div key={option.value} className="item" data-value={option.value}>
                {option.name}
              </div>
            );
          })}
        </div>
      </div>
      {formik.errors[name] && formik.touched[name] ? (
        <div>{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default SelectField;
