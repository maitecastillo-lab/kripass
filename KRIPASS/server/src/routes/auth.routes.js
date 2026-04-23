const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');

// Hash simple con SHA-256 (para un proyecto académico es suficiente)
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password + 'kripass_salt').digest('hex');
};

// REGISTRO
router.post('/register', async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
    }

    const existe = await User.findOne({ usuario });
    if (existe) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }

    const nuevoUsuario = new User({
      usuario,
      password: hashPassword(password)
    });

    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario creado con éxito', usuario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ error: 'Faltan credenciales' });
    }

    const encontrado = await User.findOne({
      usuario,
      password: hashPassword(password)
    });

    if (!encontrado) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    res.status(200).json({ message: 'Login exitoso', usuario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;