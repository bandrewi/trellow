import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import clearStore from '../../store/clear';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(clearStore())
    history.push('/')
    // trying to logout when on a single board page messes up the login page css
    // history.push('/login')
  };

  return <button id='logout-btn' onClick={onLogout}>Log out</button>;
};

export default LogoutButton;
