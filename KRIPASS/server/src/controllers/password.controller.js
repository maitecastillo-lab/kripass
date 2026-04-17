const passwordService = require('../services/password.service');

const getPasswords = (req, res) => {
  const data = passwordService.getAll();
  res.status(200).json(data);
};

const createPassword = (req, res) => {
  const { site, username, password } = req.body;

  // --- VALIDACIÓN DEFENSIVA (Frontera de red) ---
  if (!site || !username || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios (sitio, usuario y clave)." });
  }

  const nuevoItem = passwordService.create({ site, username, password });
  res.status(201).json(nuevoItem);
};

module.exports = {
  getPasswords,
  createPassword
};