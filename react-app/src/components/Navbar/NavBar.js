import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import Create from './Create';
import './navbar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

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
        <div id='nonuser-navbar' className='flex-row'>
          <ul id='nonuser-left'>
            <li>
              <NavLink to='/'>
                <img id='nonuser-logo' src='https://i.imgur.com/yaeqUuy.png' alt='Trellow' />
              </NavLink>
            </li>
          </ul>
          <ul id='nonuser-right' className='flex-row'>
            <li>
              <NavLink id='login' to='/login' exact={true} activeClassName='active'>
                Log in
              </NavLink>
            </li>
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                <button id='signup'>Sign up</button>
              </NavLink>
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
