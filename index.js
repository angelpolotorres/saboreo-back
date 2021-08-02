// Variables de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Importamos routers
const usersRouter = require('./routes/users');
const dishesRouter = require('./routes/dishes');

// Configuración Express
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuracion de Cors Global
app.use(cors());

// Dividimos peticiones a las Routes
app.use('/users', usersRouter);

// Config Express puerto
app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
