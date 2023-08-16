const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('./signup.js', signupRouter);
router.use('./signin.js', signinRouter);
router.use(auth);
router.use('./users.js', usersRouter);
router.use('./cards.js', cardsRouter);
router.use('*', (req, res, next) => {
  next(NotFoundError('Страница не найдена'));
});
module.exports = router;
