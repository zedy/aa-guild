// libs
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toastr } from "react-redux-toastr";

// firebase
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

// components
import InputField from "../form/form-element-wrapper.component";
import { text } from "../form/form-elements.component";

// utils
import {
  VALIDATION_SCHEMA,
  INIT_VALUES,
  FIELDS_MAP,
} from "./signup-form.utils";

// TODO Email deduplication Test
// TODO username deduplication test
const SingUp = () => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: INIT_VALUES,
    validationSchema: Yup.object(VALIDATION_SCHEMA),
    onSubmit: async (values) => {
      setLoading(!loading);

      const { email, fullName, displayName, password, newUser } = values;
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const response = await createUserProfileDocument(user, {
        displayName,
        newUser,
        fullName,
      });

      toastr[response.status](response.message);
    },
  });

  return (
    <div className="sign-up eight wide column">
      <h2>Sign up</h2>
      <form
        className={`ui form ${loading ? "loading" : ""}`}
        onSubmit={formik.handleSubmit}
      >
        {FIELDS_MAP.map((element) => {
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default SingUp;
