const express = require('express');
const userController = require('../controllers/users');

// Importamos funciones de validación de datos
const { validate, createUserValidation } = require('../middleware/validations');

const router = express.Router();

router.post('/', validate(createUserValidation), userController.createUser);

module.exports = router;
