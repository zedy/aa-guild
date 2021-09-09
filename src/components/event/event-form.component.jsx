// libs
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toastr } from 'react-redux-toastr';

// components
import InputField from '../form/form-element-wrapper.component';
import {
  text,
  image,
  datePicker,
  select,
  optionsItem,
  rte
} from '../form/form-elements.component';

// firebase
import { createEvent, updateEvent } from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';

// redux
import {
  addEventToState,
  updateEventById
} from '../../redux/events/events.actions';

// utils
import {
  VALIDATION_SCHEMA,
  FIELD_MAP_LEFT,
  FIELD_MAP_RIGHT,
  initValues,
  generateSelectOptions
} from './event-form.utils';

const EventForm = ({ event, history }) => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(
    event ? new Date(event.date.seconds * 1000) : new Date()
  );
  const [heroImage, setHeroImage] = useState('');
  const [bodyImage, setBodyImage] = useState('');

  const formik = useFormik({
    initialValues: initValues(event),
    initialTouched: false,
    validationSchema: Yup.object(VALIDATION_SCHEMA),
    onSubmit: async values => {
      setLoading(true);
      values.text = editorRef.current.getContent();

      const response = event
        ? await updateEvent(event.id, values)
        : await createEvent(values);

      event
        ? dispatch(updateEventById(response.payload))
        : dispatch(addEventToState(response.payload));

      toastr[response.status](response.message);
      setLoading(false);
      history.push(`/events`);
    }
  });

  const imageCallback = (element, url) => {
    element === 'heroImage' ? setHeroImage(url) : setBodyImage(url);
    formik.setFieldValue(element, url);
    setLoading(false);
  };

  const optionsBuilder = element => {
    switch (element.id) {
      case 'session':
      case 'season':
        return generateSelectOptions(element.limit).map(item => {
          return optionsItem(item);
        });
      default:
        return null;
    }
  };

  return (
    <>
      <h1>{!event ? 'Event create' : 'Edit event'}</h1>
      <form
        className={`ui form ${loading ? 'loading' : ''}`}
        onSubmit={formik.handleSubmit}>
        <div className='ui grid'>
          <div className='four wide column'>
            {FIELD_MAP_LEFT.map(element => {
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
                        event ? event[element.id] : null,
                        setLoading,
                        element.id === 'heroImage' ? heroImage : bodyImage,
                        element.placeholder,
                        'event'
                      )
                    : null}
                </InputField>
              );
            })}
          </div>
          <div className='twelve wide column'>
            {FIELD_MAP_RIGHT.map(element => {
              return (
                <InputField
                  key={element.id}
                  label={element.label}
                  name={element.id}
                  formik={formik}>
                  {element.type === 'textarea'
                    ? rte(event ? event.text : '', editorRef)
                    : null}
                  {element.type === 'select'
                    ? select(element, formik, optionsBuilder(element))
                    : null}
                  {element.type === 'text' ? text(element, formik) : null}
                  {element.type === 'date'
                    ? datePicker(startDate, setStartDate, element.id, formik)
                    : null}
                </InputField>
              );
            })}
          </div>
        </div>
        <div className='ui divider'></div>
        <button type='submit' className='ui button teal'>
          Submit
        </button>
        <Link to='/admin/dashboard' className='ui button orange'>
          Cancel
        </Link>
      </form>
    </>
  );
};

export default EventForm;
