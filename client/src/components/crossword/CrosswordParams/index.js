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
  const [chosenManualStep, setChosenManualStep] = useState(1);

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
    setManualStep(chosenManualStep);
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
          onChange={(e) => setWidth(e.target.value)}
        />

        <label htmlFor='height'>Высота:</label>
        <input
          id='height'
          type='number'
          min={10}
          max={20}
          onChange={(e) => setHeight(e.target.value)}
        />
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
        <select id='type' onChange= {(e) => setChosenManualStep(parseInt(e.target.value))}>
          <option value={1}>Ручной</option>
          <option value={2}>Автоматический</option>
        </select>
      </div>

      <div>
        <button onClick={onClickHandle}>Начать</button>
      </div>
    </section>
  );
};

export { CrosswordParams };
