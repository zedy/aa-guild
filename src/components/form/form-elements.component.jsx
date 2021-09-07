// libs
import React from 'react';

// components
import ImageUpload from '../image-upload/image-upload.component';

export const image = (
  element,
  callback,
  formik,
  presetImage,
  setLoading,
  value,
  placeholder,
  path
) => {
  return (
    <ImageUpload
      fileName={element.id}
      path={path}
      activeteLoader={setLoading}
      presetImage={presetImage}
      callback={callback}
      defaultImage={`https://via.placeholder.com/300x300.png?text=${placeholder}`}>
      <input
        type='hidden'
        id={element.id}
        {...formik.getFieldProps(element.id)}
        value={value}
      />
    </ImageUpload>
  );
};

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
