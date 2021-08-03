const bcrypt = require('bcrypt');

// Función para encriptar contraseña de manera asincrona
const encryptPassword = async (textPassword) => {
  // Generamos sal
  const salt = bcrypt.genSaltSync(10);

  // Promisificamos la funcion hash xq la funcion originalno devuelve promesa
  const encryptedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(textPassword, salt, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return encryptedPassword;
};

// Función para validar contraseña de manera asyncrona
const validatePassword = async (textPassword, encryptedPassword) => {
  const resultComparePassword = await bcrypt.compare(
    textPassword,
    encryptedPassword
  );
  return resultComparePassword;
};

module.exports = {
  encryptPassword,
  validatePassword,
};
