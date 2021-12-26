import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import { MakeDictionary } from '../MakeDictionary';
import { UploadDictionary } from '../UploadDictionary';
import { ChangeDictionary } from '../ChangeDictionary';

import './style.css';

const DictionariesAdmin = () => {
  const [links] = useState([
    { text: 'Создать', link: 'new' },
    { text: 'Загрузить', link: 'upload' },
    { text: 'Изменить', link: 'modify' },
  ]);

  return (
    <section className='admin-dictionaries'>
      <nav className='admin-dictionaries__nav'>
        <ul>
          {links.map(({ text, link }) => (
            <li>
              <Link to={link}>{text}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className='admin-dictionaries__container'>
        <Routes>
          <Route
            path='/'
            element={<p>Добро пожаловать на страницу работы со словарями!</p>}
          />
          <Route path='/new' element={<MakeDictionary />} />
          <Route path='/upload' element={<UploadDictionary />} />
          <Route path='/modify' element={<ChangeDictionary />} />
          <Route />
        </Routes>
      </div>
    </section>
  );
};

export { DictionariesAdmin };
