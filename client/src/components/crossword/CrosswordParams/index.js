import React, { useState, useEffect } from 'react';

import './style.css';

const CrosswordParams = ({
  setWidth,
  setHeight,
  dictName,
  setDictName,
  setManualStep,
}) => {
  const [dictNames, setDictNames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/list_of_dictionaries')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDictNames(data.names);
        setDictName(data.names[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setDictName]);

  const onClickHandle = (e) => {
    setManualStep(1);
  };

  return (
    <section className='params'>
      <h3>Настройка параметров</h3>

      <div>
        <label htmlFor='width'>Ширина:</label>
        <input
          id='width'
          type='number'
          min={10}
          max={20}
          value={10}
          onChange={(e) => setWidth(e.target.value)}
        ></input>

        <label htmlFor='height'>Высота:</label>
        <input
          id='height'
          type='number'
          min={10}
          max={20}
          value={10}
          onChange={(e) => setHeight(e.target.value)}
        ></input>
      </div>

      <div>
        <label htmlFor='dictionary' className='params__label-line'>
          Подключение словаря понятий
        </label>
        <select
          id='dictionary'
          value={dictName}
          onChange={(e) => setDictName(e.target.value)}
        >
          {dictNames.map((dictName) => (
            <option key={dictName}>{dictName}</option>
          ))}
          <option>Просто так</option>
        </select>
      </div>

      <div>
        <label htmlFor='type' className='params__label-line'>
          Вид составления кроссворда
        </label>
        <select id='type'>
          <option>Ручной</option>
          <option>Автоматический</option>
        </select>
      </div>

      <div>
        <button onClick={onClickHandle}>Начать</button>
      </div>
    </section>
  );
};

export { CrosswordParams };
