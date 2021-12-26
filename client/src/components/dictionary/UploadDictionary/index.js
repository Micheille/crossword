import React, { useState, useEffect } from 'react';

import { FilePicker, Button, InlineAlert, Pane } from 'evergreen-ui';

const UploadDictionary = () => {
  const [formData, setFormData] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);

  const [error, setError] = useState('');

  const handleFilePickerChange = (files) => {
    setIsUploaded(false);

    const formData = new FormData();
    formData.append('file', files[0]);

    setFormData(formData);
  };

  const handleSubmit = (e) => {
    const fileName = formData.get('file').name;
    const name = fileName.substring(0, fileName.length - 5);

    try {
      fetch(`http://localhost:8080/upload_dictionary?name=${name}`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          console.log('responce: ', response);
          if (response.ok) {
            setIsUploaded(true);
          }

          return response.json();
        })
        .then((json) => setError(json.message))
        .catch((error) => {
          // if (e.response && e.response.data) {
          //   console.log(e.response.data.message); // some reason error message
          // }
          console.log('error: ', error);
          // console.log('error.responce: ', error.response);
          // console.log('error.responce.data: ', error.responce.data);
        });
    } catch (error) {
      console.log('error 2');
    }

    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Pane width={350}>
        <FilePicker
          required
          name='file-picker'
          accept='.dict'
          width='100%'
          onChange={handleFilePickerChange}
          placeholder='Выберите файл .dict...'
        />

        <Pane display='flex' flexDirection='row' justifyContent='space-between'>
          <Button type='submit'>Загрузить</Button>

          {isUploaded && (
            <InlineAlert intent='success'>Словарь загружён</InlineAlert>
          )}
          {error && <InlineAlert intent='danger'>{error}</InlineAlert>}
        </Pane>
      </Pane>
    </form>
  );
};

export { UploadDictionary };
