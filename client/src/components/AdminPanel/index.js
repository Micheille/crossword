import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <section className='welcome'>
      <p>Добро пожаловать на страницу администратора!</p>

      <p>Составляйте новые кроссворды:  <Link to='/crosswords'>Кроссворды</Link></p>
      <p>Создавайте новые словари:  <Link to='/dictionaries'>Словари</Link></p>
    </section>
  );
};

export { AdminPanel };
