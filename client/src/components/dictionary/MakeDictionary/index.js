import React, { useEffect, useState } from 'react';

import {
  Dialog,
  TextInputField,
  Button,
  Pane,
  InlineAlert,
} from 'evergreen-ui';

import { DictionaryTable } from '../DictionaryTable';

import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';

import './style.css';

const MakeDictionary = () => {
  const [isDialogShown, setIsDialogShown] = useState(false);
  const [dictNames, setDictNames] = useState([]);
  const [dictName, setDictName] = useState('');
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [words, setWords] = useState([]);

  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');
  const [wordError, setWordError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/list_of_dictionaries')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDictNames(data.names);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const makeJSON = () => {
    return {
      name: dictName,
      words: words,
    };
  };

  const handleInputDictName = (e) => {
    setError('');
    setIsSaved(false);
    setDictName(e.target.value);
  };

  const handleDialogConfirm = () => {
    if (!(word && definition)) {
      setWordError('Заполните слово и определение');
    } else if (
      words.some((wordAndDef) => wordAndDef.word === word.toUpperCase())
    ) {
      setWordError('Слово уже записано');
    } else if (!/^([а-яА-ЯёЁ])+$/.test(word)) {
      setWordError(
        'Слово должно быть единственным и содержать только кириллицу'
      );
    } else if (!/^([^a-zA-Z])+$/.test(definition)) {
      setWordError('Определение не должно содержать латиницу');
    } else {
      setIsSaved(false);
      setWords([
        ...words,
        {
          word: word.toUpperCase(),
          definition: capitalizeFirstLetter(definition),
        },
      ]);
      setWord('');
      setDefinition('');
      setIsDialogShown(false);
    }
  };

  const handleSubmit = (e) => {
    if (dictNames.includes(dictName)) {
      setError('Словарь с таким именем уже существует');
    } else {
      setError('');

      fetch(`http://localhost:8080/save_dictionary?name=${dictName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(makeJSON()),
      })
        .then((response) => {
          if (response.ok) setIsSaved(true);
          return response.json();
        })
        .catch((error) => {
          console.log('error: ', error.message);
        });
    }

    e.preventDefault();
  };

  return (
    <form className='make-dictionary' onSubmit={handleSubmit}>
      <Dialog
        isShown={isDialogShown}
        title='Добавление понятия'
        onCloseComplete={() => {
          setIsDialogShown(false);
          setWord('');
          setDefinition('');
        }}
        onConfirm={handleDialogConfirm}
        confirmLabel='Добавить'
        cancelLabel='Отмена'
      >
        <TextInputField
          label='Понятие'
          description='Не должно повторяться.'
          value={word}
          onChange={(e) => {
            setWord(e.target.value);
            setWordError('');
          }}
        />

        <TextInputField
          label='Определение'
          description='Значение слова.'
          value={definition}
          onChange={(e) => {
            setDefinition(e.target.value);
            setWordError('');
          }}
        />

        {wordError && <InlineAlert intent='danger'>{wordError}</InlineAlert>}
      </Dialog>

      <label>
        Создать новый словарь понятий:
        <input
          type='text'
          required
          value={dictName}
          onChange={handleInputDictName}
          pattern='[а-яА-ЯёЁ0-9_ -]+'
          title='Допускаются кириллица, цифры, пробел и знаки _, -'
        ></input>
      </label>

      <p>
        <label>
          Добавить слово с определением:
          <button onClick={() => setIsDialogShown(true)}>+</button>
        </label>
      </p>

      <div className='make-dictionary__dictionary-container'>
        <DictionaryTable words={words} setWords={setWords} />
      </div>

      <Pane display='flex' flexDirection='row' justifyContent='space-between'>
        <Button type='submit' alignSelf='left'>
          Сохранить
        </Button>

        {isSaved && (
          <InlineAlert intent='success'>Словарь сохранён</InlineAlert>
        )}
        {error && <InlineAlert intent='danger'>{error}</InlineAlert>}
      </Pane>
    </form>
  );
};

export { MakeDictionary };
