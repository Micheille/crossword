import React, { useState, useEffect } from 'react';

import { Dialog, FilePicker, Button, InlineAlert, Pane } from 'evergreen-ui';

import { Link } from 'react-router-dom';

import { ChangeCrossword } from '../ChangeCrossword';

const CrosswordsAdmin = () => {
  const [formData, setFormData] = useState('');
  const [crossNames, setCrossNames] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploadedFile, setIsUploadedFile] = useState(false);
  const [isDialogShown, setIsDialogShown] = useState(false);
  const [error, setError] = useState('');
  const [canRewrite, setCanRewrite] = useState(false);

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
        setCrossNames(data.names);
        document.getElementById('demo').innerHTML = '';
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

    const fetchUploadListOfCrosswords = () => {
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
                setCrossNames(data.names);
                })
              .catch((error) => {
                console.log('error: ', error.message);
              });

    }

  const fetchUploadCrossword = () => {
      fetch(`http://localhost:8080/upload_crossword`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          console.log('responce: ', response);
          if (response.ok) {
            setIsUploadedFile(true);
          }
          else{
            setError('Файл поврежден или неверного формата!');
          }
          return response.json();
        })
        .catch((error) => {
          setError('Файл поврежден или неверного формата.');
          console.log('error: ', error);
        });
    };

  const handleFilePickerChange = (files) => {
      setError('');
      setIsUploaded(false);
      const formData = new FormData();
      formData.append('file', files[0]);
      setFormData(formData);
    };

    const handleRewriteSubmit = (e) => {
      setCanRewrite(false);
      fetchUploadCrossword();
    };

    const handleFileSubmit = (e) => {
        fetchUploadListOfCrosswords();
        const fileName = formData.get('file').name;
        const name = fileName.substring(0, fileName.length - 5);

        if (crossNames.includes(name)) {
          setCanRewrite(true);
        } else fetchUploadCrossword();
      };

  return (
        <section className='admin-crosswords'>
          <Link to='new'>Создать новый кроссворд</Link>

          <p>Выберите кроссворд для изменения:</p>
          <button onClick={() => setIsDialogShown(true)}>Из файла:</button>
          <Dialog
            isShown={isDialogShown}
            title='Загрузка из файла'
            onCloseComplete={() => {
                 setIsDialogShown(false);
                 setError('');
                 setIsUploadedFile(false);
                 setCanRewrite(false);
                 }
             }
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
              {canRewrite && (
                <Pane display='flex'>
                  <InlineAlert intent='warning'>
                    Кроссворд будет перезаписан. Продолжить?
                  </InlineAlert>
                  <Button onClick={handleRewriteSubmit}>Да</Button>
                </Pane>
              )}
              {isUploadedFile && (
                <InlineAlert intent='success'>Кроссворд загружен</InlineAlert>
              )}
              {error && ( <InlineAlert intent='danger'>{error}</InlineAlert> )}
            </Pane>
          </Dialog>
          <p></p>
          <form onSubmit={handleSubmit}>
            <Button type='submit'>Показать готовые кроссворды</Button>
          </form>
          <p id='demo'></p>
        </section>
  );
};

export { CrosswordsAdmin };
