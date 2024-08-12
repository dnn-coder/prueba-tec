const express = require('express');

const {
  createUser,
  getAllUsers,
  getUsersById,
  updateUser,
  deleteUser,
  login,
} = require('../controllers/users.controller');

const {
  createUserValidators,
} = require('../middlewares/usersValidation.middleware');

const {
  protectSesion,
  protectUserAccount,
} = require('../middlewares/auth.middleware');

const { userExists } = require('../middlewares/users.middleware');

const usersRouter = express.Router();

usersRouter.post('/', createUserValidators, createUser);

usersRouter.post('/login', login);

usersRouter.use(protectSesion);

usersRouter.get('/', getAllUsers);

usersRouter
  .use('/:id', userExists)
  .route('/:id')
  .get(getUsersById)
  .patch(protectUserAccount, updateUser)
  .delete(protectUserAccount, deleteUser);

module.exports = { usersRouter };
