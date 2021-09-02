import * as Yup from 'yup';

export const VALIDATION_SCHEMA = {
  signupEmail: Yup.string()
    .email('Invalid email address')
    .min(8)
    .max(45)
    .required('Required'),
  signupPassword: Yup.string().required('Required')
};

export const FIELDS_MAP = [
  { type: 'email', id: 'signupEmail', label: 'Email' },
  { type: 'password', id: 'signupPassword', label: 'Password' }
];

export const INIT_VALUES = {
  signupEmail: '',
  signupPassword: ''
};
