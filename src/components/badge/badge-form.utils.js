import * as Yup from 'yup';

export const VALIDATION_SCHEMA = {
  badgeImage: Yup.string().min(10).max(250).required('Required'),
  description: Yup.string().min(10).max(100).required('Required'),
  name: Yup.string().min(5).max(100).required('Required')
};

export const FIELDS_MAP = [
  { type: 'text', id: 'name', label: 'Name' },
  { type: 'text', id: 'description', label: 'Description' },
  {
    type: 'image',
    id: 'badgeImage',
    label: 'Image',
    placeholder: 'Badge image'
  }
];

export const initValues = badge => ({
  description: badge ? badge.description : '',
  badgeImage: badge ? badge.badgeImage : '',
  name: badge ? badge.name : ''
});
