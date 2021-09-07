// libs
import React from 'react';
import DatePicker from 'react-datepicker';
import { Editor } from '@tinymce/tinymce-react';

// styles
import 'react-datepicker/dist/react-datepicker.css';

// components
import ImageUpload from '../image-upload/image-upload.component';

export const image = (
  element,
  callback,
  formik,
  presetImage,
  setLoading,
  value,
  placeholder,
  path
) => {
  return (
    <ImageUpload
      fileName={element.id}
      path={path}
      activeteLoader={setLoading}
      presetImage={presetImage}
      callback={callback}
      defaultImage={`https://via.placeholder.com/300x300.png?text=${placeholder}`}>
      <input
        type='hidden'
        id={element.id}
        {...formik.getFieldProps(element.id)}
        value={value}
      />
    </ImageUpload>
  );
};

export const textarea = (element, formik) => {
  return (
    <textarea
      type={element.type}
      id={element.id}
      placeholder={element.label}
      {...formik.getFieldProps(element.id)}
    />
  );
};

export const select = (element, formik, options) => (
  <select id={element.id} {...formik.getFieldProps(element.id)}>
    <option value='' disabled>
      Choose an option
    </option>
    {options}
  </select>
);

export const optionsItem = value => (
  <option value={value} key={value}>
    {value}
  </option>
);

export const text = (element, formik) => {
  return (
    <input
      type={element.type}
      id={element.id}
      placeholder={element.label}
      {...formik.getFieldProps(element.id)}
      autoComplete='off'
    />
  );
};

export const datePicker = (startDate, callback, id, formik) => {
  return (
    <>
      <input
        type='hidden'
        id={id}
        //{...formik.getFieldProps('date')}
      />
      <DatePicker
        id='dateFake'
        name='dateFake'
        selected={startDate}
        showTimeSelect
        dateFormat='MMMM d, yyyy h:mm aa'
        onChange={date => {
          formik.setFieldValue('date', date);
          callback(date);
        }}
      />
    </>
  );
};

export const rte = (value, editorRef) => {
  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={value}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </>
  );
};
