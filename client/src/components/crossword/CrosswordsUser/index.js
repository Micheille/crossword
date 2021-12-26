
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

    var reader = new FileReader();
    reader.onload = function(event) {
      var contents = event.target.result;
      console.log("Содержимое файла: " + contents);
    };

    reader.onerror = function(event) {
      console.error("Файл не может быть прочитан! код " + event.target.error.code);
    };


    const formData = new FormData();
    formData.append('file', files[0]);
    setFormData(formData);

    /*const data = {};
    formData.forEach((value, key) => (data[key] = value));*/

    const data = formDataToJSON(formData);
    console.log('data: ', data);

    setCrossword(data.crossword.words);
    setWidth(data.crossword.m);
    setHeight(data.crossword.n);



    function formDataToJSON(formData){
        var ConvertedJSON= {};
        for (const [key, value]  of formData.entries())
        {
            ConvertedJSON[key] = value;
        }
        return ConvertedJSON
    }
  };



  useEffect(() => {
    console.log('formData: ', formData);
  }, [formData]);

  const handleFileSubmit = (e) => {
    const fileName = formData.get('file').name;
    const name = fileName.substring(0, fileName.length - 5);
    console.log('fileName: ', name);

    document.getElementById("buttonFile").innerHTML += '<p><a href ="/crosswords/solveFile/' + formData + '"> ' + name + '</a></p>';

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
