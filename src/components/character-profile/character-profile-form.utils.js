import * as Yup from 'yup';

export const VALIDATION_SCHEMA = {
  name: Yup.string().min(3).max(30).required('Required'),
  charClass: Yup.string().min(1).required('Required'),
  level: Yup.string().min(1).required('Required'),
  subClass: Yup.string().min(1).required('Required'),
  race: Yup.string().min(1).required('Required')
};

export const FIELDS_MAP = [
  { type: 'text', id: 'name', label: 'Name' },
  { type: 'select', id: 'level', label: 'Level' },
  { type: 'select', id: 'race', label: 'Race' },
  { type: 'select', id: 'class', label: 'Class' },
  { type: 'select', id: 'subClass', label: 'Sub class' }
];

export const initValues = data => {
  return {
    charClass: data ? data.charClass : '',
    subClass: data ? data.subClass : '',
    race: data ? data.race : '',
    level: data ? data.level : '',
    name: data ? data.name : ''
  };
};

export const generateLevelIncrements = () => {
  let levels = [];

  for (let i = 1; i < 21; i++) {
    levels.push(i);
  }

  return levels;
};
