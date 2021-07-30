// libs
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

const SingUp = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      displayName: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        fullName: Yup.string().required('Required'),
        displayName: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
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
        <div
          className={`field ${
            formik.errors.fullName && formik.touched.fullName ? "error" : ""
          }`}
        >
          <label htmlFor="fullName">First and last name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            maxLength="30"
            placeholder="Full Name"
            value={formik.values.fullName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.fullName && formik.touched.fullName ? (
            <div>{formik.errors.fullName}</div>
          ) : null}
        </div>
        <div
          className={`field ${
            formik.errors.email && formik.touched.email ? "error" : ""
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            maxLength="40"
            placeholder="Email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <div
          className={`field ${
            formik.errors.displayName && formik.touched.displayName
              ? "error"
              : ""
          }`}
        >
          <label htmlFor="displayName">User name</label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            maxLength="20"
            placeholder="User Name"
            value={formik.values.displayName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.displayName && formik.touched.email ? (
            <div>{formik.errors.displayName}</div>
          ) : null}
        </div>
        <div
          className={`field ${
            formik.errors.password && formik.touched.password ? "error" : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            maxLength="20"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.email ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <div
          className={`field ${
            formik.errors.confirmPassword && formik.touched.confirmPassword
              ? "error"
              : ""
          }`}
        >
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            maxLength="20"
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
            <div>{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        <div
          className={`field ${
            formik.errors.tac && formik.touched.tac ? "error" : ""
          }`}
        >
        </div>
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SingUp;
