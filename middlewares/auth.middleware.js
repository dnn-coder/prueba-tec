const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//models

const { User } = require('../models/users.model');

const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

dotenv.config({ path: '.env' });

const protectSesion = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('invalid token', 404));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);

  const user = await User.findOne({
    where: { id: decoded.id, status: 'activo' },
  });

  if (!user) {
    return next(
      new AppError('the owner of this token doesnt exist anymore', 403)
    );
  }

  req.sessionUser = user;

  next();
});

const protectUserAccount = (req, res, next) => {
  const { sessionUser, user } = req;

  if (sessionUser.id !== user.id) {
    return next(new AppError('you do not own this account', 403));
  }

  next();
};

module.exports = { protectSesion, protectUserAccount };
