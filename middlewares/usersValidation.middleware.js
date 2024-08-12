const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    const message = errorMessages.join(', ');

    return next(new AppError(message, 400));
  }

  next();
};

const createUserValidators = [
  body('name').notEmpty().withMessage('El campo nombre no puede ir vacio'),
  body('lastName')
    .notEmpty()
    .withMessage('El campo apellido no puede ir vacio'),
  body('age').isNumeric().withMessage('La edad debe seer un numero'),
  body('email').isEmail().withMessage('debe proporcionar un correo valido'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .isAlphanumeric()
    .withMessage('La contraseña no debe tener catacteres especiales'),
  checkResult,
];

module.exports = { createUserValidators };
