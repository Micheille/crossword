import React, { useState, useEffect } from 'react';

import { CrosswordTable } from '../CrosswordTable';
import { SizeInputs } from '../SizeInputs';

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

  const onSelectChange = (event) => {
    cellsChosen.forEach(
      (cell, index) => (cell.textContent = event.target.value[index])
    );
  };

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
        <section className='crossword-app__crossword'>
          <div className='crossword-app__size-inputs'>
            <SizeInputs
              width={width}
              setWidth={setWidth}
              heigth={heigth}
              setHeigth={setHeigth}
            />
          </div>

          <CrosswordTable
            width={width}
            height={heigth}
            setCellsChosen={setCellsChosen}
            setWordAttrs={setWordAttrs}
          />
        </section>

        <section className='crossword-app__words'>
          <select size={20} title='dd' onChange={onSelectChange}>
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
