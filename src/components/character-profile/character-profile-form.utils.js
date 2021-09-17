import * as Yup from 'yup';

export const VALIDATION_SCHEMA = {
  name: Yup.string().min(3).max(30).required('Required'),
  charClass: Yup.string().min(1).required('Required'),
  level: Yup.string().min(1).required('Required'),
  subClass: Yup.string().min(1).required('Required'),
  race: Yup.string().min(1).required('Required'),
  alignment: Yup.string().min(1).required('Required'),
  age: Yup.number().min(1).max(999).required('Required'),
  sex: Yup.string().min(1).max(10).required('Required'),
  height: Yup.number().min(1).max(999).required('Required'),
  background: Yup.string().min(1).max(1000).required('Required')
};

export const FIELDS_MAP = [
  { type: 'text', id: 'name', label: 'Name' },
  { type: 'select', id: 'level', label: 'Level' },
  { type: 'select', id: 'race', label: 'Race' },
  { type: 'select', id: 'class', label: 'Class' },
  { type: 'select', id: 'subClass', label: 'Sub class' },
  { type: 'text', id: 'age', label: 'Age' },
  { type: 'select', id: 'sex', label: 'Sex' },
  { type: 'text', id: 'height', label: 'Height (cm)' },
  { type: 'text', id: 'background', label: 'Background' },
  { type: 'select', id: 'alignment', label: 'Alignment' },
  { type: 'rte', id: 'bio', label: 'Character bio' }
];

export const initValues = data => {
  return {
    charClass: data && data.hasOwnProperty('charClass') ? data.charClass : '',
    subClass: data && data.hasOwnProperty('subClass') ? data.subClass : '',
    race: data && data.hasOwnProperty('race') ? data.race : '',
    level: data && data.hasOwnProperty('level') ? data.level : '',
    name: data && data.hasOwnProperty('name') ? data.name : '',
    age: data && data.hasOwnProperty('age') ? data.age : '',
    alignment: data && data.hasOwnProperty('alignment') ? data.alignment : '',
    bio: data && data.hasOwnProperty('bio') ? data.bio : '',
    sex: data && data.hasOwnProperty('sex') ? data.sex : '',
    height: data && data.hasOwnProperty('height') ? data.height : '',
    badges: data && data.hasOwnProperty('badges') ? data.badges : '',
    background: data && data.hasOwnProperty('background') ? data.background : ''
  };
};

export const generateLevelIncrements = () => {
  let levels = [];

  for (let i = 1; i < 21; i++) {
    levels.push(i);
  }

  return levels;
};
