import * as Yup from 'yup';

export const VALIDATION_SCHEMA = {
  fullName: Yup.string().min(5).max(25).required('Required'),
  displayName: Yup.string().min(5).max(25).required('Required'),
  about: Yup.string().min(10).max(255),
  password: Yup.string().min(8).max(25),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .min(8)
    .max(25)
};

export const FIELDS_MAP = [
  { type: 'email', id: 'email', label: 'Email' },
  { type: 'text', id: 'fullName', label: 'First and last name' },
  { type: 'text', id: 'displayName', label: 'User name' },
  { type: 'textarea', id: 'about', label: 'About' },
  { type: 'password', id: 'password', label: 'Password' },
  { type: 'password', id: 'confirmPassword', label: 'Confirm password' }
];

export const initValues = user => {
  return {
    email: user ? user.email : '',
    fullName: user ? user.fullName : '',
    displayName: user ? user.displayName : '',
    password: '',
    confirmPassword: '',
    about: user ? user.about : ''
  };
};
