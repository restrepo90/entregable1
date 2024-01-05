const sequelize = require('./db');
const User = require('./models/userModel');
const Repair = require('./models/repairModel');

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');

    await User.sync();
    await Repair.sync();

    console.log('Tablas sincronizadas correctamente.');
  } catch (error) {
    console.error('Error al sincronizar las tablas:', error);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();