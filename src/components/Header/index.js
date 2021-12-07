import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.svg';

import './style.css';

const Header = ({ isAuthorized, setIsAuthorized }) => {
  const logoutHandler = (e) => {
    sessionStorage.setItem('isAuthorized', false);
    setIsAuthorized(false);
  };

  return (
    <header className='header'>
      <div className='header__container'>
        <h1 className='header__logo'>
          <Link to='/'>
            <img src={Logo} width='100px' alt='Логотип' />
          </Link>
        </h1>

        {isAuthorized ? (
          <nav className='header__nav'>
            <ul>
              <li>
                <Link to='/crosswords'>Кроссворды</Link>
              </li>
              <li>
                <a href='#'>Словари</a>
              </li>
              <li>
                <a href='#'>Справка</a>
              </li>
              <li>
                <button onClick={logoutHandler}>Выход</button>
              </li>
            </ul>
          </nav>
        ) : (
          <nav className='header__nav'>
            <ul>
              <li>
                <a href='#'>Каталог</a>
              </li>
              <li>
                <a href='#'>Справка</a>
              </li>
              <li>
                <Link to='/login'>Вход</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export { Header };
