import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import './style.css';

const AuthForm = ({ setIsAuthorized }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username !== 'admin')
      setError('Проверьте правильность имени администратора');
    else if (password !== '123456')
      setError('Проверьте правильность ввода пароля');
    else {
      sessionStorage.setItem('isAuthorized', true);
      setIsAuthorized(true);
      navigate('/');
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  return (
    <section className='auth-section'>
      <form className='form' onSubmit={handleSubmit}>
        <label>
          Логин:
          <input type='text' onChange={handleUsernameChange}></input>
        </label>

        <label>
          Пароль:
          <input type='password' onChange={handlePasswordChange}></input>
        </label>

        <button type='submit'>Войти</button>

        {error ? <p>{error}</p> : <></>}
      </form>
    </section>
  );
};

export { AuthForm };
