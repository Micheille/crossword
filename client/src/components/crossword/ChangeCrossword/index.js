import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { InlineAlert } from 'evergreen-ui';

import { CrosswordTable } from '../CrosswordTable';

import { isWordSuitable } from '../../../utils/isWordSuitable';
import { arrayContains } from '../../../utils/arrayContains';

import './style.css';

const initialWordsCellsWrittenState = [];
const initialWordAttrsState = '';
const initialCellsChosenState = [];
const initialWordChosenState = [];
let flag=false;

const horizontalValue = 1;
const verticalValue = -1;

const ChangeCrossword = () => {
  const { crossName } = useParams();

  const [crosswordWords, setCrosswordWords] = useState([]);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [dictName] = useState('Общий словарь');
  const [dictionary, setDictionary] = useState([]);
  const [wordsForSelect, setWordsForSelect] = useState([]);
  const [wordsCellsWritten, setWordsCellsWritten] = useState(
    initialWordsCellsWrittenState
  );
  const [wordInfoWritten, setWordInfoWritten] = useState([]);
  const [wordAttrs, setWordAttrs] = useState(initialWordAttrsState);
  const [cellsChosen, setCellsChosen] = useState(initialCellsChosenState);
  const [wordChosen, setWordChosen] = useState(initialWordChosenState);
  const [wordInDictionary, setWordInDictionary] = useState('');

  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/browse_crossword?name=${crossName}`)
      .then((response) => {
        if (response.ok) {
          //setIsUploaded(true);
        } else alert(response.message);
        return response.json();
      })
      .then((data) => {
        setCrosswordWords(data.crossword.words);
        setWidth(data.crossword.m);
        setHeight(data.crossword.n);
      })
      .catch((error) => console.log(error));
  }, [crossName]);

  useEffect(() => {
    fetch(`http://localhost:8080/browse_dictionary?name=${dictName}`)
      .then((response) => {
        if(!response.ok) flag=true;
        return response.json();
      })
      .then((data) => {
        if(flag) alert (data.message);
        const words = data.dictionary.words;
        setDictionary(words);
        setWordsForSelect(words);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dictName]);

  useEffect(() => {
    if (crosswordWords.length && width && height && dictionary) {
      console.log('words from crossword: ', crosswordWords);

      const table = document
        .getElementsByClassName('table')
        .item(0)
        .childNodes.item(0).childNodes;

      let wordsCellsWrittenLocal = [];
      let wordsForSelectLocal = dictionary;

      crosswordWords.forEach(({ word, i, j, direction, definition }) => {
        let wordCells = [];

        if (direction === horizontalValue) {
          for (let k = j; k < j + word.length; k++) {
            const cell = table.item(i).childNodes.item(k);
            cell.textContent = word[k - j];
            wordCells = [...wordCells, cell];
          }
        } else {
          for (let k = i; k < i + word.length; k++) {
            const cell = table.item(k).childNodes.item(j);
            cell.textContent = word[k - i];
            wordCells = [...wordCells, cell];
          }
        }

        wordsCellsWrittenLocal = [...wordsCellsWrittenLocal, wordCells];
        wordsForSelectLocal = wordsForSelectLocal.filter(
          (wordForSelect) => wordForSelect.word !== word
        );
      });

      setWordsCellsWritten(wordsCellsWrittenLocal);
      setWordInfoWritten(crosswordWords);
      setWordsForSelect(wordsForSelectLocal);
    }
  }, [crosswordWords, width, height, dictionary]);

  useEffect(() => {
    if (cellsChosen.length) {
      for (let i = 0; i < wordsCellsWritten.length; i++) {
        if (arrayContains(wordsCellsWritten[i], cellsChosen)) {
          setWordChosen(wordsCellsWritten[i]);
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
    if (cellsChosen.length > 2) {
      cellsChosen.forEach(
        (cell, index) => (cell.textContent = event.target.value[index])
      );

      const fullWord = dictionary.filter(({ word, definition }) => {
        return word === event.target.value;
      })[0];
      const i = +cellsChosen[0].attributes.y.value;
      const j = +cellsChosen[0].attributes.x.value;
      const nextI = +cellsChosen[1].attributes.y.value;
      const direction = nextI > i ? verticalValue : horizontalValue;

      setWordInfoWritten([
        ...wordInfoWritten,
        {
          word: fullWord.word,
          i: i,
          j: j,
          direction: direction,
          definition: fullWord.definition,
        },
      ]);

      setWordsCellsWritten([...wordsCellsWritten, cellsChosen]);
      setWordsForSelect(
        wordsForSelect.filter(
          ({ word, definition }) => word !== event.target.value
        )
      );

      setIsSaved(false);
    }
  };

  const onWordDelete = () => {
    for (let k = 0; k < wordChosen.length; k++) {
      let count = 0;

      for (let i = 0; i < wordsCellsWritten.length; i++) {
        for (let j = 0; j < wordsCellsWritten[i].length; j++) {
          if (wordChosen[k] === wordsCellsWritten[i][j]) {
            count++;
          }
        }
      }

      if (count < 2) {
        wordChosen[k].textContent = '';
      }
    }

    setWordInfoWritten(
      wordInfoWritten.filter((wordInfo) => {
        console.log(wordInfo.word);
        console.log(wordInDictionary.word);
        return wordInfo.word !== wordInDictionary.word;
      })
    );
    setWordsCellsWritten(
      wordsCellsWritten.filter(
        (wordCells) => !arrayContains(wordCells, wordChosen)
      )
    );
    setWordsForSelect([
      ...wordsForSelect,
      { word: wordInDictionary.word, definition: wordInDictionary.definition },
    ]);
    setWordChosen([]);

    setIsSaved(false);
  };

  const makeJSON = (crosswordName, width, height, wordInfoWritten) => {
    return {
      name: crosswordName,
      words: wordInfoWritten,
      n: height,
      m: width,
    };
  };

  const onSubmitSave = (e) => {
    console.log(makeJSON(crossName, width, height, wordInfoWritten));

    setError('');

    fetch(`http://localhost:8080/save_crossword?name=${crossName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(makeJSON(crossName, width, height, wordInfoWritten)),
    })
      .then((response) => {
        if (response.ok) setIsSaved(true);
        return response.json();
      })
      .catch((error) => {
        console.log('error: ', error.message);
      });

    e.preventDefault();
  };

  const sortAlphabetical = () => {
    const elem = document.querySelector('select');
    var tmpAry = [];
    // Grab all existing entries
    for (let i = 0; i < elem.options.length; i++) tmpAry.push(elem.options[i]);
    // Sort array by text attribute
    tmpAry.sort(function (a, b) {
      return a.text < b.text ? -1 : 1;
    });
    // Wipe out existing elements
    while (elem.options.length > 0) elem.options[0] = null;
    // Restore sorted elements
    for (let i = 0; i < tmpAry.length; i++) {
      elem.options[i] = tmpAry[i];
    }
  };

  const sortByLength = () => {
    const elem = document.querySelector('select');
    var tmpAry = [];
    // Grab all existing entries
    for (let i = 0; i < elem.options.length; i++) tmpAry.push(elem.options[i]);
    // Sort array by text attribute
    tmpAry.sort(function (a, b) {
      return a.text.length < b.text.length ? -1 : 1;
    });
    // Wipe out existing elements
    while (elem.options.length > 0) elem.options[0] = null;
    // Restore sorted elements
    for (let i = 0; i < tmpAry.length; i++) {
      elem.options[i] = tmpAry[i];
    }
  };

  return (
    <form className='crossword-manual' onSubmit={onSubmitSave}>
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
                <input
                  type='radio'
                  name='sort'
                  value='alphabet'
                  onClick={sortAlphabetical}
                />
                По алфавиту
              </label>

              <label>
                <input
                  type='radio'
                  name='sort'
                  value='length'
                  onClick={sortByLength}
                />
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

        <div>
          <button type='submit'>Сохранить</button>
          <button>Скачать</button>
          {isSaved && (
            <InlineAlert intent='success'>Кроссворд сохранён</InlineAlert>
          )}
          {error && <InlineAlert intent='danger'>{error}</InlineAlert>}
        </div>
      </section>
    </form>
  );
};

export { ChangeCrossword };
