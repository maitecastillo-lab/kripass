const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/env');
const passwordRoutes = require('./routes/password.routes'); // <-- Asegúrate de que esta línea esté

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<p>API de KriPass El servidor está encendido y listo.</p>');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor de KriPass funcionando correctamente' });
});

app.use('/api/v1/passwords', passwordRoutes);

app.listen(PORT, () => {
  console.log(`Servidor listo en: http://localhost:${PORT}`);
});

// --- Middleware de manejo de errores (El escudo) ---
app.use((err, req, res, next) => {
    console.error('ERROR DETECTADO:', err.message);
  
    // Si el error es el que lanzamos en el servicio (NOT_FOUND)
    if (err.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Lo sentimos, ese recurso no existe.' });
    }
  
    // Para cualquier otro error desconocido
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: 'Algo salió mal en el cuartel general de KriPass' 
    });
  });