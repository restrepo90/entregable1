const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const repairRoutes = require('./routes/repairs');
const sequelize = require('./db');


const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/repairs', repairRoutes);

sequelize.sync().then(() => {
  console.log('Conexión a la base de datos establecida.');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});