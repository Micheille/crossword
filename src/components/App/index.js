import React, { useState } from 'react';

import { CrosswordTable } from '../CrosswordTable';

import './App.css';

function App() {
  const [width, setWidth] = useState(15);
  const [heigth, setHeigth] = useState(15);

  return (
    <div className='crossword-app'>
      <header className='crossword-app__header'>
        <h1>Сrossword Puzzle Site</h1>
      </header>

      <main className='crossword-app__main'>
        <div className='crossword-app__size-inputs'>
          <label>
            Ширина
            <input
              type='number'
              min={10}
              max={30}
              value={width}
              onChange={(event) => setWidth(event.target.value)}
              id='width'
            />
          </label>

          <label>
            Высота
            <input
              type='number'
              min={10}
              max={30}
              value={heigth}
              onChange={(event) => setHeigth(event.target.value)}
              id='height'
            />
          </label>
        </div>

        <CrosswordTable width={width} height={heigth} />
      </main>
    </div>
  );
}

export default App;
