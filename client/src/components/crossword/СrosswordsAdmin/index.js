import React, { useState, useEffect } from 'react';

import { Dialog, FilePicker, Button, InlineAlert, Pane } from 'evergreen-ui';

import { Link } from 'react-router-dom';

import { ChangeCrossword } from '../ChangeCrossword';

const CrosswordsAdmin = () => {
  const [formData, setFormData] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploadedFile, setIsUploadedFile] = useState(false);
  const [isDialogShown, setIsDialogShown] = useState(false);
  const [error, setError] = useState('');
  const [isKostil, setIsKostil] = useState(false);
  const [isKostila, setIsKostila] = useState(false);

  const [crossword, setCrossword] = useState([]);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [crossName, setCrossName] = useState('');
  const [dictName, setDictName] = useState('');

  var obj;
  const handleSubmit = (e) => {
    fetch('http://localhost:8080/list_of_crosswords', {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          setIsUploaded(true);
        }
        return response.json();
      })
      .then((data) => {
        console.log('data: ', data);
        for (let i = 0; i < data.names.length; i++) {
          document.getElementById('demo').innerHTML +=
            '<p><a href ="/crosswords/change/' +
            data.names[i] +
            '"> ' +
            data.names[i] +
            '</a></p>';
        }
      })
      .catch((error) => {
        console.log('error: ', error.message);
      });

    e.preventDefault();
  };

  const fetchUploadCrossword = () => {
    fetch('http://localhost:8080/parse_crossword_file', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log('responce: ', response);
        if (response.ok) {
          setIsUploadedFile(true);
        }
        return response.json();
      })
      .then((data) => {
        setCrossword(data.crossword.words);
        setWidth(data.crossword.m);
        setHeight(data.crossword.n);
        setCrossName(data.crossword.name);
        setDictName('Общий_словарь');
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  const handleFilePickerChange = (files) => {
    setIsUploadedFile(false);
    const formData = new FormData();
    formData.append('file', files[0]);
    setFormData(formData);
  };

  useEffect(() => {
    setError('');
  }, [formData]);

  const handleFileSubmit = (e) => {
    fetchUploadCrossword();
    console.log('crossword: ', crossword);
    if (isKostila) {
      setIsKostil(true);
    }
    if (!isKostil) {
      setIsKostila(true);
    }
    console.log('isKostil: ', isKostil);
    console.log('isKostila: ', isKostila);
  };

  return (
    <div>
      {isKostil ? (
        <ChangeCrossword
          width={width}
          height={height}
          dictName={dictName}
          words={crossword}
          crossName={crossName}
        />
      ) : (
        <section className='admin-crosswords'>
          <Link to='new'>Создать новый кроссворд</Link>

          <p>Выберите кроссворд для изменения:</p>
          <button onClick={() => setIsDialogShown(true)}>Из файла:</button>
          <Dialog
            isShown={isDialogShown}
            title='Загрузка из файла'
            onCloseComplete={() => setIsDialogShown(false)}
            onConfirm={handleFileSubmit}
          >
            <Pane width={350}>
              <FilePicker
                required
                name='file-picker'
                accept='.kros'
                width='100%'
                onChange={handleFilePickerChange}
                placeholder='Выберите файл .kros...'
              />
              {isUploadedFile && (
                <InlineAlert intent='success'>Кроссворд загружен</InlineAlert>
              )}
            </Pane>
          </Dialog>
          <p></p>
          <form onSubmit={handleSubmit}>
            <Button type='submit'>Показать готовые кроссворды</Button>
          </form>
          <p id='demo'></p>
        </section>
      )}
    </div>
  );
};

export { CrosswordsAdmin };
