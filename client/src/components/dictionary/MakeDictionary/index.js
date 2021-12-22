import React, { useState } from 'react';

import {
  Dialog,
  TextInputField,
  Button,
  Pane,
  InlineAlert,
} from 'evergreen-ui';

import { DictionaryTable } from '../DictionaryTable';

// import { words as mock } from '../../../utils/mockData';

import './style.css';

const MakeDictionary = () => {
  const [isDialogShown, setIsDialogShown] = useState(false);
  const [dictName, setDictName] = useState('');
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [words, setWords] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const makeJSON = () => {
    return {
      name: dictName,
      words: words,
    };
  };

  const handleSubmit = (e) => {
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

    e.preventDefault();
  };

  return (
    <form className='make-dictionary' onSubmit={handleSubmit}>
      <Dialog
        isShown={isDialogShown}
        title='Добавление понятия'
        onCloseComplete={() => setIsDialogShown(false)}
        onConfirm={() => {
          setWords([...words, { word: word, definition: definition }]);
          setIsDialogShown(false);
        }}
        confirmLabel='Добавить'
        cancelLabel='Отмена'
      >
        <TextInputField
          label='Понятие'
          description='Не должно повторяться.'
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />

        <TextInputField
          label='Определение'
          description='Значение слова.'
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
        />
      </Dialog>

      <label>
        Создать новый словарь понятий:
        <input
          type='text'
          required
          value={dictName}
          onChange={(e) => setDictName(e.target.value)}
        />
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
      </Pane>
    </form>
  );
};

export { MakeDictionary };