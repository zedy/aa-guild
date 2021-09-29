// libs
import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// auth
import {
  googleSignInStart,
  emailSignInStart
} from '../../redux/user/user.actions';

// components
import InputField from '../form/form-element-wrapper.component';
import { text } from '../form/form-elements.component';

// utils
import {
  VALIDATION_SCHEMA,
  FIELDS_MAP,
  INIT_VALUES
} from './signin-form.utils';
import { GoogleSignIn, SignIn } from '../buttons/buttons.component';
//

// component
const SingIn = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: INIT_VALUES,
    validationSchema: Yup.object(VALIDATION_SCHEMA),
    onSubmit: async values => {
      const { signinEmail, signinPassword } = values;
      dispatch(emailSignInStart({ signinEmail, signinPassword }));
    }
  });

  const googleLogIn = () => {
    dispatch(googleSignInStart());
  };

  return (
    <div className='sign-up column'>
      <h2>Sign in</h2>
      <form className='ui form' onSubmit={formik.handleSubmit}>
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
        {SignIn()}
        {GoogleSignIn(googleLogIn)}
      </form>
    </div>
  );
};

export default SingIn;
