import React, { useState, useEffect } from 'react';

import {
  Dialog,
  SelectMenu,
  TextInputField,
  Button,
  PlusIcon,
  Pane,
  InlineAlert,
} from 'evergreen-ui';

import { DictionaryTable } from '../DictionaryTable';

import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';

import './style.css';

const ChangeDictionary = () => {
  const [isDialogShown, setIsDialogShown] = useState(false);

  const [dictionaries, setDictionaries] = useState([]);
  const [dictName, setDictName] = useState('');

  const [words, setWords] = useState([]);
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');

  const [isSaved, setIsSaved] = useState(false);
  const [wordError, setWordError] = useState('');

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

  const handleDialogConfirm = () => {
    if (!(word && definition)) {
      setWordError('Заполните слово и определение');
    } else if (
      words.some(
        (wordAndDef) => wordAndDef.word.toUpperCase() === word.toUpperCase()
      )
    ) {
      setWordError('Такое слово уже записано');
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

  const makeJSON = () => {
    return {
      name: dictName,
      words: words,
    };
  };

  return (
    <form className='change-dictionary' onSubmit={handleSubmit}>
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

      <SelectMenu
        title='Выберите словарь'
        options={dictionaries.map((label) => ({ label, value: label }))}
        selected={dictName}
        onSelect={(item) => setDictName(item.value)}
        closeOnSelect
      >
        <Button type='button' width='50%'>
          {dictName || 'Изменить словарь понятий...'}
        </Button>
      </SelectMenu>

      {dictName ? (
        <>
          <Pane className='change-dictionary__add'>
            <Button
              iconBefore={PlusIcon}
              onClick={() => setIsDialogShown(true)}
            >
              Добавить слово с определением...
            </Button>
          </Pane>

          <div className='change-dictionary__dictionary-container'>
            <DictionaryTable words={words} setWords={setWords} />
          </div>
        </>
      ) : (
        <Pane
          display='flex'
          flexGrow={1}
          alignItems='center'
          justifyContent='center'
        >
          <InlineAlert intent='warning'>Словарь не был выбран</InlineAlert>
        </Pane>
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
