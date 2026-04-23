const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const USERS_PATH = path.join(__dirname, '../../users.json');

const readUsers = () => {
  if (!fs.existsSync(USERS_PATH)) {
    fs.writeFileSync(USERS_PATH, JSON.stringify([]));
    return [];
  }
  return JSON.parse(fs.readFileSync(USERS_PATH, 'utf-8'));
};

const writeUsers = (data) => {
  fs.writeFileSync(USERS_PATH, JSON.stringify(data, null, 2));
};

// Hash simple con SHA-256 (para un proyecto académico es suficiente)
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password + 'kripass_salt').digest('hex');
};

// REGISTRO
router.post('/register', (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
  }

  const users = readUsers();

  if (users.find(u => u.usuario === usuario)) {
    return res.status(409).json({ error: 'El usuario ya existe' });
  }

  users.push({
    usuario,
    password: hashPassword(password),
    createdAt: new Date().toISOString()
  });

  writeUsers(users);

  res.status(201).json({ message: 'Usuario creado con éxito', usuario });
});

// LOGIN
router.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ error: 'Faltan credenciales' });
  }

  const users = readUsers();
  const hashInput = hashPassword(password);
  const encontrado = users.find(u => u.usuario === usuario && u.password === hashInput);

  if (!encontrado) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  }

  res.status(200).json({ message: 'Login exitoso', usuario });
});

module.exports = router;