const passwordService = require('../services/password.service');
// Importamos la función de desencriptar
const { decrypt } = require('../utils/crypto');

const getPasswords = (req, res) => {
  const data = passwordService.getAll();
  
  // Antes de enviar los datos a la web, los desencriptamos uno a uno
  // para que el usuario vea su contraseña real y no el código cifrado.
  const datosDesencriptados = data.map(item => ({
    ...item,
    password: decrypt(item.password) 
  }));

  res.status(200).json(datosDesencriptados);
};

const createPassword = (req, res) => {
  // Validamos que llegue 'category' (la carpeta)
  const { site, username, password, category } = req.body;

  if (!site || !username || !password || !category) {
    return res.status(400).json({ error: "Faltan datos obligatorios, incluida la carpeta." });
  }

  // Llamamos al servicio para guardar
  // Aquí el password ya llega ENCRIPTADO porque pasó por el middleware antes de llegar aquí.
  const nuevoItem = passwordService.create({ site, username, password, category });
  
  // Respuesta 201 (Created)
  res.status(201).json(nuevoItem);
};

const deletePassword = (req, res) => {
  const { id } = req.params; 
  
  const exito = passwordService.remove(id);

  if (exito) {
    res.status(200).json({ message: "Eliminado con éxito" });
  } else {
    res.status(404).json({ error: "La credencial no existe" });
  }
};

module.exports = { 
  getPasswords, 
  createPassword,
  deletePassword 
};