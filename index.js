// Variables de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./utils/dbConnection');

// Importamos routers
const usersRouter = require('./routes/users');
const dishesRouter = require('./routes/dishes');

// Importamos middlewares (errors)
const { errorMiddleware } = require('./middleware/errors/errors');

// Configuración Express
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Coger errores fuera de express
process.on('uncaughtException', (error) => {
  console.log(error);
});

// Conexion inicial a la base de datos
connectDB();

// Configuracion de Cors Global
app.use(cors());

// Dividimos peticiones a las Routes
app.use('/users', usersRouter);
app.use('/dishes', dishesRouter);

app.use(errorMiddleware);

// Config Express puerto
app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
