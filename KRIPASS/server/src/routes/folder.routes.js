const express = require('express');
const router = express.Router();
const Folder = require('../models/Folder');
const Password = require('../models/Password');

// LISTAR todas las carpetas
router.get('/', async (req, res) => {
  try {
    const folders = await Folder.find().sort({ createdAt: 1 });
    res.status(200).json(folders);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar carpetas' });
  }
});

// CREAR carpeta
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'El nombre de la carpeta es obligatorio' });
    }

    const existe = await Folder.findOne({ name: name.trim() });
    if (existe) {
      return res.status(409).json({ error: 'La carpeta ya existe' });
    }

    const newFolder = new Folder({ name: name.trim() });
    await newFolder.save();

    res.status(201).json(newFolder);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la carpeta' });
  }
});

// ELIMINAR carpeta (borra también sus credenciales)
router.delete('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const eliminada = await Folder.findOneAndDelete({ name });

    if (!eliminada) {
      return res.status(404).json({ error: 'Carpeta no encontrada' });
    }

    // Borra también las contraseñas asociadas
    await Password.deleteMany({ category: name });

    res.status(200).json({ message: 'Carpeta eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la carpeta' });
  }
});

module.exports = router;