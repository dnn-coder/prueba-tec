const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

const { User } = require('../models/users.model');
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: '.env' });

const createUser = catchAsync(async (req, res, next) => {
  const { name, lastName, age, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hasPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    name,
    lastName,
    age,
    email,
    password: hasPassword,
  });

  newUser.password = undefined;

  res.status(200).json({
    status: 'success',
    newUser,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();

  res.status(200).json({
    status: 'success',
    message: 'find users',
    users,
  });
});

const getUsersById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'usuario no encontrado',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'find user',
    user,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, lastName, age, email, password } = req.body;
  const user = await User.findOne({ where: { id } });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'usuario no encontrado',
    });
  }

  await user.update({
    name,
    lastName,
    age,
    email,
    password,
  });

  res.status(200).json({
    status: 'success',
    message: 'user updated',
    user,
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const user = await User.findOne({ where: { id } });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'usuario no encontrado',
    });
  }

  await user.destroy({
    status: 'eliminado',
  });

  res.status(200).json({
    status: 'success',
    message: 'user deleted',
    user,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, status: 'activo' } });

  if (!user) {
    return next(new AppError('user not found', 404));
  }

  const isPassworValid = await bcrypt.compare(password, user.password);

  if (!isPassworValid) {
    return next(new AppError('invalid password', 404));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({
    ststus: 'succes',
    token,
  });
});

module.exports = {
  createUser,
  getAllUsers,
  getUsersById,
  updateUser,
  deleteUser,
  login,
};
