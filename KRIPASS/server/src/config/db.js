const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI no está definida en el .env');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🍃 Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1); // Si falla la BD, cierra el servidor
  }
};

module.exports = connectDB;