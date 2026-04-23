const passwordService = require('../services/password.service');
const { decrypt } = require('../utils/crypto');

const getPasswords = (req, res) => {
  const data = passwordService.getAll();
  const datosDesencriptados = data.map(item => ({
    ...item,
    password: decrypt(item.password)
  }));
  res.status(200).json(datosDesencriptados);
};

const createPassword = (req, res) => {
  const { site, username, password, category } = req.body;

  if (!site || !username || !password || !category) {
    return res.status(400).json({ error: 'Faltan datos obligatorios, incluida la carpeta.' });
  }

  const nuevoItem = passwordService.create({ site, username, password, category });
  res.status(201).json(nuevoItem);
};

const deletePassword = (req, res) => {
  const { id } = req.params;
  const exito = passwordService.remove(id);

  if (exito) {
    res.status(200).json({ message: 'Eliminado con éxito' });
  } else {
    res.status(404).json({ error: 'La credencial no existe' });
  }
};

module.exports = { getPasswords, createPassword, deletePassword };