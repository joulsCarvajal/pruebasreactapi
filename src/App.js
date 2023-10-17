import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [responseData, setResponseData] = useState(null);
  const [validationId, setValidationId] = useState('');
  const [frontUrl, setFrontUrl] = useState('');
  const [reverseUrl, setReverseUrl] = useState('');
  const [image, setImage] = useState(null);
  const [secondPutResponse, setSecondPutResponse] = useState(null);
  const [getResponse, setGetResponse] = useState(null);
  const [allRequestsSuccessful, setAllRequestsSuccessful] = useState(false);
  const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiIiwiYWRkaXRpb25hbF9kYXRhIjoie30iLCJjbGllbnRfaWQiOiJUQ0ljZTQ0ZWQ1YTRjMjRjNDliZGY4NzNjYWNjNTNkMDA4OSIsImV4cCI6MzI3NDMwNDU2NiwiZ3JhbnQiOiIiLCJpYXQiOjE2OTc1MDQ1NjYsImlzcyI6Imh0dHBzOi8vY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vdXMtZWFzdC0xX1Jib0NpRXdNZyIsImp0aSI6ImNhYWMwNjVhLWI5OTItNDkzNy1iZWM4LTVhZDU5NmI5ZDg5OSIsImtleV9uYW1lIjoicHJ1ZWJhZWNvb21lcnNob3AiLCJrZXlfdHlwZSI6ImJhY2tlbmQiLCJ1c2VybmFtZSI6IlRDSWNlNDRlZDVhNGMyNGM0OWJkZjg3M2NhY2M1M2QwMDg5LXBydWViYWVjb29tZXJzaG9wIn0.Nk0tVQUM1YPNB6be4F-71mojf2eGRE35qJs1O2eGBvc";
  const [formData, setFormData] = useState(new FormData());

  useEffect(() => {
    if (validationId && allRequestsSuccessful) {
      // Realizar la solicitud GET después de que validationId esté disponible y todas las solicitudes sean exitosas
      performGetRequest(validationId);
    }
  }, [validationId, allRequestsSuccessful]);

  const handleSubmit = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'Truora-API-Key': apiKey
        },
        body: new URLSearchParams({
          type: 'document-validation',
          country: 'CO',
          document_type: 'national-id',
          user_authorized: true,
          account_id: 'tcice44ed5a4c24c49bdf873cacc53d0089',
          custom_type: 'ecommershop3109@gmail.com',
        }).toString(),
      };

      const response = await fetch('https://api.validations.truora.com/v1/validations', requestOptions);

      if (response.ok) {
        const data = await response.json();
        setResponseData(data);

        const { validation_id, instructions } = data;
        if (validation_id) {
          setValidationId(validation_id);
        }
        if (instructions) {
          setFrontUrl(instructions.front_url);
          setReverseUrl(instructions.reverse_url);
        }

        // Después de la solicitud POST exitosa, marca que todas las solicitudes son exitosas
        setAllRequestsSuccessful(true);
      } else {
        console.error('La solicitud POST no fue exitosa.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleImageUpload = async () => {
    if (!image) {
      console.error('Selecciona una imagen antes de cargarla.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', image);

      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/jpeg',
          //'Content-Length': '<calculated when request is sent>',
          //'Host': '<calculated when request is sent>',
          //'User-Agent': 'PostmanRuntime/7.33.0',
          //'Accept': '*/*',
          //'Accept-Encoding': 'gzip, deflate, br',
          //'Connection': 'keep-alive',
          'Truora-API-Key': apiKey,
          'Origin': 'https://files.truora.com'
        },
        body: formData,
      };

      const response = await fetch(frontUrl, requestOptions);

      if (response.ok) {
        // Manejar la respuesta exitosa si es necesario
      } else {
        console.error('La primera solicitud PUT no fue exitosa.');
      }
    } catch (error) {
      console.error('Error al realizar la primera solicitud PUT:', error);
    }
  };

  const handleSecondPut = async () => {
    try {
      if (!reverseUrl) {
        console.error('La URL para la segunda solicitud PUT (reverseUrl) está vacía. Realiza la primera solicitud PUT antes.');
        return;
      }

      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/jpeg',
          //'Content-Length': '<calculated when request is sent>',
          //'Host': '<calculated when request is sent>',
          //'User-Agent': 'PostmanRuntime/7.33.0',
          //'Accept': '*/*',
          //'Accept-Encoding': 'gzip, deflate, br',
          //'Connection': 'keep-alive',
          'Truora-API-Key': apiKey,
          'Origin': 'https://files.truora.com'
        },
        body: formData, // Asegúrate de tener una imagen seleccionada en el estado 'image'
      };

      const response = await fetch(reverseUrl, requestOptions);

      if (response.ok) {
        const data = await response.json();
        setSecondPutResponse(data);
      } else {
        console.error('La segunda solicitud PUT no fue exitosa.');
      }
    } catch (error) {
      console.error('Error al realizar la segunda solicitud PUT:', error);
    }
  };

  const performGetRequest = async (validationId) => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          //'Host': '<calculated when request is sent>',
          //'User-Agent': 'PostmanRuntime/7.33.0',
          //'Accept': '*/*',
          //'Accept-Encoding': 'gzip, deflate, br',
          //'Connection': 'keep-alive',
          'Truora-API-Key': apiKey
        }
      };

      const response = await fetch(`https://api.validations.truora.com/v1/validations/${validationId}`, requestOptions);

      if (response.ok) {
        const data = await response.json();
        setGetResponse(data);
      } else {
        console.error('La solicitud GET no fue exitosa.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud GET:', error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Ejecutar JavaScript al presionar un botón</h1>
      </header>
      <button onClick={handleSubmit}>Ejecutar código</button>
      {validationId && (
        <div>
          <p>validation_id: {validationId}</p>
        </div>
      )}
      {frontUrl && reverseUrl && (
        <div>
          <p>front_url: {frontUrl}</p>
          <p>reverse_url: {reverseUrl}</p>
        </div>
      )}

      <div>
        <input type="file" accept="image/jpeg" onChange={handleImageChange} />
        <button onClick={handleImageUpload}>Cargar Imagen</button>
        <button onClick={handleSecondPut}>Segunda Solicitud PUT</button>
      </div>

      {getResponse && (
        <div>
          <p>Respuesta de la solicitud GET:</p>
          <pre>{JSON.stringify(getResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
