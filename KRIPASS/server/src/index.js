require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const passwordRoutes = require('./routes/password.routes');
const authRoutes = require('./routes/auth.routes');
const folderRoutes = require('./routes/folder.routes');

const app = express();

// Conectar a MongoDB al arrancar
connectDB();

// CORS
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Rutas
app.use('/api/v1/passwords', passwordRoutes);
app.use('/api/v1/folders', folderRoutes);
app.use('/api/v1', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🔐 KRIPASS corriendo en http://localhost:${PORT}`);
});