import * as Yup from 'yup';

export const VALIDATION_SCHEMA = {
  signinEmail: Yup.string()
    .email('Invalid email address')
    .min(8)
    .max(45)
    .required('Required'),
  signinPassword: Yup.string().required('Required')
};

export const FIELDS_MAP = [
  { type: 'email', id: 'signinEmail', label: 'Email' },
  { type: 'password', id: 'signinPassword', label: 'Password' }
];

export const INIT_VALUES = {
  signupEmail: '',
  signinPassword: ''
};
