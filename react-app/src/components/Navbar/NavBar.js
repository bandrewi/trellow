import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import Create from './Create';
import './navbar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <div id='nav-bar'>
      <ul id='nav-bar-ul'>
        {user ? (
          <>
            <li>
              <NavLink to='/' exact={true} activeClassName='active'>
                Home
              </NavLink>
            </li>
            <li>
              <LogoutButton />
            </li>
            <li>
              <Create />
            </li>
          </>) : (
          <>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
          </>
        )
        }
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
}

export default NavBar;
