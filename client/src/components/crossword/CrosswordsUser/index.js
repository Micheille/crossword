
import React, { useState } from 'react';
import {SolveCrossword} from "../SolveCrossword";
import {Link} from "react-router-dom";
import { Button } from 'evergreen-ui';


const CrosswordsUser = () => {
  const [crossName, setCrossName] = useState("Общий 15 17");
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
          document.getElementById("demo").innerHTML = data.names ; 
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
      <Link to={`/crosswords/solve/${crossName}`}>Общий 15 17</Link>



      <input type='file'></input>   
      
        
        

    </section>
    
  );

};

export { CrosswordsUser };
