// libs
import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, classList, isGoogleSignIn, ...otherProps }) => (
  <button className={`ui ${classList} button`} {...otherProps}>
    {children}
  </button>
);

export const SignIn = () => (
  <Button classList='teal' type='submit'>
    Sign in
  </Button>
);

export const Submit = () => (
  <Button classList='teal' type='submit'>
    Submit
  </Button>
);

export const GoogleSignIn = callback => (
  <Button classList='red' onClick={callback}>
    <i className='google icon'></i>
    Sign in with Google
  </Button>
);

export const EventUnregisterButton = ({ onClick }) => (
  <Button
    onClick={() => {
      onClick(true);
    }}
    classList='huge red'>
    Odjavi se sa event-a <i className='calendar minus icon'></i>
  </Button>
);

export const EventRegisterButton = ({ onClick }) => (
  <Button
    onClick={() => {
      onClick(true);
    }}
    classList='huge primary'>
    Prijavite se na event <i className='calendar plus icon'></i>
  </Button>
);

export const EventRedirectLink = () => (
  <Link to='/signin' className='ui huge primary button'>
    Prijavite se na event <i className='calendar plus icon'></i>
  </Link>
);

export const EditEvent = id => (
  <Link className='ui orange button' to={`/event/${id}/edit`}>
    <i className='edit icon'></i>Edit event
  </Link>
);

export const EditNews = id => (
  <Link className='ui orange button' to={`/news/${id}/edit`}>
    <i className='edit icon'></i>Edit news article
  </Link>
);

export const ManagePlayers = id => (
  <Link className='ui olive button' to={`/event/${id}/player-list`}>
    <i className='users icon'></i>Manage players
  </Link>
);

export const BackToDash = () => (
  <Link to='/admin/dashboard' className='ui button orange'>
    Cancel
  </Link>
);

export default Button;
