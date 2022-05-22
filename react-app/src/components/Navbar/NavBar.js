import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import Create from './Create';
import './navbar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  // CHANGES CLASS OF NAVBAR AFTER SCROLLING PAST IT
  function changeNav() {
    if (window.scrollY > 70) {
      const navBar = document.getElementById('nonuser-navbar')
      navBar?.classList.add('scrolled')
      document.removeEventListener('scroll', changeNav)
      document.addEventListener('scroll', changeNavBack)
    }
  }
  document.addEventListener('scroll', changeNav)

  // CHANGES CLASS OF NAVBAR BACK AFTER SCROLLING TO ITS ORIGINAL POSITION
  function changeNavBack() {
    if (window.scrollY < 70) {
      const navBar = document.getElementById('nonuser-navbar')
      navBar?.classList.remove('scrolled')
      document.removeEventListener('scroll', changeNavBack)
      document.addEventListener('scroll', changeNav)
    }
  }


  return (
    <>
      {user ? (
        <div id='user-navbar' className='flex-row'>
          <ul id='user-left' className='flex-row'>
            <li>
              <NavLink id='user-logo' to='/' exact={true} activeClassName='active'>
                <img id='user-logo' src='https://i.imgur.com/O0SRwmY.png' alt='Trellow' />
              </NavLink>
            </li>
            <li id='nav-board-container'>
              <NavLink id='nav-board' to='/'>
                Boards
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
