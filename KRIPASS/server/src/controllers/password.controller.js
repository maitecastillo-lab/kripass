const passwordService = require('../services/password.service');
const { decrypt } = require('../utils/crypto');

const getPasswords = async (req, res) => {
  try {
    const data = await passwordService.getAll();

    const datosDesencriptados = data.map(item => ({
      id: item._id,
      site: item.site,
      username: item.username,
      password: decrypt(item.password),
      category: item.category
    }));

    res.status(200).json(datosDesencriptados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener las contraseñas' });
  }
};

const createPassword = async (req, res) => {
  try {
    const { site, username, password, category } = req.body;

    if (!site || !username || !password || !category) {
      return res.status(400).json({ error: 'Faltan datos obligatorios, incluida la carpeta.' });
    }

    const nuevoItem = await passwordService.create({ site, username, password, category });
    res.status(201).json(nuevoItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la contraseña' });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { site, username, password, category } = req.body;

    if (!site && !username && !password && !category) {
      return res.status(400).json({ error: 'Debes enviar al menos un campo para actualizar' });
    }

    const datosActualizar = {};
    if (site) datosActualizar.site = site;
    if (username) datosActualizar.username = username;
    if (password) datosActualizar.password = password;
    if (category) datosActualizar.category = category;

    const actualizado = await passwordService.update(id, datosActualizar);

    if (!actualizado) {
      return res.status(404).json({ error: 'La credencial no existe' });
    }

    res.status(200).json(actualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar la contraseña' });
  }
};

const deletePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const exito = await passwordService.remove(id);

    if (exito) {
      res.status(200).json({ message: 'Eliminado con éxito' });
    } else {
      res.status(404).json({ error: 'La credencial no existe' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar la contraseña' });
  }
};

module.exports = { getPasswords, createPassword, updatePassword, deletePassword };