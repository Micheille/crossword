import React, { useState, useEffect } from 'react';

import { CrosswordTable } from '../CrosswordTable';
import { SizeInputs } from '../SizeInputs';

import { words } from '../../utils/mockData';
import { isWordSuitable } from '../../utils/isWordSuitable';
import { arrayContains } from '../../utils/arrayContains';

import './App.css';

const initialCellsChosenState = [];
const initialWordAttrsState = '';
const initialWordChosenState = [];

function App() {
  const [width, setWidth] = useState(15);
  const [heigth, setHeigth] = useState(15);

  const [wordsWritten, setWordsWritten] = useState([]);
  const [wordAttrs, setWordAttrs] = useState(initialWordAttrsState);
  const [cellsChosen, setCellsChosen] = useState(initialCellsChosenState);
  const [wordChosen, setWordChosen] = useState(initialWordChosenState);

  const onSelectChange = (event) => {
    cellsChosen.forEach(
      (cell, index) => (cell.textContent = event.target.value[index])
    );

    setWordsWritten([...wordsWritten, cellsChosen]);
  };

  useEffect(() => {
    console.log('wordChosen: ', wordChosen);
  }, [wordChosen]);

  useEffect(() => {
    if (cellsChosen.length) {
      for (let i = 0; i < wordsWritten.length; i++) {
        if (arrayContains(wordsWritten[i], cellsChosen)) {
          console.log('contains: ', wordsWritten[i], cellsChosen);
          setWordChosen(wordsWritten[i]);
          break;
        }
      }

      const wordAttrs = cellsChosen.reduce(
        (acc, cell) => (cell.textContent ? acc + cell.textContent : acc + '_'),
        ''
      );

      setWordAttrs(wordAttrs);
    }
  }, [cellsChosen, wordsWritten]);

  useEffect(() => {
    console.log('words written', wordsWritten);
  }, [wordsWritten]);

  return (
    <div className='app'>
      <header className='app__header'>
        <h1>Сrossword Puzzle Site</h1>
      </header>

      <main className='app__main'>
        <section className='app__crossword'>
          <div className='app__size-inputs'>
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
            wordChosen={wordChosen}
            setWordChosen={setWordChosen}
          />
        </section>

        <section className='app__words'>
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
