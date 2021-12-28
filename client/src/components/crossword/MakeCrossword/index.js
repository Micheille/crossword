import React, { useState, useEffect } from 'react';

import { CrosswordTable } from '../CrosswordTable';

import { isWordSuitable } from '../../../utils/isWordSuitable';
import { arrayContains } from '../../../utils/arrayContains';

import './style.css';

const initialWordsWrittenState = [];
const initialWordAttrsState = '';
const initialCellsChosenState = [];
const initialWordChosenState = [];

const MakeCrossword = ({ width, height, dictName }) => {
  const [dictionary, setDictionary] = useState([]);
  const [wordsForSelect, setWordsForSelect] = useState([]);
  const [wordsWritten, setWordsWritten] = useState(initialWordsWrittenState);
  const [wordAttrs, setWordAttrs] = useState(initialWordAttrsState);
  const [cellsChosen, setCellsChosen] = useState(initialCellsChosenState);
  const [wordChosen, setWordChosen] = useState(initialWordChosenState);
  const [wordInDictionary, setWordInDictionary] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/browse_dictionary?name=${dictName}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const words = data.dictionary.words;
        setDictionary(words);
        setWordsForSelect(words);
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
          return;
        }
      }

      const wordAttrs = cellsChosen.reduce(
        (acc, cell) => (cell.textContent ? acc + cell.textContent : acc + '_'),
        ''
      );

      setWordChosen([]);
      setWordAttrs(wordAttrs);
    }
  }, [cellsChosen]);

  useEffect(() => {
    let wordFromCells = '';

    for (let i = 0; i < wordChosen.length; i++) {
      wordFromCells += wordChosen[i].textContent;
    }

    setWordInDictionary(
      dictionary.filter(({ word, definition }) => word === wordFromCells)[0]
    );
  }, [wordChosen, dictionary]);

  const onSelectChange = (event) => {
    cellsChosen.forEach(
      (cell, index) => (cell.textContent = event.target.value[index])
    );

    setWordsWritten([...wordsWritten, cellsChosen]);
    setWordsForSelect(
      wordsForSelect.filter(
        ({ word, definition }) => word !== event.target.value
      )
    );
  };

  const onWordDelete = () => {
    for (let k = 0; k < wordChosen.length; k++) {
      let count = 0;

      for (let i = 0; i < wordsWritten.length; i++) {
        for (let j = 0; j < wordsWritten[i].length; j++) {
          if (wordChosen[k] === wordsWritten[i][j]) {
            count++;
          }
        }
      }

      if (count < 2) {
        wordChosen[k].textContent = '';
      }
    }

    setWordChosen([]);
    setWordsWritten(
      wordsWritten.filter((wordCells) => !arrayContains(wordCells, wordChosen))
    );
    setWordsForSelect([
      ...wordsForSelect,
      { word: wordInDictionary.word, definition: wordInDictionary.definition },
    ]);
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

        {wordInDictionary ? (
          <div>
            <div>{wordInDictionary.word}</div>
            <div>{wordInDictionary.definition}</div>

            <button type='button' onClick={onWordDelete}>
              Удалить
            </button>
          </div>
        ) : (
          <div>
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
              {wordsForSelect
                .filter(({ word }) => isWordSuitable(word, wordAttrs))
                .map(({ word }) => (
                  <option key={word} value={word}>
                    {word}
                  </option>
                ))}
            </select>
          </div>
        )}

        <input type='text' placeholder='Название кроссворда' />

        <div>
          <button>Скачать</button>
          <button>Сохранить</button>
        </div>
      </section>
    </section>
  );
};

export { MakeCrossword };
