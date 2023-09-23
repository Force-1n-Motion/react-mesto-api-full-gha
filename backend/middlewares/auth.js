require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnautorizedError = require('../errors/UnautorizedError');
const { JWT_SECRET } = require('../app.config');
// const { SECRET_KEY = 'Favorite-Memories' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnautorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-code');
  } catch (err) {
    throw new UnautorizedError('Необходима авторизация');
  }

  req.user = payload;
  next();
};
