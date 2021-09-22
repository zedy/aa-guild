import * as Yup from 'yup';

export const VALIDATION_SCHEMA = {
  headline: Yup.string().min(10).max(50).required('Required'),
  location: Yup.string().min(4).max(25).required('Required'),
  season: Yup.number().positive().integer().required('Required'),
  session: Yup.number().positive().integer().required('Required'),
  text: Yup.string().min(50).max(2000).required('Required'),
  date: Yup.string().min(8).max(80).required('Required'),
  latitude: Yup.number().required('Required'),
  longitude: Yup.number().required('Required'),
  bodyImage: Yup.string().required('Required'),
  heroImage: Yup.string().required('Required')
};

export const FIELD_MAP_LEFT = [
  {
    type: 'image',
    id: 'heroImage',
    label: 'Hero image',
    placeholder: 'Event hero image'
  },
  {
    type: 'image',
    id: 'bodyImage',
    label: 'Body image',
    placeholder: 'Event image'
  }
];

export const FIELD_MAP_RIGHT = [
  { type: 'text', id: 'headline', label: 'Headline' },
  { type: 'text', id: 'location', label: 'Location' },
  { type: 'select', id: 'season', label: 'Season', limit: '6' },
  { type: 'select', id: 'session', label: 'Session', limit: '16' },
  { type: 'textarea', id: 'text', label: 'Text' },
  { type: 'text', id: 'date', label: 'Choose date' },
  { type: 'text', id: 'latitude', label: 'Latitude' },
  { type: 'text', id: 'longitude', label: 'Longitude' }
];

export const initValues = event => {
  return {
    headline: event ? event.headline : '',
    location: event ? event.location : '',
    season: event ? event.season : '',
    session: event ? event.session : '',
    text: event ? event.text : '',
    date: event ? event.date.seconds : '',
    latitude: event ? event.geoLocation.latitude : '',
    longitude: event ? event.geoLocation.longitude : '',
    bodyImage: event ? event.bodyImage : '',
    heroImage: event ? event.heroImage : ''
  };
};

export const generateSelectOptions = limit => {
  let options = [];

  for (let i = 1; i < limit; i++) {
    options.push(i);
  }

  return options;
};
