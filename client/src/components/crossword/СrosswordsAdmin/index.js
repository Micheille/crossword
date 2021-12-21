import React from 'react';
import { Link } from 'react-router-dom';

const CrosswordsAdmin = () => {
  return (
    <section class='admin-crosswords'>
      <Link to='new'>Создать новый кроссворд</Link>

      <p>Выберите кроссворд для изменения:</p>
      <input type='file'></input>
    </section>
  );
};

export { CrosswordsAdmin };
