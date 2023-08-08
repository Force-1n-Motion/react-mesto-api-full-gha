const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { HTTP_STATUS_NOT_FOUND } = require('http2').constants;

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/testdb' } = process.env;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '64d0b256162626254aaef447',
  };

  next();
});

app.use('*', (req, res) => {
  res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT);
