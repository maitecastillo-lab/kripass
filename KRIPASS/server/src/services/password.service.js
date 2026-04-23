const Password = require('../models/Password');

const getAll = async () => {
  return await Password.find();
};

const create = async (newPassword) => {
  const item = new Password(newPassword);
  return await item.save();
};

const update = async (id, newData) => {
  return await Password.findByIdAndUpdate(id, newData, { new: true });
};

const remove = async (id) => {
  const result = await Password.findByIdAndDelete(id);
  return !!result; // true si encontró y borró, false si no
};

module.exports = { getAll, create, update, remove };