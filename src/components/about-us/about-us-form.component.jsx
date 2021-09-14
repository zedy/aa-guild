// libs
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Dropdown } from 'semantic-ui-react';
import { toastr } from 'react-redux-toastr';

// styles
import './about-us.styles.scss';

// components
import InputField from '../form/form-element-wrapper.component';
import { image, rte } from '../form/form-elements.component';

// redux
import { getAboutUs } from '../../redux/misc/misc.selectors';

// data
import TOASTR_MESSAGES from '../../data/toastr-messages.data';

// firestore
import { updateAboutUs } from '../../firebase/firebase.utils';

// utils, helpers & static
import { INIT_VALUES, PRIMARY_KEYS, ELEMENTS_LIMIT } from './about-us.utils';

// helper functions
const imageElement = i => {
  return { type: 'image', id: `image_${i}`, label: 'Image/s' };
};

const rteElement = i => {
  return { type: 'rte', id: `rte_${i}`, label: 'Paragraph' };
};

const addMoreElementsExentsion = (callback, formik) => (
  <div className='add-more'>
    <Dropdown className='button icon primary' floating icon='plus'>
      <Dropdown.Menu>
        <Dropdown.Item>
          <div onClick={e => callback(e, formik)} data-type='rte'>
            <i className='icon paragraph'></i>
            Paragraph
          </div>
        </Dropdown.Item>
        <Dropdown.Item>
          <div onClick={e => callback(e, formik)} data-type='image'>
            <i className='icon image outline'></i>
            Image
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
);

const removeElementExtension = (key, formik) => (
  <button
    type='button'
    onClick={e => handleRemove(e, key, formik)}
    className='remove-element circular ui icon button red'>
    <i className='icon minus'></i>
  </button>
);

const initValues = firestoreData => {
  if (firestoreData === null || Object.keys(firestoreData).length === 0)
    return INIT_VALUES;

  const elements = [];

  firestoreData.keyOrder.forEach(key => {
    if (firestoreData.hasOwnProperty(key)) {
      elements.push({ [key]: firestoreData[key] });
    }
  });

  const values = Object.assign({}, INIT_VALUES);
  values.elements = elements;

  return values;
};

const prepFirestoreData = (refs, values) => {
  const data = {};
  const editorRefObjKeys = Object.keys(refs);

  editorRefObjKeys.forEach(key => {
    let rte = refs[key].current;

    if (typeof rte !== 'object') return;

    let text = rte.getContent();

    if (text.length) data[key] = text;
  });

  values.forEach(item => {
    const key = Object.keys(item)[0];

    if (key.includes('image')) data[key] = item[key];
  });

  return data;
};

const handleRemove = (e, key, { values, setValues }) => {
  e.preventDefault();

  const newElements = values.elements.filter(function (item) {
    const localKey = Object.keys(item)[0];
    return localKey !== key;
  });

  setValues({ elements: newElements });
};

const handleChange = (e, { values, setValues }) => {
  e.preventDefault();

  const elements = [...values.elements];
  const type = e.target.dataset.type;
  let count = 1;

  elements.forEach(item => {
    const key = Object.keys(item)[0];

    if (key.includes(type)) {
      count++;
    }
  });

  if (count >= ELEMENTS_LIMIT) {
    toastr.warning(TOASTR_MESSAGES.maxElementCount);
    return;
  }

  const key = type === 'rte' ? `rte_${count}` : `image_${count}`;
  const newElement = { [key]: '' };

  elements.push(newElement);
  setValues({ elements: elements });
};

// component
const AboutUsForm = () => {
  const firestoreData = useSelector(getAboutUs);
  const [loading, setLoading] = useState(false);
  const editorRefObj = {
    rte_1: useRef(''),
    rte_2: useRef(''),
    rte_3: useRef('')
  };

  const formik = useFormik({
    initialValues: initValues(firestoreData),
    initialTouched: false,
    onSubmit: async values => {
      setLoading(true);

      const data = prepFirestoreData(editorRefObj, [...values.elements]);

      if (!data || Object.keys(data).length === 0) {
        toastr.warning(TOASTR_MESSAGES.emptyFields);
        setLoading(false);
        return;
      }

      data.keyOrder = [];
      values.elements.forEach(item => {
        const key = Object.keys(item)[0];
        data.keyOrder.push(key);
      });

      const response = await updateAboutUs(data);

      toastr[response.status](response.message);
      setLoading(false);
    }
  });

  if (!firestoreData) return null;

  const imageCallback = (element, url) => {
    formik.setFieldValue(element, url);
    setLoading(false);
  };

  return (
    <div className='about-us-form'>
      <h1>Abous us form</h1>
      <form
        className={`ui form ${loading ? 'loading' : ''}`}
        onSubmit={formik.handleSubmit}>
        <div className='ui centered grid'>
          <div className='ten wide column'>
            {formik.values.elements.map(item => {
              const key = Object.keys(item)[0];
              const i = key.substr(key.length - 1);
              const element = key.includes('rte')
                ? rteElement(i)
                : imageElement(i);

              return (
                <InputField
                  key={element.id}
                  label={element.label}
                  name={element.id}
                  formik={formik}>
                  {key.includes('rte')
                    ? rte(item[`rte_${i}`], editorRefObj[key])
                    : null}
                  {key.includes('image')
                    ? image(
                        element,
                        imageCallback,
                        formik,
                        item[`image_${i}`],
                        setLoading,
                        item[`image_${i}`],
                        'Image',
                        'aboutus'
                      )
                    : null}
                  {!PRIMARY_KEYS.includes(key)
                    ? removeElementExtension(key, formik)
                    : null}
                </InputField>
              );
            })}
            {addMoreElementsExentsion(handleChange, formik)}
          </div>
        </div>
        <div className='ui centered grid'>
          <div className='ten wide column'>
            <div className='ui divider'></div>
            <button type='submit' className='ui button teal'>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AboutUsForm;
