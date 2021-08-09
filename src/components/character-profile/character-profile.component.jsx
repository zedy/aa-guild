// libs
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// auth
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

// components
import Button from "../buttons/button.components";
import InputField from "../form/input/input.component";

const CharacterProfile = () => {
  const formik = useFormik({
    initialValues: {
      charClass: "",
      charSubClass: '',
      race: "",
      level: '',
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      class: Yup.string().required("Required"),
      level: Yup.string().required("Required"),
      subClass: Yup.string().required("Required"),
      race: Yup.string().required("Required")
    }),
    onSubmit: async (values) => {
      const { email, password, charSubClass, charClass, race } = values;

      try {
        //await auth.signInWithEmailAndPassword(email, password);
      } catch (err) {
        console.log(err); // TODO toastr message
      }
    },
  });

  return (
    <div className="sign-up eight wide column">
      <h2>Basic character details</h2>

      <form className="ui form" onSubmit={formik.handleSubmit}>
        <InputField label="Email" name="email" formik={formik}>
          <input
            type="email"
            id="signup-email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
          />
        </InputField>
        <InputField label="Password" name="password" formik={formik}>
          <input
            type="password"
            id="signup-password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
          />
        </InputField>
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

export default CharacterProfile;
