import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

import './signup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirected, setRedirected] = useState(true)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  // Gets email from cookie and sets email input value to it
  const cookie = document.cookie
  const cookieEmail = cookie.split('=')[1]

  useEffect(() => {
    if (cookieEmail && redirected) {
      setEmail(cookieEmail)
      document.cookie = 'email='
    }
    setRedirected(false)
  }, [cookieEmail, redirected])
  // --------------------------------------------

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Passwords must match'])
    }
  };

  function allFieldsFilled() {
    if (firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0) {
      return false
    }
    else {
      return true
    }
  }

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
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
      <div id='signup-container'>
        <form id='signup-form' onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} className='signup-errors'>{error}</div>
            ))}
          </div>
          <h1 id='signup-header'>Sign up for your account</h1>
          <div className='flex-column' >
            <label className='required'>First Name</label>
            <input
              className='signup-input'
              type='text'
              name='firstname'
              placeholder='First Name'
              onChange={updateFirstName}
              value={firstName}
            ></input>
          </div>
          <div className='flex-column'>
            <label className='required'>Last Name</label>
            <input
              className='signup-input'
              type='text'
              name='lastname'
              placeholder='Last Name'
              onChange={updateLastName}
              value={lastName}
            ></input>
          </div>
          <div className='flex-column'>
            <label className='required'>Email</label>
            <input
              className='signup-input'
              type='text'
              name='email'
              placeholder='Email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className='flex-column'>
            <label className='required'>Password</label>
            <input
              className='signup-input'
              type='password'
              name='password'
              placeholder='Password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='flex-column'>
            <label className='required'>Confirm Password</label>
            <input
              className='signup-input'
              type='password'
              name='confirm_password'
              placeholder='Confirm Password'
              onChange={updateConfirmPassword}
              value={confirmPassword}
            ></input>
          </div>
          <button
            id='form-signup-btn'
            type='submit'
            disabled={allFieldsFilled()}
          >
            Sign Up
          </button>
          <div id='separator' />
          <Link id='signup-form-login' to='/login'>Already have an account? Log In </Link>
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

export default SignUpForm;
