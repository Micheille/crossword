import React, { useState } from 'react';

import { Dialog, FilePicker, Button, InlineAlert, Pane } from 'evergreen-ui';

import { SolveCrosswordFromFile } from '../SolveCrosswordFromFile';

const CrosswordsUser = () => {
  const [formData, setFormData] = useState('');
  const [crossword, setCrossword] = useState({});
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploadedFile, setIsUploadedFile] = useState(false);
  const [isDialogShown, setIsDialogShown] = useState(false);
  const [error, setError] = useState('');

  const [goSolve, setGoSolve] = useState(false);

  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [crossName, setCrossName] = useState('');

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
        console.log(data);
        for (let i = 0; i < data.names.length; i++) {
          document.getElementById('demo').innerHTML +=
            '<p><a href ="/crosswords/solve/' +
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
          setGoSolve(true);
        } else {
          setError('Файл оврежден или неверного формата.');
        }
        return response.json();
      })
      .then((data) => {
        setCrossword(data.crossword.words);
        setWidth(data.crossword.m);
        setHeight(data.crossword.n);
        setCrossName(data.crossword.name);
      })
      .catch((error) => {
        setError('Файл поврежден или неверного формата.');
        console.log('error: ', error);
      });
  };

  const handleFilePickerChange = (files) => {
    setError('');
    setIsUploadedFile(false);

    const formData = new FormData();
    formData.append('file', files[0]);
    setFormData(formData);
  };

  const handleFileSubmit = (e) => {
    fetchUploadCrossword();
    // console.log('crossword: ', crossword);
  };

  return (
    <div>
      {goSolve ? (
        <SolveCrosswordFromFile
          width={width}
          height={height}
          words={crossword}
          crossName={crossName}
        />
      ) : (
        <section>
          <p>Выберите кроссворд для разгадывания:</p>
          <button onClick={() => setIsDialogShown(true)}>Из файла:</button>
          <Dialog
            isShown={isDialogShown}
            title='Загрузка из файла'
            onCloseComplete={() => {
              setIsDialogShown(false);
              setError('');
              setIsUploadedFile(false);
            }}
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
              {error && <InlineAlert intent='danger'>{error}</InlineAlert>}
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

export { CrosswordsUser };
