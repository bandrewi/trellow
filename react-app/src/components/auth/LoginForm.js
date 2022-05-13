import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchBoards } from '../../store/board';
import { fetchCards } from '../../store/card';
import { fetchLists } from '../../store/list';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
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
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <button type='submit'>Login</button>
        </div>
      </form>
      <button type='submit' onClick={demoLogin}>Demo Login</button>
    </>
  );
};

export default LoginForm;
