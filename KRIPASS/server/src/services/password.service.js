const fs = require('fs');
const path = require('path');

// Definimos la ruta del archivo (se creará en la raíz del server)
const FILE_PATH = path.join(__dirname, '../../db.json');

// Función auxiliar para leer el archivo de forma segura
const readData = () => {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, JSON.stringify([])); // Si no existe, lo crea vacío
      return [];
    }
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error leyendo la base de datos:", error);
    return [];
  }
};

// Función auxiliar para escribir en el archivo
const writeData = (data) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
};

const getAll = () => {
  return readData();
};

const create = (newPassword) => {
  const passwords = readData();
  const item = {
    id: Date.now(),
    ...newPassword
  };
  passwords.push(item);
  writeData(passwords); // Guardamos en el archivo físico
  return item;
};

const remove = (id) => {
  let passwords = readData();
  passwords = passwords.filter(p => p.id !== parseInt(id));
  writeData(passwords); // Actualizamos el archivo tras borrar
  return true;
};

module.exports = { getAll, create, remove };