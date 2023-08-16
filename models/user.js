const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnautorizedError = require('../errors/UnautorizedError');
const urlRegex = require('../utils/constants');
const ForbiddenError = require('../errors/ForbiddenError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [2, 'Минимальная длинна 2'],
      maxlength: [30, 'Максимальная длинна 30'],
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: [2, 'Минимальная длинна 2'],
      maxlength: [30, 'Максимальная длинна 30'],
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator(url) {
          return urlRegex.test(url);
        },
        message: 'Введите URL',
      },
    },
    email: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      unique: true,
      validate: {
        validator(email) {
          validator.isEmail(email);
        },
        message: 'Введите верный email',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw ForbiddenError(`Пользователь с  email: ${email} не найден`);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw UnautorizedError('Неправильные почта или пароль');
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
