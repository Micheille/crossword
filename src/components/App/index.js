import React, { useState } from 'react';

import { CrosswordTable } from '../CrosswordTable';

import { useEffect } from 'react';

import { words } from '../../utils/mockData';
import { isWordSuitable } from '../../utils/isWordSuitable';

import './App.css';

const initialCellsChosenState = [];
const initialWordAttrsState = '';

function App() {
  const [width, setWidth] = useState(15);
  const [heigth, setHeigth] = useState(15);

  const [wordAttrs, setWordAttrs] = useState(initialWordAttrsState);
  const [cellsChosen, setCellsChosen] = useState(initialCellsChosenState);

  useEffect(() => {
    if (cellsChosen.length) {
      const wordAttrs = cellsChosen.reduce(
        (acc, cell) => (cell.textContent ? acc + cell.textContent : acc + '_'),
        ''
      );

      setWordAttrs(wordAttrs);
    }
  }, [cellsChosen]);

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

        <CrosswordTable
          width={width}
          height={heigth}
          setCellsChosen={setCellsChosen}
          setWordAttrs={setWordAttrs}
        />

        <section className='crossword-app__words'>
          <select
            size={20}
            onChange={(event) => {
              cellsChosen.forEach(
                (cell, index) => (cell.textContent = event.target.value[index])
              );
            }}
          >
            {words
              .filter((word) => isWordSuitable(word, wordAttrs))
              .map((word) => (
                <option key={word} value={word}>
                  {word}
                </option>
              ))}
          </select>
        </section>
      </main>
    </div>
  );
}

export default App;
