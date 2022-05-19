import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { fetchBoards } from '../../store/board';
import { fetchCards } from '../../store/card';
import { fetchLists } from '../../store/list';
import { login } from '../../store/session';

import './login.css'

const LoginForm = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setError('Email or password is incorrrect');
    } else {
      await dispatch(fetchBoards());
      await dispatch(fetchLists());
      await dispatch(fetchCards());
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault()
    await dispatch(login('demo@aa.io', 'password'))
    await dispatch(fetchBoards());
    await dispatch(fetchLists());
    await dispatch(fetchCards());
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div id='login-trellow-logo-container'>
        <Link to='/'>
          <img id='login-trellow-logo' src='https://i.imgur.com/yaeqUuy.png' alt='Trellow' />
        </Link>
      </div>
      <div id='login-container'>
        <form id='login-form' onSubmit={onLogin}>
          <div id='login-error'>
            {error}
          </div>
          <h1 id='login-header'>Log in to Trellow</h1>
          <div>
            {/* <label htmlFor='email'>Email</label> */}
            <input
              className='login-input'
              id='login-email'
              name='email'
              type='text'
              placeholder='Enter email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            {/* <label htmlFor='password'>Password</label> */}
            <input
              className='login-input'
              id='login-password'
              name='password'
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button id='form-login-btn' type='submit'>Log in</button>
          <div id='or-separator'>OR</div>
          <button id='demo-btn' onClick={demoLogin}>Continue as a demo user</button>
          <div id='separator' />
          <Link id='login-form-sign-up' to='/sign-up'>Sign up for an account </Link>
        </form>
      </div>
      <div id='login-img-container'>
        <div id='login-img-1-container'>
          <img src='https://i.imgur.com/AA8OHXu.png' alt='' />
        </div>
        <div id='login-img-2-container'>
          <img src='https://i.imgur.com/jK6fFIJ.png' alt='' />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
