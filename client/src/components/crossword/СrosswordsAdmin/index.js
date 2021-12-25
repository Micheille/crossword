import React, { useState } from 'react';

import { Button } from 'evergreen-ui';

import { Link } from 'react-router-dom';

const CrosswordsAdmin = () => {
  const [formData, setFormData] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  var obj;
  const handleSubmit = (e) => {
    

    fetch(`http://localhost:8080/list_of_crosswords`, {
      method: 'GET'
    })
      .then((response) => {
        if (response.ok) {
          setIsUploaded(true);
        }
        return response.json();          
        }).then((data) =>{
          console.log(data);
          document.getElementById("demo").innerHTML = data.names ; 
        })
               

       
      
      .catch((error) => {
        console.log('error: ', error.message);
      });
    

    e.preventDefault();
  };
  return (
    <section class='admin-crosswords'>
      <Link to='new'>Создать новый кроссворд</Link>

      <p>Выберите кроссворд для изменения:</p>
      <input type='file'></input>
      <form onSubmit={handleSubmit}>
        
       <Button type='submit'>Загрузить</Button>
       </form>
       <p id="demo"></p> 


    </section>
  );
};

export { CrosswordsAdmin };
