// libs
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toastr } from 'react-redux-toastr';

// firebase
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

// components
import InputField from '../form/form-element-wrapper.component';
import { text } from '../form/form-elements.component';
import { Submit } from '../buttons/buttons.component';

// utils
import {
  VALIDATION_SCHEMA,
  INIT_VALUES,
  FIELDS_MAP
} from './signup-form.utils';

// component
const SingUp = () => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: INIT_VALUES,
    validationSchema: Yup.object(VALIDATION_SCHEMA),
    onSubmit: async values => {
      setLoading(!loading);

      const { email, fullName, displayName, password, newUser } = values;

      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        const response = await createUserProfileDocument(user, {
          displayName,
          newUser,
          fullName
        });

        toastr[response.status](response.message);
      } catch (err) {
        toastr.error(err.message);
        setLoading(false);
      }
    }
  });

  return (
    <div className='sign-up column'>
      <h2>Sign up</h2>
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
              {text(element, formik)}
            </InputField>
          );
        })}
        {Submit()}
      </form>
    </div>
  );
};

export default SingUp;
