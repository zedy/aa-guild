import * as Yup from "yup";

export const VALIDATION_SCHEMA = {
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
};

export const FIELDS_MAP = [
  { type: "text", id: "fullName", label: "Name" },
  { type: "email", id: "email", label: "Email" },
  { type: "text", id: "displayName", label: "User name" },
  { type: "password", id: "password", label: "Password" },
  { type: "password", id: "confirmPassword", label: "Confirm password" },
];

export const INIT_VALUES = {
  email: "",
  fullName: "",
  displayName: "",
  password: "",
  confirmPassword: "",
  newUser: true,
};
