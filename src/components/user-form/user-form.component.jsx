// libs
import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toastr } from 'react-redux-toastr';

// components
import InputField from '../form/form-element-wrapper.component';
import { text, rte } from '../form/form-elements.component';
import { Submit } from '../buttons/buttons.component';

// firebase
import { updateUserProfile } from '../../firebase/firebase.utils';

// utils
import { VALIDATION_SCHEMA, FIELDS_MAP, initValues } from './user-form.utils';

// component
const UserForm = ({ user }) => {
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const initialValues = initValues(user);
  const formik = useFormik({
    initialValues: initialValues,
    initialTouched: false,
    validationSchema: Yup.object(VALIDATION_SCHEMA),
    onSubmit: async values => {
      setLoading(true);

      const data = getChangedValues(values);
      const response = await updateUserProfile(user, data);
      toastr[response.status](response.message);
      setLoading(false);
    }
  });

  const getChangedValues = values => {
    const out = {};
    Object.keys(values).filter((value, idx) =>
      Object.values(values)[idx] !== Object.values(initialValues)[idx]
        ? (out[value] = Object.values(values)[idx])
        : false
    );
    return out;
  };

  return (
    <>
      <form
        className={`ui form ${loading ? 'loading' : ''}`}
        onSubmit={formik.handleSubmit}>
        {FIELDS_MAP.map(element => {
          return (
            <InputField
              key={element.id}
              label={element.label}
              name={element.id}
              formik={formik}>
              {element.type === 'textarea'
                ? rte(user ? user.about : '', editorRef)
                : text(element, formik)}
            </InputField>
          );
        })}
        <div className='ui divider'></div>
        {Submit()}
      </form>
    </>
  );
};

export default UserForm;
