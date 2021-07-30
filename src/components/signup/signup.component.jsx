// libs
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// components
import InputField from "../form/input/input.component";

const SingUp = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      displayName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").min(8).max(45).required("Required"),
      fullName: Yup.string().min(5).max(25).required("Required"),
      displayName: Yup.string().min(5).max(25).required("Required"),
      password: Yup.string().min(8).max(25).required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .min(8).max(25)
        .required("Required"),
    }),
    onSubmit: (values) => {
      setLoading(!loading);
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="sign-up eight wide column">
      <h2>Sign up</h2>
      <form
        className={`ui form ${loading ? "loading" : ""}`}
        onSubmit={formik.handleSubmit}
      >
        <InputField
          type="text"
          name="fullName"
          formik={formik}
          label="First and last name"
        />
        <InputField
          type="email"
          name="email"
          formik={formik}
          label="Email"
        />
        <InputField
          type="text"
          name="displayName"
          formik={formik}
          label="User name"
        />
        <InputField
          type="password"
          name="password"
          formik={formik}
          label="Password"
        />
        <InputField
          type="password"
          name="confirmPassword"
          formik={formik}
          label="Confirm password"
        />        
        <button className="ui button teal" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SingUp;
