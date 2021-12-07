import React from 'react';

import './style.css';

const CrosswordParams = ({ setWidth, setHeight, setManualStep }) => {
  const onClickHandle = (e) => {
    setManualStep(1);
  };

  return (
    <section class='params'>
      <h3>Настройка параметров</h3>

      <div>
        <label for='width'>Ширина:</label>
        <input
          id='width'
          type='number'
          min={10}
          max={20}
          value={15}
          onChange={(e) => setWidth(e.target.value)}
        ></input>

        <label for='height'>Высота:</label>
        <input
          id='height'
          type='number'
          min={10}
          max={20}
          value={15}
          onChange={(e) => setHeight(e.target.value)}
        ></input>
      </div>

      <div>
        <label for='dictionary' className='params__label-line'>
          Подключение словаря понятий
        </label>
        <select id='dictionary'>
          <option>Базовый</option>
        </select>
      </div>

      <div>
        <label for='type' className='params__label-line'>
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
