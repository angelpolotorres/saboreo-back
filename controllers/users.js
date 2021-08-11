const User = require('../models/users');
// Esta f captura errores en f asyncronas
const { catchAsyncErrors } = require('../middleware/errors/errors');
const { v4: uuidv4 } = require('uuid');
const { encryptPassword, validatePassword } = require('../utils/encrypt.js');
const { getToken } = require('../utils/tokens.js');
const { sendWelcomeMail } = require('../utils/mailer');

/* -----------------------------------*/
/* ------ CREATE USER - SIGN IN ------*/
/* -----------------------------------*/
const createUser = catchAsyncErrors(async (req, res) => {
  const { name, surname, email, password } = req.body;

  //Verificamos si el email ya esta registrado
  const isEmailUsed = await verifyIfExist('email', email);
  if (isEmailUsed === true) {
    return res.status(400).json({
      status: 'error',
      name: 'EmailExist',
      message: 'This email already exist',
    });
  }

  // Generamos código de verificación
  const codeVerificationAccount = uuidv4();
  // Generamos nuevo usuario
  const newUser = new User({
    name,
    surname,
    email,
    codeVerificationAccount,
    password: await encryptPassword(password),
  });

  // Creamos nuevo usuario y capturamos sus valores para generar token
  const createdUser = await newUser.save();
  const userToken = getToken(createdUser.id);

  // Enviamos email de bienvenida
  sendWelcomeMail(name, email, createdUser.id, codeVerificationAccount);

  // Respondemos generando token
  res.status(201).json({
    token: userToken,
    profile: {
      id: createdUser.id,
      name: createdUser.name,
      surname: createdUser.surname,
      email: createdUser.email,
    },
  });
});

/* ----------------------------------*/
/* ------ LOGIN USER - LOG IN -------*/
/* ----------------------------------*/

const logInUser = async (req, res) => {
  const { email, password } = req.body;
  const userFinded = await User.findOne({ email: email });
  if (!userFinded) {
    return res.state(400).json({
      status: 'error',
      name: 'EmailDoesNotExist',
      user: 'There are no users with this email',
    });
  }

  if (await validatePassword(password, userFinded.password)) {
    const userToken = getToken(userFinded.id);
    return res.status(201).json({
      token: userToken,
      profile: {
        id: userFinded.id,
        name: userFinded.name,
        surname: userFinded.surname,
        email: userFinded.email,
      },
    });
  }

  res.status(400).json({
    status: 'error',
    name: 'PasswordWrong',
    user: 'Password is wrong',
  });
};

/* -------------------------------------------*/
/* ------ CHECK THE EMAIL IS AVAILABLE -------*/
/* -------------------------------------------*/

const checkEmailUser = catchAsyncErrors(async (req, res) => {
  const isEmailUsed = await verifyIfExist('email', req.body.email);
  if (isEmailUsed === true) {
    return res.status(400).json({
      status: 'error',
      name: 'EmailExist',
      message: 'This email already exist',
    });
  }

  res.status(200).json({
    status: 'ok',
  });
});

// f para verificar si existe algo en la db
const verifyIfExist = async (data, dataValue) => {
  const dataFinded = await User.exists({ [data]: [dataValue] });
  return dataFinded;
};

module.exports = {
  createUser,
  logInUser,
  checkEmailUser,
  verifyIfExist,
};
