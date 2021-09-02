// libs
import React from 'react';

export const textarea = (element, formik) => {
  return (
    <textarea
      type={element.type}
      id={element.id}
      placeholder={element.label}
      {...formik.getFieldProps(element.id)}
    />
  );
};

export const select = (element, formik, options) => (
  <select id={element.id} {...formik.getFieldProps(element.id)}>
    <option value='' disabled>
      Choose an option
    </option>
    {options}
  </select>
);

export const optionsItem = value => (
  <option value={value} key={value}>
    {value}
  </option>
);

export const text = (element, formik) => {
  return (
    <input
      type={element.type}
      id={element.id}
      placeholder={element.label}
      {...formik.getFieldProps(element.id)}
      autoComplete='off'
    />
  );
};
