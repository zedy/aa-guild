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
  <Button type='button' classList='red' onClick={callback}>
    <i className='google icon'></i>
    Sign in with Google
  </Button>
);

export const EventUnregisterButton = ({ callback }) => (
  <Button onClick={e => callback(e)} classList='huge red'>
    Odjavi se sa event-a <i className='calendar minus icon'></i>
  </Button>
);

export const EventRegisterButton = ({ callback }) => (
  <Button onClick={e => callback(e)} classList='huge primary'>
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

export const AddBadgeToPlayer = callback => (
  <Button onClick={e => callback(e)} classList='teal'>
    Add badge <i className='ui plus icon'></i>
  </Button>
);

export const EditBadge = id => (
  <Link className='edit-button' to={`/badge/${id}/edit`}>
    <i className='ui edit icon'></i>
  </Link>
);

export const RemoveBadgeFromPlayer = (callback, badgeId) => (
  <Button
    onClick={e => callback(e, badgeId)}
    classList='mini red remove-button'>
    <i className='ui minus icon'></i>
  </Button>
);

export const CloseSidebar = callback => (
  <Button onClick={() => callback()} classList='white close-button'>
    <i className='ui close icon'></i>
  </Button>
);

export default Button;
