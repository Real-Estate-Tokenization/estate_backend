const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Node = require('../models/nodeModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.protectNode = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it exists
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if node still exists
  const currentNode = await Node.findById(decoded.id);
  if (!currentNode) {
    return next(new AppError('The node operator belonging to this token no longer exists.', 401));
  }

  // 4) Check if node is approved
  if (!currentNode.isApproved) {
    return next(new AppError('Your node account is not approved yet. Please wait for admin approval.', 403));
  }

  // Grant access to protected route
  req.node = currentNode;
  next();
});
