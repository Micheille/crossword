import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const InfoSystem = () => {

const [isUploaded, setIsUploaded] = useState(false);

  fetch(`http://localhost:8080/get_info`, {
        method: 'GET'
      })
        .then((response) => {
          if (response.ok) {
            setIsUploaded(true);
          }
          return response.json();
          }).then((data) =>{
                      console.log(data);
                      document.getElementById("demo").innerHTML = data ;
                    })

        .catch((error) => {
          console.log('error: ', error.message);
        });
  return (
  	<section>
        <p>Тут будут сведения о системе</p>
        <p id="demo"></p>
      </section>

      //вставка файла справки с сервера
    );
};

export { InfoSystem };