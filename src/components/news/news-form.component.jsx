// libs
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toastr } from 'react-redux-toastr';

// components
import InputField from '../form/form-element-wrapper.component';
import { text, image, rte } from '../form/form-elements.component';

// redux
import {
  addArticleToState,
  updateNewsArticleById
} from '../../redux/news/news.actions';

// utils
import {
  VALIDATION_SCHEMA,
  FIELDS_MAP_LEFT,
  FIELDS_MAP_RIGHT,
  initValues
} from './news-form.utils';

// firebase
import { createNews, updateNews } from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';

// component
const NewsForm = ({ newsArticle, history }) => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [heroImage, setHeroImage] = useState('');
  const [bodyImage, setBodyImage] = useState('');

  const formik = useFormik({
    initialValues: initValues(newsArticle),
    initialTouched: false,
    validationSchema: Yup.object(VALIDATION_SCHEMA),
    onSubmit: async values => {
      setLoading(true);
      values.article = editorRef.current.getContent();

      const response = newsArticle
        ? await updateNews(newsArticle.id, values)
        : await createNews(values);

      newsArticle
        ? dispatch(updateNewsArticleById(response.payload))
        : dispatch(addArticleToState(response.payload));
      toastr[response.status](response.message);
      setLoading(false);
      history.push(`/news`);
    }
  });

  const imageCallback = (element, url) => {
    element === 'heroImage' ? setHeroImage(url) : setBodyImage(url);
    formik.setFieldValue(element, url);
    setLoading(false);
  };

  return (
    <>
      <h1>{!newsArticle ? 'News create' : 'Edit news'}</h1>
      <form
        className={`ui form ${loading ? 'loading' : ''}`}
        onSubmit={formik.handleSubmit}>
        <div className='ui grid'>
          <div className='four wide column'>
            {FIELDS_MAP_LEFT.map(element => {
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
                        newsArticle ? newsArticle[element.id] : null,
                        setLoading,
                        element.id === 'heroImage' ? heroImage : bodyImage,
                        element.placeholder,
                        'news'
                      )
                    : null}
                </InputField>
              );
            })}
          </div>
          <div className='twelve wide column'>
            {FIELDS_MAP_RIGHT.map(element => {
              return (
                <InputField
                  key={element.id}
                  label={element.label}
                  name={element.id}
                  formik={formik}>
                  {element.type === 'textarea'
                    ? rte(newsArticle ? newsArticle.article : '', editorRef)
                    : null}
                  {element.type === 'text' ? text(element, formik) : null}
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

export default NewsForm;
