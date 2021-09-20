// libs
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';

// layouts
import FormLayout from '../../layouts/form.component';

// components
import InputField from '../form/form-element-wrapper.component';
import { text, image } from '../form/form-elements.component';
import { Placeholder } from '../static/static.component';

// utils
import { VALIDATION_SCHEMA, FIELDS_MAP, initValues } from './badge-form.utils';

// firebase
import { createBadge, updateBadges } from '../../firebase/firebase.utils';

// component
const BadgeForm = ({ badge, history }) => {
  const [loading, setLoading] = useState(false);
  const [badgeImage, setBadgeImage] = useState('');

  const formik = useFormik({
    initialValues: initValues(badge),
    initialTouched: false,
    validationSchema: Yup.object(VALIDATION_SCHEMA),
    onSubmit: async values => {
      setLoading(true);

      const response = badge
        ? await updateBadges(badge.id, values)
        : await createBadge(values);

      toastr[response.status](response.message);
      setLoading(false);
      history.push('/badges');
    }
  });

  const imageCallback = (element, url) => {
    setBadgeImage(url);
    formik.setFieldValue(element, url);
    setLoading(false);
  };

  if (!badge) return <Placeholder placeholderClass='fluid' />;

  return (
    <>
      <FormLayout>
        <h1>{!badge ? 'Create new badge' : `Edit badge ${badge.name}`}</h1>
        <form
          className={`ui form ${loading ? 'loading' : ''}`}
          onSubmit={formik.handleSubmit}>
          {FIELDS_MAP.map(element => {
            return (
              <InputField
                key={element.id}
                label={element.label}
                name={element.id}
                formik={formik}>
                {element.type === 'image'
                  ? image(
                      element,
                      imageCallback,
                      formik,
                      badge ? badge[element.id] : null,
                      setLoading,
                      badgeImage,
                      element.placeholder,
                      'badges'
                    )
                  : null}
                {element.type === 'text' ? text(element, formik) : null}
              </InputField>
            );
          })}
          <div className='ui divider'></div>
          <button type='submit' className='ui button teal'>
            Submit
          </button>
          <Link to='/admin/dashboard' className='ui button orange'>
            Cancel
          </Link>
        </form>
      </FormLayout>
    </>
  );
};

export default BadgeForm;
