
import React, { useState, useEffect } from 'react';
import {SolveCrossword} from "../SolveCrossword";
import {Link} from "react-router-dom";
import { Dialog, FilePicker, Button, InlineAlert, Pane } from 'evergreen-ui';


const CrosswordsUser = () => {
  var res;
  const [crossName, setCrossName] = useState('');
  const [formData, setFormData] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploadedFile, setIsUploadedFile] = useState(false);
  const [isDialogShown, setIsDialogShown] = useState(false);
  const [crossword, setCrossword] = useState([]);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {

    fetch('http://localhost:8080/list_of_crosswords', {
      method: 'GET'
    })
      .then((response) => {
        if (response.ok) {
          setIsUploaded(true);
        }
        return response.json();          
        }).then((data) =>{
          console.log(data);
          for (let i = 0; i < data.names.length; i++){

          document.getElementById("demo").innerHTML += '<p><a href ="/crosswords/solve/' + data.names[i] + '"> ' + data.names[i] + '</a></p>';;
          }
        })
      .catch((error) => {
        console.log('error: ', error.message);

      });
      e.preventDefault();
  };

  const fetchUploadCrossword = (data) => {
      fetch('http://localhost:8080/parse_crossword_file?file=${data}', {
          method: 'GET',
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

  useEffect(() => {
      setError('');
    }, [formData]);

  const handleFileSubmit = (e) => {
    fetchUploadCrossword(formData);


  };
 

  return (
   
    <section>

      <p>Выберите кроссворд для разгадывания:</p>

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
                <p id="buttonFile"></p>
              {isUploadedFile && (
                <InlineAlert intent='success'>Кроссворд загружен</InlineAlert>
              )}
          </Pane>
        </Dialog>
        <p></p>
        <form onSubmit={handleSubmit}>
       <Button type='submit'>Показать готовые кроссворды</Button>
       </form>
       <p id="demo"></p>

    </section>
    
  );

};

export { CrosswordsUser };
