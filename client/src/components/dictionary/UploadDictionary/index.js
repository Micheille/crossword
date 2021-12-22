import React, { useState, useEffect } from 'react';

import { FilePicker, Button, InlineAlert, Pane } from 'evergreen-ui';

const UploadDictionary = () => {
  const [formData, setFormData] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFilePickerChange = (files) => {
    setIsUploaded(false);

    const formData = new FormData();
    formData.append('file', files[0]);

    setFormData(formData);
  };

  useEffect(() => {
    console.log('file: ', formData);
  }, [formData]);

  const handleSubmit = (e) => {
    const fileName = formData.get('file').name;
    const name = fileName.substring(0, fileName.length - 5);

    fetch(`http://localhost:8080/upload_dictionary?name=${name}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setIsUploaded(true);
        }

        return response.json();
      })
      .catch((error) => {
        console.log('error: ', error.message);
      });

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
        </Pane>
      </Pane>
    </form>
  );
};

export { UploadDictionary };
