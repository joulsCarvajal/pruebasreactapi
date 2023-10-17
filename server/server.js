const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

// Configura las cabeceras CORS para permitir solicitudes desde tu aplicación React
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Reemplaza con la URL de tu aplicación React
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Ruta para la solicitud POST
app.post('/api/validation', (req, res) => {
  // Aquí manejamos la solicitud POST desde tu aplicación React
  // Puedes acceder a los datos del cliente mediante req.body
  // Realiza la lógica de servidor necesaria y responde
  const requestData = req.body;
  // Aquí debes realizar la lógica necesaria, incluyendo la solicitud a la API externa
  // Luego, envía una respuesta al cliente
  // Ejemplo de respuesta:
  res.json({ message: 'Solicitud POST procesada correctamente', data: requestData });
});

// Ruta para la solicitud PUT de la primera imagen
app.put('/api/image/first', (req, res) => {
  // Aquí manejamos la primera solicitud PUT desde tu aplicación React
  // Puedes acceder a los datos del cliente mediante req.body
  // Realiza la lógica de servidor necesaria y responde
  const requestData = req.body;
  // Realiza la lógica necesaria y responde
  // Ejemplo de respuesta:
  res.json({ message: 'Primera solicitud PUT procesada correctamente', data: requestData });
});

// Ruta para la solicitud PUT de la segunda imagen
app.put('/api/image/second', (req, res) => {
  // Aquí manejamos la segunda solicitud PUT desde tu aplicación React
  // Puedes acceder a los datos del cliente mediante req.body
  // Realiza la lógica de servidor necesaria y responde
  const requestData = req.body;
  // Realiza la lógica necesaria y responde
  // Ejemplo de respuesta:
  res.json({ message: 'Segunda solicitud PUT procesada correctamente', data: requestData });
});

// Ruta para la solicitud GET
app.get('/api/validation/:validationId', (req, res) => {
    // Aquí manejamos la solicitud GET desde tu aplicación React
    const validationId = req.params.validationId;
    // Realiza la lógica necesaria para obtener los datos que deseas
    // Luego, envía una respuesta al cliente
    // Ejemplo de respuesta:
    const responseData = {
      validation_id: validationId,
      // Otros datos obtenidos de la lógica del servidor
    };
    res.json(responseData);
  });

app.listen(port, () => {
  console.log(`Servidor Node.js en ejecución en el puerto ${port}`);
});
