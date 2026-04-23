const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { PORT } = require('./config/env');
const passwordRoutes = require('./routes/password.routes');

const app = express();

app.use(cors());
app.use(express.json());

// --- LÓGICA DE PERSISTENCIA PARA USUARIOS ---
const USERS_FILE = path.join(__dirname, '../db_users.json');

// Función para leer usuarios del archivo
const leerUsuarios = () => {
    try {
        if (!fs.existsSync(USERS_FILE)) {
            // Usuario inicial por defecto si el archivo no existe
            const inicial = [{ usuario: 'admin', password: '123' }];
            fs.writeFileSync(USERS_FILE, JSON.stringify(inicial, null, 2));
            return inicial;
        }
        const data = fs.readFileSync(USERS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Función para guardar usuarios en el archivo
const guardarUsuarios = (usuarios) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(usuarios, null, 2));
};

app.get('/', (req, res) => {
  res.send('<p>API de KriPass: El servidor está encendido y listo.</p>');
});

// Registro de Usuarios PERMANENTE
app.post('/api/v1/register', (req, res) => {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
    }

    const usuarios = leerUsuarios();
    const existe = usuarios.find(u => u.usuario.toLowerCase() === usuario.toLowerCase());
    
    if (existe) {
        return res.status(400).json({ error: 'Ese nombre de usuario ya está registrado' });
    }

    // Guardamos en el archivo
    usuarios.push({ usuario, password });
    guardarUsuarios(usuarios);
    
    console.log(`👤 Nuevo usuario guardado en disco: ${usuario}`);
    res.status(201).json({ message: 'Usuario creado con éxito', usuario });
});

// Ruta de Login PERMANENTE
app.post('/api/v1/login', (req, res) => {
    const { usuario, password } = req.body;
    const usuarios = leerUsuarios(); // Buscamos en el archivo
    
    const user = usuarios.find(u => u.usuario === usuario && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.json({ message: 'Login correcto', usuario: user.usuario });
});

app.use('/api/v1/passwords', passwordRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor listo en: http://localhost:${PORT}`);
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('ERROR DETECTADO:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
});