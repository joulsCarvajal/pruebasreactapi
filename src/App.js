import React, { useState } from 'react';
import './App.css';

function App() {
  const [frontImage, setFrontImage] = useState(null);
  const [reverseImage, setReverseImage] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const handleFrontImageUpload = (event) => {
    const file = event.target.files[0];
    setFrontImage(URL.createObjectURL(file)); 
  };

  const handleReverseImageUpload = (event) => {
    const file = event.target.files[0];
    setReverseImage(URL.createObjectURL(file));
  };

  const handleValidation = async () => {
    try {
      const response = await fetch('http://localhost:8080/', {
        method: 'POST',
        
      });

      if (response.ok) {
        const data = await response.json();
        setResponseData(data);
      } else {
        console.error('La solicitud POST no fue exitosa.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Ejecutar JavaScript al presionar un botón</h1>
      </header>
      <div className="image-upload">
        <input type="file" accept="image/*" id="frontImageInput" onChange={handleFrontImageUpload} />
        <label htmlFor="frontImageInput">Cargar imagen de frente del documento</label>
      </div>
      <div className="image-upload">
        <input type="file" accept="image/*" id="reverseImageInput" onChange={handleReverseImageUpload} />
        <label htmlFor="reverseImageInput">Cargar reverso del documento</label>
      </div>
      {frontImage && (
        <div className="image-preview">
          <img src={frontImage} alt="Frente del documento" />
        </div>
      )}
      {reverseImage && (
        <div className="image-preview">
          <img src={reverseImage} alt="Reverso del documento" />
        </div>
      )}
      <button onClick={handleValidation}>Validar</button>
      {responseData && (
        <div className="grid">
          <p>Respuesta del servidor:</p>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
