// Models
const { User } = require('../models/users.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return next(new AppError('user not found', 404));
  }
  req.user = user;
  next();
});
module.exports = { userExists };
