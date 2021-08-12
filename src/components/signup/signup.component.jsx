// libs
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// firebase
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

// components
import InputField from "../form/input/input.component";

// TODO Email deduplication Test
const SingUp = () => {
  const [loading, setLoading] = useState(false);
  const emailConfirmation = false;

  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      displayName: "",
      password: "",
      confirmPassword: "",
      newUser: true
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .min(8)
        .max(45)
        .required("Required"),
      fullName: Yup.string().min(3).max(25).required("Required"),
      displayName: Yup.string().min(5).max(25).required("Required"),
      password: Yup.string().min(8).max(25).required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .min(8)
        .max(25)
        .required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(!loading);
      const { email, fullName, displayName, password, newUser } = values;
      
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await createUserProfileDocument(user, {
          displayName,
          emailConfirmation,
          newUser,
          fullName,
        });
      } catch (err) {
        console.log(err);
        setLoading(!loading);
        // TODO add toastr messages
      }
    },
  });

  return (
    <div className="sign-up eight wide column">
      <h2>Sign up</h2>
      <form
        className={`ui form ${loading ? "loading" : ""}`}
        onSubmit={formik.handleSubmit}
      >
        <InputField label="First and last name" name="fullName" formik={formik}>
          <input
            type="text"
            id="fullName"
            placeholder="Name"
            {...formik.getFieldProps("fullName")}
          />
        </InputField>
        <InputField label="Email" name="email" formik={formik}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
          />
        </InputField>
        <InputField label="User name" name="displayName" formik={formik}>
          <input
            type="text"
            id="displayName"
            placeholder="User name"
            {...formik.getFieldProps("displayName")}
          />
        </InputField>
        <InputField label="Password" name="password" formik={formik}>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
          />
        </InputField>
        <InputField label="Confirm password" name="confirmPassword" formik={formik}>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            {...formik.getFieldProps("confirmPassword")}
          />
        </InputField>
        <button className="ui button teal" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SingUp;
