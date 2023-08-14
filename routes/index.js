const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('./users.js', usersRouter);
router.use('./cards.js', cardsRouter);

module.exports = router;
