const mongoose = require('mongoose');
const urlRegex = require('../utils/constants');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Заполните поле'],
      minlength: [2, 'Минимальная длинна -2'],
      maxlength: [30, 'Максимальная длинна -30'],
    },
    link: {
      type: String,
      required: [true, 'Заполните поле'],
      validate: {
        validator(url) {
          return urlRegex.test(url);
        },
        message: 'Введите URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
