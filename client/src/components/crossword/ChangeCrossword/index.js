import React, { useState, useEffect } from 'react';

import { CrosswordTable } from '../CrosswordTable';

import { isWordSuitable } from '../../../utils/isWordSuitable';
import { arrayContains } from '../../../utils/arrayContains';

import './style.css';

const initialWordsWrittenState = [];
const initialWordAttrsState = '';
const initialCellsChosenState = [];
const initialWordChosenState = [];

const ChangeCrossword = ({ width, height, dictName }) => {
  const [dictionary, setDictionary] = useState([]);
  const [wordsWritten, setWordsWritten] = useState(initialWordsWrittenState);
  const [wordAttrs, setWordAttrs] = useState(initialWordAttrsState);
  const [cellsChosen, setCellsChosen] = useState(initialCellsChosenState);
  const [wordChosen, setWordChosen] = useState(initialWordChosenState);

  // useEffect(() => {
  //   console.log('words written', wordsWritten);
  // }, [wordsWritten]);

  useEffect(() => {
    fetch(`http://localhost:8080/browse_dictionary?name=${dictName}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDictionary(data.dictionary.words);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dictName]);

  useEffect(() => {
    if (cellsChosen.length) {
      for (let i = 0; i < wordsWritten.length; i++) {
        if (arrayContains(wordsWritten[i], cellsChosen)) {
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
  }, [cellsChosen]);

  // useEffect(() => {
  //   console.log('wordChosen: ', wordChosen);
  // }, [wordChosen]);

  const onSelectChange = (event) => {
    cellsChosen.forEach(
      (cell, index) => (cell.textContent = event.target.value[index])
    );

    setWordsWritten([...wordsWritten, cellsChosen]);
  };

  return (
    <section className='crossword-manual'>
      <section className='crossword-manual__table'>
        <CrosswordTable
          width={width}
          height={height}
          setCellsChosen={setCellsChosen}
          wordChosen={wordChosen}
          setWordChosen={setWordChosen}
        />
      </section>

      <section className='crossword-manual__info'>
        <p>Словарь: {dictName}</p>

        <p>Сортировка</p>

        <div>
          <label>
            <input type='radio' name='sort' value='alphabet' />
            По алфавиту
          </label>

          <label>
            <input type='radio' name='sort' value='length' />
            По длине слов
          </label>
        </div>

        <select size={20} onChange={onSelectChange}>
          {dictionary
            .filter(({ word }) => isWordSuitable(word, wordAttrs))
            .map(({ word }) => (
              <option key={word} value={word}>
                {word}
              </option>
            ))}
        </select>

        <input type='text' placeholder='Название кроссворда' />

        <div>
          <button>Скачать</button>
          <button>Сохранить</button>
        </div>
      </section>
    </section>
  );
};

export { ChangeCrossword };
