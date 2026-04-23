require('dotenv').config();

const express = require('express');
const cors = require('cors');

const passwordRoutes = require('./routes/password.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/v1/passwords', passwordRoutes);
app.use('/api/v1', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`KRIPASS corriendo en http://localhost:${PORT}`);
});