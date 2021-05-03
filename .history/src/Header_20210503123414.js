import React from 'react';
import { logout } from './firebase/auth';
import { useHistory } from 'react-router-dom';

function Header() {

  const logoutUser = () async => {
    await logout();
    history.pushState('/signup');
  };
  return (
    <header>
      <h2>Scout</h2>
      <button className='ui secondary button logout' onClick={logoutUser}>
      LOGOUT
      </button>
    </header>
  );
}

export default Header;
