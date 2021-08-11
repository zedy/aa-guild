// libs
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// components
import InputField from "../form/input/input.component";

// firebase
import { updateUserProfile } from "../../firebase/firebase.utils";

const UserForm = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: user.email,
    fullName: user.fullName,
    displayName: user.displayName,
    password: "",
    confirmPassword: "",
    about: user.about,
  };
  const formElementsMap = [
    { type: "email", id: "email", label: "Email" },
    { type: "text", id: "fullName", label: "First and last name" },
    { type: "text", id: "displayName", label: "User name" },
    { type: "textarea", id: "about", label: "About" },
    { type: "password", id: "password", label: "Password" },
    { type: "password", id: "confirmPassword", label: "Confirm password" },
  ];

  // TODO export validation schema to separate file

  const formik = useFormik({
    initialValues: initialValues,
    initialTouched: false,
    validationSchema: Yup.object({
      fullName: Yup.string().min(5).max(25).required("Required"),
      displayName: Yup.string().min(5).max(25).required("Required"),
      about: Yup.string().min(10).max(255),
      password: Yup.string().min(8).max(25),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .min(8)
        .max(25),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      const data = gedChangedValues(values);
      await updateUserProfile(user, data);
      setLoading(false);
      // TODO toastr message
    },
  });

  const gedChangedValues = (values) => {
    const out = {};
    Object.keys(values).filter((value, idx) =>
      Object.values(values)[idx] !== Object.values(initialValues)[idx]
        ? (out[value] = Object.values(values)[idx])
        : false
    );
    return out;
  };

  return (
    <div>
      <form
        className={`ui form ${loading ? "loading" : ""}`}
        onSubmit={formik.handleSubmit}
      >
        {formElementsMap.map((element) => {
          return (
            <InputField
              key={element.id}
              label={element.label}
              name={element.id}
              formik={formik}
            >
              {element.type === "textarea" ? (
                <textarea
                  type={element.type}
                  id={element.id}
                  placeholder={element.label}
                  {...formik.getFieldProps(element.id)}
                />
              ) : (
                <input
                  type={element.type}
                  id={element.id}
                  placeholder={element.label}
                  {...formik.getFieldProps(element.id)}
                />
              )}
            </InputField>
          );
        })}
        <div className="ui divider"></div>
        <button type="submit" className="ui button teal">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
