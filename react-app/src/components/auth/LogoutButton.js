import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    // WANT TO REDIRECT TO LOGIN PAGE BUT WON"T WORK BECAUSE OF HOW APP IS SET UP
    // NAVBAR IS IN USER COMP SO CAN"T ACCESS LOGIN PAGE ONCE ROUTED TO IT
    // return <Redirect to='/login' />;
    return <Redirect to='/' />;
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
