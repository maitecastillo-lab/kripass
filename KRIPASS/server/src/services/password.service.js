let passwords = [];

const getAll = () => {
  return passwords;
};

const create = (data) => {
  const newPassword = {
    id: Date.now().toString(), // Generamos un ID único temporal
    ...data,
    createdAt: new Date()
  };
  passwords.push(newPassword);
  return newPassword;
};

const remove = (id) => {
  const index = passwords.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('NOT_FOUND'); // Error estándar que luego capturaremos
  }
  passwords.splice(index, 1);
  return true;
};

module.exports = {
  getAll,
  create,
  remove
};