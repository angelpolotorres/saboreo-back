const AuthError = require('../errors/authError');

const isAuthUser = (req, res, next) => {
  if (req.headers['authorization'] !== '123') {
    return next(new AuthError());
  }
  next();
};

module.exports = {
  isAuthUser,
};
