const myWinston = require('winston');
const myExpressWinston = require('express-winston');

// логгер запросов
const requestLogger = myExpressWinston.logger({
  transports: [
    new myWinston.transports.File({ filename: 'request.log' }),
  ],
  format: myWinston.format.json(),
});

// логгер ошибок
const errorLogger = myExpressWinston.errorLogger({
  transports: [
    new myWinston.transports.File({ filename: 'error.log' }),
  ],
  format: myWinston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
