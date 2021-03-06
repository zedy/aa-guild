// libs
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toastr } from 'react-redux-toastr';

// layouts
import FormLayout from '../../layouts/form.component';

// components
import InputField from '../form/form-element-wrapper.component';
import { text, image } from '../form/form-elements.component';
import { BackToDash, Submit } from '../buttons/buttons.component';

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
          {Submit()}
          {BackToDash()}
        </form>
      </FormLayout>
    </>
  );
};

export default BadgeForm;
