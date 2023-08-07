const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Заполните поле'],
    minlength: [2, 'Минимальная длинна 2'],
    maxlength: [30, 'Максимальная длинна 30'],
  },
  about: {
    type: String,
    required: [true, 'Заполните поле'],
    minlength: [2, 'Минимальная длинна 2'],
    maxlength: [30, 'Максимальная длинна 30'],
  },
  avatar: {
    type: String,
    required: [true, 'Заполните поле'],
    validate: {
      validator(url) {
        return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(url);
      },
      message: 'Введите URL',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
