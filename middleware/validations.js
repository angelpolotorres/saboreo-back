const yup = require('yup');
const ValidationError = require('./errors/validationError');

const validate = (validation) => {
  return (req, res, next) => {
    try {
      validation(req.body);
      next();
    } catch (error) {
      next(new ValidationError(error));
    }
  };
};

const createUserValidation = (data) => {
  const schema = yup.object().shape({
    name: yup
      .string('El nombre debe de ser una cadena de texto')
      .min(2, 'El nombre debe tener al menos 3 caracteres')
      .max(50, 'El nombre no puede tener más de 50 caracteres')
      .matches(/^[A-Za-z ]+$/, 'El nombre solo puede contener letras')
      .required('El nombre es necesario'),
    surname: yup
      .string('El apellido debe de ser una cadena de texto')
      .min(2, 'El apellido debe tener al menos 3 caracteres')
      .max(150, 'Los appelidos no puede tener más de 150 caracteres')
      .matches(/^[A-Za-z ]+$/, 'El apellido solo puede contener letras')
      .required('El apellido es necesario'),
    email: yup
      .string('El email debe de ser una cadena de texto')
      .required('El email es necesario'),
    password: yup
      .string('La contraseña debe de ser una cadena de texto')
      /* Esto valida la contraseña
			.matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ]){8,15}$/,
        'La contraseña debe tener al menos 8 caracteres, al menos una mayúsculas y una cifra'
      )*/
      .required('La contraseña es necesaria'),
  });
  schema.validateSync(data);
};

module.exports = {
  validate,
  createUserValidation,
};
