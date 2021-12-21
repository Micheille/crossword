import React, { useState } from 'react';

import { Dialog, TextInputField } from 'evergreen-ui';

import { DictionaryTable } from '../DictionaryTable';

import { words as mock } from '../../../utils/mockData';

import './style.css';

const MakeDictionary = () => {
  const [isDialogShown, setIsDialogShown] = useState(false);
  const [word, setWord] = useState('');
  const [description, setDescription] = useState('');
  const [words, setWords] = useState(mock);

  return (
    <section className='make-dictionary'>
      <Dialog
        isShown={isDialogShown}
        title='Добавление понятия'
        onCloseComplete={() => setIsDialogShown(false)}
        onConfirm={() => {
          setWords([...words, word]);
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Dialog>

      <label>
        Создать новый словарь понятий:
        <input type='text' />
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
    </section>
  );
};

export { MakeDictionary };
