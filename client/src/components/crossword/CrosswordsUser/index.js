
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
const handleFilePickerChange = (files) => {
    setIsUploadedFile(false);

    const formData = new FormData();
    formData.append('file', files[0]);
    setFormData(formData);

    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    console.log('file: ', data);
  };

  useEffect(() => {
    console.log('file: ', formData);
  }, [formData]);

  const handleFileSubmit = (e) => {
    const fileName = formData.get('file').name;
    const name = fileName.substring(0, fileName.length - 5);




  };
 

  return (
   
    <section>
       <form onSubmit={handleSubmit}>
       <Button type='submit'>Показать готовые кроссворды</Button>
       </form>
       <p id="demo"></p>

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
              accept='.dict'
              width='100%'
              onChange={handleFilePickerChange}
              placeholder='Выберите файл .dict...'
            />

              {isUploadedFile && (
                <InlineAlert intent='success'>Словарь загружён</InlineAlert>
              )}
          </Pane>
        </Dialog>
        <p></p>


    </section>
    
  );

};

export { CrosswordsUser };
