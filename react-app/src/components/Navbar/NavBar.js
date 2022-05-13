import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import Create from './Create';
import './navbar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  const body = document.querySelector('body')
  body.style.backgroundColor = '#eae6ff'

  return (
    <>
      {user ? (
        <div id='user-navbar'>
          <ul id='user-left' >
            <li>
              <NavLink to='/' exact={true} activeClassName='active'>
                Trellow
              </NavLink>
            </li>
            <li>
              <Create />
            </li>
          </ul>
          <ul id='user-right'>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      ) : (
        <div id='nonuser-navbar'>
          <ul id='nonuser-left'>
            <li>
              <img id='nonuser-logo' src='https://i.imgur.com/yaeqUuy.png' alt='Trellow' />
            </li>
          </ul>
          <ul id='nonuser-right'>
            <li>
              <NavLink id='login' to='/login' exact={true} activeClassName='active'>
                Log in
              </NavLink>
            </li>
            <li>
              <button id='signup'>Sign Up
                <NavLink to='/sign-up' exact={true} activeClassName='active' />
              </button>
            </li>
          </ul>
        </div>
      )
      }
      {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
    </>
  );
}

export default NavBar;
