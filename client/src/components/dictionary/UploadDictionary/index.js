import React, { useState, useEffect } from 'react';

import { FilePicker, Button, InlineAlert, Pane } from 'evergreen-ui';

const UploadDictionary = () => {
  const [dictNames, setDictNames] = useState([]);

  const [formData, setFormData] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);

  const [canRewrite, setCanRewrite] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [formData]);

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

  const fetchUploadDictionary = (name) => {
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
        console.log('error: ', error);
      });
  };

  const handleFilePickerChange = (files) => {
    setIsUploaded(false);

    const formData = new FormData();
    formData.append('file', files[0]);

    setFormData(formData);
  };

  const handleRewriteSubmit = (e) => {
    const fileName = formData.get('file').name;
    const name = fileName.substring(0, fileName.length - 5);

    setCanRewrite(false);
    fetchUploadDictionary(name);
  };

  const handleSubmit = (e) => {
    const fileName = formData.get('file').name;
    const name = fileName.substring(0, fileName.length - 5);

    if (dictNames.includes(name)) {
      setCanRewrite(true);
    } else fetchUploadDictionary(name);

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
        </Pane>

        {canRewrite && (
          <Pane display='flex'>
            <InlineAlert intent='warning'>
              Словарь будет перезаписан. Продолжить?
            </InlineAlert>
            <Button onClick={handleRewriteSubmit}>Да</Button>
          </Pane>
        )}

        {isUploaded && (
          <InlineAlert intent='success'>Словарь загружён</InlineAlert>
        )}
        {error && <InlineAlert intent='danger'>{error}</InlineAlert>}
      </Pane>
    </form>
  );
};

export { UploadDictionary };
