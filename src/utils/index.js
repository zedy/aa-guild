// libs
import React from 'react';

// static
import { Placeholder } from '../components/static/static.component';

export const convertDateToUTCString = date => {
  var theDate = new Date(date * 1000);
  return theDate.toUTCString();
};

export const renderPlaceholders = number => {
  let placeholder = [];

  for (let i = 0; i < number; i++) {
    placeholder.push(<Placeholder key={i} placeholderClass='fluid' />);
  }

  return placeholder;
};
