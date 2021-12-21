import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import { Tablist, Tab, Pane } from 'evergreen-ui';

import { MakeDictionary } from '../MakeDictionary';

import './style.css';

const DictionariesAdmin = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabs] = useState([
    { text: 'Создать', link: 'new' },
    { text: 'Загрузить', link: 'upload' },
    { text: 'Изменить', link: 'modify' },
  ]);

  return (
    <section class='admin-dictionaries'>
      <Tablist>
        {tabs.map(({ text, link }, index) => (
          <Tab
            key={text}
            id={text}
            onSelect={() => setSelectedTabIndex(index)}
            isSelected={index === selectedTabIndex}
            aria-controls={`panel-${text}`}
          >
            <Link className='admin-dictionaries__tab-link' to={link}>
              {text}
            </Link>
          </Tab>
        ))}
      </Tablist>

      <nav className='admin-dictionaries__nav'>
        <ul>
          <li>
            <Link to='new'>Создать</Link>
          </li>
          <li>
            <Link to='upload'>Загрузить</Link>
          </li>
          <li>
            <Link to='modify'>Изменить</Link>
          </li>
        </ul>
      </nav>

      <div className='admin-dictionaries__container'>
        <Routes>
          <Route
            path='/'
            element={<p>Добро пожаловать на страницу работы со словарями!</p>}
          />
          <Route path='/new' element={<MakeDictionary />} />
        </Routes>
      </div>
    </section>
  );
};

export { DictionariesAdmin };
