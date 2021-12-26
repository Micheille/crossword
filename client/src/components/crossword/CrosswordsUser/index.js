
import React, { useState } from 'react';
import {SolveCrossword} from "../SolveCrossword";
import {Link} from "react-router-dom";
import { Button } from 'evergreen-ui';


const CrosswordsUser = () => {
  var res;
  const [crossName, setCrossName] = useState('');
  const [formData, setFormData] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
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
          for (let i = 0; i < data.names.length; i++){
           
          
          document.getElementById("demo").innerHTML += '<p><a href ="/crosswords/solve/' + data.names[i] + '"> ' + data.names[i] + '</a></p>';; 
          }
        })   
      .catch((error) => {
        console.log('error: ', error.message);
      });
    

    e.preventDefault();
  };
 
  
 

  return (
   
    <section>
       <form onSubmit={handleSubmit}>
        
       <Button type='submit'>Показать готовые кроссворды</Button>
       </form>
       <p id="demo"></p> 
      <p>Выберите кроссворд для разгадывания:</p>
      



      <input type='file'></input>   
      
        
        

    </section>
    
  );

};

export { CrosswordsUser };
