import React, { useState, useEffect } from 'react';

import {
  Dialog,
  SelectMenu,
  TextInputField,
  Button,
  Pane,
  InlineAlert,
} from 'evergreen-ui';

import { DictionaryTable } from '../DictionaryTable';

import './style.css';

const ChangeDictionary = () => {
  const [isDialogShown, setIsDialogShown] = useState(false);

  const [dictionaries, setDictionaries] = useState([]);
  const [dictName, setDictName] = useState('');

  const [words, setWords] = useState([]);
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/list_of_dictionaries')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDictionaries(data.names);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    dictName &&
      fetch(`http://localhost:8080/browse_dictionary?name=${dictName}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setWords(data.dictionary.words);
        })
        .catch((error) => {
          console.log(error);
        });

    setIsSaved(false);
  }, [dictName]);

  const makeJSON = () => {
    return {
      name: dictName,
      words: words,
    };
  };

  const handleDialogConfirm = () => {
    setWords([...words, { word: word, definition: definition }]);
    setIsDialogShown(false);
    setIsSaved(false);
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
        onConfirm={handleDialogConfirm}
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

      <SelectMenu
        title='Выберите словарь'
        options={dictionaries.map((label) => ({ label, value: label }))}
        selected={dictName}
        onSelect={(item) => setDictName(item.value)}
        closeOnSelect
      >
        <Button type='button'>
          {dictName || 'Изменить словарь понятий...'}
        </Button>
      </SelectMenu>

      {dictName ? (
        <>
          <p>
            <label>
              Добавить слово с определением:
              <button onClick={() => setIsDialogShown(true)}>+</button>
            </label>
          </p>
          <div className='make-dictionary__dictionary-container'>
            <DictionaryTable words={words} setWords={setWords} />
          </div>
        </>
      ) : (
        <InlineAlert intent='warning'>Словарь не был выбран</InlineAlert>
      )}

      <Pane display='flex' flexDirection='row' justifyContent='space-between'>
        <Pane>
          <Button type='submit' alignSelf='left'>
            Сохранить
          </Button>

          <Button type='button' alignSelf='left'>
            Скачать
          </Button>
        </Pane>

        {isSaved && (
          <InlineAlert intent='success'>Словарь сохранён</InlineAlert>
        )}
      </Pane>
    </form>
  );
};

export { ChangeDictionary };
