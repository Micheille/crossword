import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const InfoSystemUser = () => {

const [isUploaded, setIsUploaded] = useState(false);

  fetch(`http://localhost:8080/get_info_user`, {
        method: 'GET'
      })
      .then(response => response.body)
      .then(rb => {
        const reader = rb.getReader();

        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              // "done" is a Boolean and value a "Uint8Array"
              reader.read().then( ({done, value}) => {
                // If there is no more data to read
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                // Check chunks by logging to the console
                console.log(done, value);
                push();
              })
            }

            push();
          }
        });
      })
      .then(stream => {
        // Respond with our stream
        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {
        // Do things with result
        document.getElementById("demo").innerHTML = result ;
        console.log(result);
      });
  return (
  	<section>
        <p id="demo"></p>
      </section>

      //вставка файла справки с сервера
    );
};

export { InfoSystemUser };