const jwt = require('jsonwebtoken');

// CREAR TOKEN. Devuelve token
// Pasar primer elemento como un objeto.
const getToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.SECRET_TOKEN, {
    expiresIn: '30d',
  });
};

// VERIFICAR TOKEN. Solo devuelve true o false
const verifyToken = (token) => {
  const verificationStatus = jwt.verify(
    token,
    process.env.SECRET_TOKEN,
    function (err, decoded) {
      if (err) return false;
      return true;
    }
  );
  return verificationStatus;
};

// OBTENER INFO DEL TOKEN. Te devuelve la info que este dentro del token. De momento solo el userId
const getDataToken = (token) => {
  const decodedInfoToken = jwt.verify(
    token,
    process.env.SECRET_TOKEN,
    function (err, decoded) {
      if (err) return err;
      return {
        userId: decoded.userId,
      };
    }
  );
  return decodedInfoToken;
};

module.exports = {
  getToken,
  verifyToken,
  getDataToken,
};
