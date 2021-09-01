// libs
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toastr } from "react-redux-toastr";

// auth
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

// components
import Button from "../buttons/button.components";
import InputField from "../form/form-element-wrapper.component";
import { text } from "../form/form-elements.component";

// utils
import {
  VALIDATION_SCHEMA,
  FIELDS_MAP,
  INIT_VALUES,
} from "./signin-form.utils";

const SingIn = () => {
  const formik = useFormik({
    initialValues: INIT_VALUES,
    validationSchema: Yup.object(VALIDATION_SCHEMA),
    onSubmit: async (values) => {
      const { signupEmail, signupPassword } = values;

      try {
        await auth.signInWithEmailAndPassword(signupEmail, signupPassword);
      } catch (err) {
        toastr.error(err.message);
      }
    },
  });

  return (
    <div className="sign-up eight wide column">
      <h2>Sign in</h2>
      <form className="ui form" onSubmit={formik.handleSubmit}>
        {FIELDS_MAP.map(element => {
          return (
            <InputField
              key={element.id}
              label={element.label}
              name={element.id}
              formik={formik}
            >
              {text(element, formik)}
            </InputField>
          );
        })}
        <button className="ui button teal" type="submit">
          Sign in
        </button>
        <Button
          className="ui button red"
          type="button"
          onClick={signInWithGoogle}
        >
          <i className="google icon"></i>
          Sign in with Google
        </Button>
      </form>
    </div>
  );
};

export default SingIn;
