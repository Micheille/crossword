import React, { useState } from 'react';

import { Tablist, Tab, Pane } from 'evergreen-ui';

import { MakeDictionary } from '../MakeDictionary';
import { UploadDictionary } from '../UploadDictionary';
import { ChangeDictionary } from '../ChangeDictionary';

import './style.css';

const DictionariesAdmin = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabs] = useState([
    { text: 'Создать', link: 'new' },
    { text: 'Загрузить', link: 'upload' },
    { text: 'Изменить', link: 'modify' },
  ]);

  return (
    <section className='admin-dictionaries'>
      <Tablist>
        {tabs.map(({ text, link }, index) => (
          <Tab
            key={text}
            id={text}
            onSelect={() => setSelectedTabIndex(index)}
            isSelected={index === selectedTabIndex}
            aria-controls={`panel-${text}`}
          >
            {text}
          </Tab>
        ))}
      </Tablist>
      {/* 
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
      </nav> */}

      <div className='admin-dictionaries__container'>
        <Pane
          display={selectedTabIndex === 0 ? 'flex' : 'none'}
          flexDirection='column'
          flexGrow={1}
        >
          <MakeDictionary />
        </Pane>

        <Pane
          display={selectedTabIndex === 1 ? 'flex' : 'none'}
          flexDirection='column'
          flexGrow={1}
        >
          <UploadDictionary />
        </Pane>

        <Pane
          display={selectedTabIndex === 2 ? 'flex' : 'none'}
          flexDirection='column'
          flexGrow={1}
        >
          <ChangeDictionary />
        </Pane>
        {/* <Routes>
          <Route
            path='/'
            element={<p>Добро пожаловать на страницу работы со словарями!</p>}
          />
          <Route path='/new' element={<MakeDictionary />} />
        </Routes> */}
      </div>
    </section>
  );
};

export { DictionariesAdmin };
