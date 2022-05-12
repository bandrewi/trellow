import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import { authenticate } from './store/session';
import { fetchBoards } from './store/board';
import { fetchLists } from './store/list';
import { fetchCards } from './store/card';
import SplashPage from './components/SplashPage';
import HomePage from './components/HomePage';
import SingleBoard from './components/SingleBoard';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    (async () => {
      console.log('SET USER')
      const user = await dispatch(authenticate());
      console.log('USER', user)
      if (user) {
        console.log('FETCH CALLS')
        await dispatch(fetchBoards());
        await dispatch(fetchLists());
        await dispatch(fetchCards());
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  // useEffect(() => {
  //   // console.log('FETCH CALLS')
  //   // console.log('USER', user)
  //   (async () => {
  //     // console.log('ASYNC FETCH')
  //     if (user) {
  //       // console.log('FETCHED')
  //       await dispatch(fetchBoards());
  //       await dispatch(fetchLists());
  //       await dispatch(fetchCards());
  //     }
  //     setLoaded(true);
  //   })()
  // }, [dispatch, user])

  if (!loaded) {
    console.log('LOADED FALSE')
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/boards/:id' exact={true} >
          <SingleBoard />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          {user ? <HomePage /> : <SplashPage />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
